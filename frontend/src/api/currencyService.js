import api from './axios';

// Public endpoints
const IPAPI_URL = 'https://ipapi.co/json/';

/**
 * Fetches user country and currency based on IP address.
 * Uses ipapi.co (no auth required for basic limits).
 * @returns {Promise<{countryCode: string, currency: string}>}
 */
export const getUserCountryAndCurrency = async () => {
  try {
    const response = await fetch(IPAPI_URL);
    const data = await response.json();
    return {
      countryCode: data.country,
      currency: data.currency,
    };
  } catch (error) {
    console.error('Error fetching geolocation:', error);
    // Default fallback
    return {
      countryCode: 'IN',
      currency: 'INR',
    };
  }
};

/**
 * Fetches exchange rates relative to a base currency.
 * Uses our secure backend API which implements caching.
 * @param {string} baseCurrency The currency to use as base (e.g., 'INR')
 * @returns {Promise<Object>} Exchange rates map
 */
export const getExchangeRates = async (baseCurrency = 'INR') => {
  try {
    const response = await api.get(`/currency/rates?base=${baseCurrency}`);
    if (response.data && response.data.rates) {
      return response.data.rates;
    }
    throw new Error('Invalid response structure');
  } catch (error) {
    console.error(`Error fetching exchange rates for ${baseCurrency}:`, error);
    return null;
  }
};

/**
 * Get detailed exchange rate information
 * @param {string} baseCurrency The currency to use as base
 * @returns {Promise<Object>} Response with rates, cache status, timestamp
 */
export const getExchangeRatesDetailed = async (baseCurrency = 'INR') => {
  try {
    const response = await api.get(`/currency/rates?base=${baseCurrency}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching detailed exchange rates for ${baseCurrency}:`, error);
    return null;
  }
};

/**
 * Convert a single price using the backend API
 * @param {number} amount Amount to convert
 * @param {string} targetCurrency Target currency code
 * @param {string} baseCurrency Base currency code (default INR)
 * @returns {Promise<Object>} Conversion result with converted amount and rate
 */
export const convertPriceAPI = async (amount, targetCurrency = 'AUD', baseCurrency = 'INR') => {
  try {
    const response = await api.post('/currency/convert', {
      amount,
      targetCurrency,
      baseCurrency,
    });

    if (response.data && response.data.success) {
      return {
        success: true,
        originalAmount: response.data.originalAmount,
        convertedAmount: response.data.rounded || response.data.convertedAmount,
        rate: response.data.rate,
        baseCurrency: response.data.baseCurrency,
        targetCurrency: response.data.targetCurrency,
        fallback: response.data.fallback || false,
      };
    }

    throw new Error('Invalid conversion response');
  } catch (error) {
    console.error('Error converting price:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Get conversion rate between two currencies
 * @param {string} fromCurrency Source currency
 * @param {string} toCurrency Target currency
 * @returns {Promise<Object>} Rate and conversion info
 */
export const getConversionRate = async (fromCurrency = 'INR', toCurrency = 'AUD') => {
  try {
    const result = await convertPriceAPI(1, toCurrency, fromCurrency);
    if (result.success) {
      return {
        fromCurrency,
        toCurrency,
        rate: result.rate,
        formattedRate: `1 ${fromCurrency} = ${result.rate.toFixed(4)} ${toCurrency}`,
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting conversion rate:', error);
    return null;
  }
};

/**
 * Convert product price for display
 * @param {Object} product Product object with INR price
 * @param {string} targetCurrency Target currency
 * @param {Object} rates Pre-fetched rates (optional)
 * @returns {Promise<Object>} Product with converted price
 */
export const convertProductPrice = async (product, targetCurrency = 'AUD', rates = null) => {
  try {
    if (!rates) {
      rates = await getExchangeRates('INR');
    }

    if (!rates || !rates[targetCurrency]) {
      console.warn(`No rate available for ${targetCurrency}`);
      return product;
    }

    const convertedPrice = product.price * rates[targetCurrency];

    return {
      ...product,
      priceINR: product.price,
      price: convertedPrice,
      displayPrice: `${targetCurrency === 'AUD' ? 'A$' : targetCurrency}${convertedPrice.toFixed(2)}`,
      currency: targetCurrency,
    };
  } catch (error) {
    console.error('Error converting product price:', error);
    return product;
  }
};
