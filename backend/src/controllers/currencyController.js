import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

// In-memory cache for exchange rates
let exchangeRatesCache = {
  rates: null,
  timestamp: null,
};

const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour

// Fallback rates for reliability (last known good rates)
const FALLBACK_RATES = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
  AED: 0.044,
  AUD: 0.015, // ₹1 ≈ A$0.015
};

//
// 💱 GET EXCHANGE RATES
//
export const getExchangeRates = catchAsyncErrors(async (req, res, next) => {
  const baseCurrency = req.query.base || "INR";

  // Only cache if base currency is INR (our default). Otherwise fetch direct.
  if (baseCurrency === "INR") {
    const now = Date.now();
    if (exchangeRatesCache.rates && exchangeRatesCache.timestamp && (now - exchangeRatesCache.timestamp < CACHE_DURATION_MS)) {
      return res.status(200).json({
        success: true,
        cached: true,
        timestamp: exchangeRatesCache.timestamp,
        rates: exchangeRatesCache.rates,
      });
    }
  }

  try {
    const response = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`);
    const data = await response.json();

    if (data.result === "success" && data.rates) {
      if (baseCurrency === "INR") {
        exchangeRatesCache.rates = data.rates;
        exchangeRatesCache.timestamp = Date.now();
      }

      return res.status(200).json({
        success: true,
        cached: false,
        timestamp: Date.now(),
        rates: data.rates,
      });
    } else {
      throw new Error("Failed to fetch exchange rates");
    }
  } catch (error) {
    console.error("Exchange Rate API Error:", error);

    // If API fails, try to return stale cache
    if (baseCurrency === "INR" && exchangeRatesCache.rates) {
      return res.status(200).json({
        success: true,
        cached: true,
        stale: true,
        timestamp: exchangeRatesCache.timestamp,
        rates: exchangeRatesCache.rates,
      });
    }

    // Last resort: use fallback rates
    console.warn("Using fallback exchange rates");
    return res.status(200).json({
      success: true,
      cached: true,
      fallback: true,
      timestamp: Date.now(),
      rates: FALLBACK_RATES,
    });
  }
});

//
// 💰 CONVERT PRICE (Single or Bulk)
//
export const convertPrice = catchAsyncErrors(async (req, res, next) => {
  const { amount, targetCurrency = "AUD", baseCurrency = "INR" } = req.body;

  if (!amount || typeof amount !== "number" || amount <= 0) {
    return next(new ErrorHandler("Invalid amount provided", 400));
  }

  if (!targetCurrency || targetCurrency === baseCurrency) {
    return res.status(200).json({
      success: true,
      originalAmount: amount,
      baseCurrency,
      targetCurrency: baseCurrency,
      convertedAmount: amount,
      rate: 1,
    });
  }

  try {
    const response = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`);
    const data = await response.json();

    if (data.result === "success" && data.rates[targetCurrency]) {
      const rate = data.rates[targetCurrency];
      const convertedAmount = amount * rate;

      return res.status(200).json({
        success: true,
        originalAmount: amount,
        baseCurrency,
        targetCurrency,
        rate,
        convertedAmount,
        rounded: Math.round(convertedAmount * 100) / 100,
      });
    } else {
      throw new Error("Target currency not supported or API failed");
    }
  } catch (error) {
    console.error("Price Conversion Error:", error);

    // Use fallback rate if available
    if (FALLBACK_RATES[targetCurrency]) {
      const rate = FALLBACK_RATES[targetCurrency] / FALLBACK_RATES[baseCurrency];
      const convertedAmount = amount * rate;

      return res.status(200).json({
        success: true,
        originalAmount: amount,
        baseCurrency,
        targetCurrency,
        rate,
        convertedAmount,
        rounded: Math.round(convertedAmount * 100) / 100,
        fallback: true,
      });
    }

    return next(new ErrorHandler("Error converting price", 500));
  }
});
