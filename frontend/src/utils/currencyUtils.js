export const SUPPORTED_CURRENCIES = {
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳', country: 'India' },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸', country: 'United States' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺', country: 'Europe' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧', country: 'United Kingdom' },
  AED: { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', flag: '🇦🇪', country: 'UAE' },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺', country: 'Australia' },
};

export const DEFAULT_CURRENCY = 'INR';

// Fallback rates for reliability
export const FALLBACK_RATES = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
  AED: 0.044,
  AUD: 0.015, // ₹1 ≈ A$0.015
};

// Popular currency pairs (for quick display)
export const POPULAR_PAIRS = [
  { from: 'INR', to: 'AUD', rate: 0.015, label: '₹ → A$' },
  { from: 'AUD', to: 'INR', rate: 66.67, label: 'A$ → ₹' },
  { from: 'INR', to: 'USD', rate: 0.012, label: '₹ → $' },
  { from: 'INR', to: 'GBP', rate: 0.0095, label: '₹ → £' },
];

/**
 * Checks if a detected currency is in our supported list
 * @param {string} currencyCode
 * @returns {boolean}
 */
export const isCurrencySupported = (currencyCode) => {
  return !!SUPPORTED_CURRENCIES[currencyCode];
};

/**
 * Converts a price to the target currency without formatting
 * @param {number} price Base price
 * @param {string} targetCurrency Target currency code (e.g., 'USD')
 * @param {Object} rates Exchange rates map
 * @param {string} baseCurrency The currency the price is currently in
 * @returns {number} Converted price
 */
export const convertPrice = (price, targetCurrency = DEFAULT_CURRENCY, rates = null, baseCurrency = DEFAULT_CURRENCY) => {
  let convertedPrice = Number(price);

  if (targetCurrency === baseCurrency) {
    return convertedPrice;
  }

  const rateToUse = rates || FALLBACK_RATES;

  if (rateToUse && rateToUse[targetCurrency]) {
    const rate = rateToUse[targetCurrency];
    convertedPrice = price * rate;
  }

  return convertedPrice;
};

/**
 * Converts and formats a price with various options
 * @param {number} price Base price
 * @param {string} targetCurrency Target currency code (e.g., 'USD')
 * @param {Object} rates Exchange rates map
 * @param {string} baseCurrency The currency the price is currently in
 * @param {Object} options Additional formatting options
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, targetCurrency = DEFAULT_CURRENCY, rates = null, baseCurrency = DEFAULT_CURRENCY, options = {}) => {
  const {
    showCurrency = true,
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    compact = false,
  } = options;

  const convertedPrice = convertPrice(price, targetCurrency, rates, baseCurrency);

  // Format using standard Intl.NumberFormat
  let formatted = new Intl.NumberFormat('en-US', {
    style: showCurrency ? 'currency' : 'decimal',
    currency: targetCurrency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(convertedPrice);

  // Compact format option (e.g., "A$1.5K" instead of "A$1500")
  if (compact && convertedPrice >= 1000) {
    const k = (convertedPrice / 1000).toFixed(1);
    const symbol = SUPPORTED_CURRENCIES[targetCurrency]?.symbol || targetCurrency;
    formatted = `${symbol}${k}K`;
  }

  return formatted;
};

/**
 * Format price with symbol only (no currency code)
 * @param {number} price Base price
 * @param {string} targetCurrency Target currency code
 * @returns {string} Symbol with formatted number
 */
export const formatPriceSymbol = (price, targetCurrency = DEFAULT_CURRENCY) => {
  const currencyInfo = SUPPORTED_CURRENCIES[targetCurrency];
  const symbol = currencyInfo?.symbol || targetCurrency;
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);

  return `${symbol}${formatted}`;
};

/**
 * Get currency conversion info for display
 * @param {number} basePrice Price in base currency
 * @param {string} baseCurrency Base currency code
 * @param {string} targetCurrency Target currency code
 * @param {Object} rates Exchange rates
 * @returns {Object} Conversion info with rate and formatted amounts
 */
export const getConversionInfo = (basePrice, baseCurrency = 'INR', targetCurrency = 'AUD', rates = null) => {
  const rateToUse = rates || FALLBACK_RATES;
  const rate = rateToUse[targetCurrency] / rateToUse[baseCurrency];
  const convertedPrice = basePrice * rate;

  return {
    basePrice,
    baseCurrency,
    targetCurrency,
    rate: Number(rate.toFixed(4)),
    convertedPrice: Number(convertedPrice.toFixed(2)),
    baseFormatted: formatPrice(basePrice, baseCurrency, rates, baseCurrency),
    targetFormatted: formatPrice(basePrice, targetCurrency, rates, baseCurrency),
    conversionText: `1 ${SUPPORTED_CURRENCIES[baseCurrency]?.symbol} = ${rate.toFixed(4)} ${SUPPORTED_CURRENCIES[targetCurrency]?.symbol}`,
  };
};

/**
 * Get multiple price representations
 * @param {number} price Price in base currency
 * @param {string} baseCurrency Base currency (default INR)
 * @param {Object} rates Exchange rates
 * @returns {Object} Prices formatted in multiple currencies
 */
export const getPriceInMultipleCurrencies = (price, baseCurrency = 'INR', rates = null) => {
  const rateToUse = rates || FALLBACK_RATES;
  const result = {};

  Object.keys(SUPPORTED_CURRENCIES).forEach(currency => {
    const convertedPrice = convertPrice(price, currency, rateToUse, baseCurrency);
    result[currency] = {
      value: Number(convertedPrice.toFixed(2)),
      formatted: formatPrice(price, currency, rateToUse, baseCurrency),
      symbol: SUPPORTED_CURRENCIES[currency].symbol,
    };
  });

  return result;
};
