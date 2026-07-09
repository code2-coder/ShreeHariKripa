import React, { createContext, useContext } from 'react';
import { DEFAULT_CURRENCY, formatPrice, convertPrice } from '../utils/currencyUtils';
import { useCurrencyDetection } from '../hooks/useCurrencyDetection';

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider = ({ children }) => {
  const { currency, setCurrency, rates, isLoading, settings } = useCurrencyDetection();

  // Helper method for components to format prices easily
  const getFormattedPrice = React.useCallback((priceInINR) => {
    return formatPrice(priceInINR, currency, rates, DEFAULT_CURRENCY);
  }, [currency, rates]);

  // Helper method to just get the converted value
  const getConvertedPrice = React.useCallback((priceInINR) => {
    return convertPrice(priceInINR, currency, rates, DEFAULT_CURRENCY);
  }, [currency, rates]);

  const contextValue = React.useMemo(() => ({
    currency,
    setCurrency,
    rates,
    isLoading,
    getFormattedPrice,
    getConvertedPrice,
    settings,
  }), [currency, setCurrency, rates, isLoading, getFormattedPrice, getConvertedPrice, settings]);

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
};
