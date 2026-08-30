import api from './api.js';

const IPAPI_URL = 'https://ipapi.co/json/';

/**
 * Fetches user country and currency based on IP address.
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
    return {
      countryCode: 'IN',
      currency: 'INR',
    };
  }
};

/**
 * Fetches exchange rates relative to a base currency.
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
      price: targetCurrency === 'AUD' ? Math.round(convertedPrice) : convertedPrice,
      displayPrice: `${targetCurrency === 'AUD' ? 'A$' : targetCurrency}${targetCurrency === 'AUD' ? Math.round(convertedPrice) : convertedPrice.toFixed(2)}`,
      currency: targetCurrency,
    };
  } catch (error) {
    console.error('Error converting product price:', error);
    return product;
  }
};

export default {
  getUserCountryAndCurrency,
  getExchangeRates,
  getExchangeRatesDetailed,
  convertPriceAPI,
  getConversionRate,
  convertProductPrice
};
