import { useState, useEffect } from 'react';
import { getUserCountryAndCurrency, getExchangeRates } from '../api/currencyService';
import { isCurrencySupported, DEFAULT_CURRENCY, SUPPORTED_CURRENCIES } from '../utils/currencyUtils';
import { toast } from 'sonner';

export const useCurrencyDetection = () => {
  const [currency, setCurrencyState] = useState(DEFAULT_CURRENCY);
  const [rates, setRates] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeCurrency = async () => {
      try {
        setIsLoading(true);
        // 1. Fetch exchange rates (from our secure backend)
        const fetchedRates = await getExchangeRates(DEFAULT_CURRENCY);
        if (fetchedRates) {
          setRates(fetchedRates);
        }

        // 2. Check local storage for user preference (returning users)
        const savedCurrency = localStorage.getItem('user_currency');
        if (savedCurrency && isCurrencySupported(savedCurrency)) {
          setCurrencyState(savedCurrency);
        } else {
          // 3. Fallback to IP geolocation if no preference
          const { currency: detectedCurrency } = await getUserCountryAndCurrency();
          
          if (detectedCurrency && isCurrencySupported(detectedCurrency)) {
            setCurrencyState(detectedCurrency);
            localStorage.setItem('user_currency', detectedCurrency);
            
            // Show welcome toast on first detection
            const currencyMeta = SUPPORTED_CURRENCIES[detectedCurrency];
            if (currencyMeta) {
              toast.success(`Detected your location! Currency set to ${currencyMeta.name} (${currencyMeta.symbol})`, {
                icon: currencyMeta.flag,
                duration: 4000,
              });
            }
          } else {
            // Unrecognized or unsupported currency
            setCurrencyState(DEFAULT_CURRENCY);
            localStorage.setItem('user_currency', DEFAULT_CURRENCY);
          }
        }
      } catch (error) {
        console.error('Error initializing currency:', error);
        setCurrencyState(DEFAULT_CURRENCY);
      } finally {
        setIsLoading(false);
      }
    };

    initializeCurrency();
  }, []);

  const setCurrency = (newCurrency) => {
    if (isCurrencySupported(newCurrency)) {
      setCurrencyState(newCurrency);
      localStorage.setItem('user_currency', newCurrency);
    }
  };

  return { currency, setCurrency, rates, isLoading };
};
