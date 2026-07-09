import { useState, useEffect } from 'react';
import { getUserCountryAndCurrency, getExchangeRates } from '../api/currencyService';
import { isCurrencySupported, DEFAULT_CURRENCY, SUPPORTED_CURRENCIES } from '../utils/currencyUtils';
import { toast } from 'sonner';
import api from '../api/axios';

export const useCurrencyDetection = () => {
  const [currency, setCurrencyState] = useState(DEFAULT_CURRENCY);
  const [rates, setRates] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const initializeCurrency = async () => {
      try {
        setIsLoading(true);
        
        // Fetch settings configuration
        let isIndiaActive = true;
        let isAusActive = true;
        let ausCurrencyCode = 'AUD';
        
        try {
          const settingsRes = await api.get('/settings');
          if (settingsRes.data.success && settingsRes.data.settings) {
            const s = settingsRes.data.settings;
            setSettings(s);
            isIndiaActive = s.isIndiaEnabled !== false;
            isAusActive = s.isAustraliaEnabled !== false;
            ausCurrencyCode = s.australiaCurrency || 'AUD';
          }
        } catch (err) {
          console.warn('Failed to load settings in currency context initialization:', err);
        }

        // 1. Fetch exchange rates (from our secure backend)
        const fetchedRates = await getExchangeRates(DEFAULT_CURRENCY);
        if (fetchedRates) {
          setRates(fetchedRates);
        }

        // 2. Resolve initial currency target
        let targetCurrency = DEFAULT_CURRENCY;
        const savedCurrency = localStorage.getItem('user_currency');
        
        if (savedCurrency && isCurrencySupported(savedCurrency)) {
          targetCurrency = savedCurrency;
        } else {
          // 3. Fallback to IP geolocation if no preference
          const { currency: detectedCurrency } = await getUserCountryAndCurrency();
          if (detectedCurrency && isCurrencySupported(detectedCurrency)) {
            targetCurrency = detectedCurrency;
          }
        }

        // Apply country enablement overrides
        if (!isIndiaActive && targetCurrency === 'INR') {
          targetCurrency = ausCurrencyCode;
        } else if (!isAusActive && targetCurrency === ausCurrencyCode) {
          targetCurrency = 'INR';
        }

        setCurrencyState(targetCurrency);
        localStorage.setItem('user_currency', targetCurrency);

        // Show welcome toast on first detection if supported
        const currencyMeta = SUPPORTED_CURRENCIES[targetCurrency];
        if (currencyMeta && !savedCurrency) {
          toast.success(`Detected your location! Currency set to ${currencyMeta.name} (${currencyMeta.symbol})`, {
            icon: currencyMeta.flag,
            duration: 4000,
          });
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

  return { currency, setCurrency, rates, isLoading, settings };
};
