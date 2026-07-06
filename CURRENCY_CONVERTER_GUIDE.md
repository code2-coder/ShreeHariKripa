# 💱 INR ⇄ AUD Currency Converter - Implementation Guide

## Overview

Enhanced multi-currency conversion system for the jewelry app with improved INR ⇄ AUD support, fallback rates, and product price optimization.

**Current Exchange Rates:**

- ₹1 INR ≈ A$0.015 AUD
- A$1 AUD ≈ ₹66–67 INR

---

## 🎯 Improvements Made

### Backend Enhancements

#### 1. **Enhanced Currency Controller** (`currencyController.js`)

- ✅ Fallback rates for reliability when API is down
- ✅ Timestamp tracking for rate freshness
- ✅ New `convertPrice` endpoint for real-time conversions
- ✅ Cached rates (1-hour cache duration)
- ✅ Comprehensive error handling

#### 2. **Price Converter Utility** (`backend/utils/priceConverter.js`) - NEW

Provides consistent price conversion across the backend:

```javascript
import {
  convertPrice,
  formatCurrency,
  getPriceInMultipleCurrencies,
} from "../utils/priceConverter.js";

// Convert single price
const audPrice = convertPrice(1000, "AUD", rates); // ₹1000 → A$15

// Format with currency symbol
const formatted = formatCurrency(15, "AUD"); // "A$15"

// Get all currency options
const allPrices = getPriceInMultipleCurrencies(1000, rates);
// Returns: { INR, USD, EUR, GBP, AED, AUD }
```

#### 3. **New API Endpoints**

- `GET /api/v1/currency/rates?base=INR` - Get all exchange rates (cached)
- `POST /api/v1/currency/convert` - Convert single price in real-time

```javascript
// POST /api/v1/currency/convert
Request:
{
  "amount": 1000,
  "targetCurrency": "AUD",
  "baseCurrency": "INR"
}

Response:
{
  "success": true,
  "originalAmount": 1000,
  "convertedAmount": 15,
  "rate": 0.015,
  "currency": "AUD",
  "fallback": false
}
```

### Frontend Enhancements

#### 1. **Enhanced Currency Utils** (`frontend/src/app/utils/currencyUtils.js`)

New functions for better formatting and conversion:

```javascript
// Get detailed conversion info
const info = getConversionInfo(1000, "INR", "AUD", rates);
// Returns: { rate, convertedPrice, baseFormatted, targetFormatted, conversionText }

// Get price in multiple currencies
const multiCurrency = getPriceInMultipleCurrencies(1000, "INR", rates);

// Advanced formatting options
formatPrice(1000, "AUD", rates, "INR", {
  showCurrency: true,
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
  compact: true, // Shows A$1.5K instead of A$1500
});
```

#### 2. **Enhanced Currency Service** (`frontend/src/app/api/currencyService.js`)

New API methods:

```javascript
// Get detailed rate info with cache status
const rateInfo = await getExchangeRatesDetailed("INR");

// Convert price via API
const result = await convertPriceAPI(1000, "AUD", "INR");

// Get specific conversion rate
const rate = await getConversionRate("INR", "AUD");

// Convert product object
const productWithPrice = await convertProductPrice(product, "AUD", rates);
```

#### 3. **Price Display Component** (`frontend/src/app/components/PriceDisplay.jsx`) - NEW

Easy-to-use component for displaying prices with automatic conversion:

```jsx
// Simple display
<PriceDisplay price={1500} />

// Compact format (A$22.50)
<PriceDisplay price={1500} variant="compact" />

// Full display with conversion info
<PriceDisplay price={1500} variant="full" showConversion />

// Price range
<PriceDisplay
  price={1500}
  variant="range"
  priceRange={{ min: 1000, max: 2000 }}
/>

// Currency selector
<CurrencySelector onSelect={(currency) => console.log(currency)} />

// Price comparison
<PriceComparison price={1500} />
```

---

## 📊 Usage Examples

### Backend - Converting Product Prices

```javascript
import {
  addConvertedPrice,
  getPriceInMultipleCurrencies,
} from "../utils/priceConverter.js";

// When returning a single product
const product = await Product.findById(id);
const rates = await getExchangeRates("INR");
const enrichedProduct = addConvertedPrice(product, "AUD", rates);
// enrichedProduct.price = 15 (converted to AUD)
// enrichedProduct.priceINR = 1000 (original)
// enrichedProduct.priceInAllCurrencies = { INR, USD, EUR, ... }

// Return in response
res.json({ product: enrichedProduct });
```

### Backend - Bulk Product Conversion

```javascript
import { addConvertedPricesToProducts } from "../utils/priceConverter.js";

const products = await Product.find();
const rates = await getExchangeRates("INR");
const convertedProducts = addConvertedPricesToProducts(products, "AUD", rates);
```

### Frontend - Using PriceDisplay

```jsx
import { PriceDisplay, CurrencySelector } from "../components/PriceDisplay";

export function ProductCard({ product }) {
  return (
    <div>
      <h2>{product.name}</h2>

      {/* Main price display */}
      <PriceDisplay
        price={product.price}
        variant="compact"
        className="text-2xl text-amber-600"
      />

      {/* Show price in multiple formats */}
      <PriceDisplay price={product.price} variant="full" showConversion />

      {/* Currency selector */}
      <CurrencySelector />
    </div>
  );
}
```

### Frontend - Currency Detection

The app automatically detects user location and sets currency:

```javascript
// Automatic detection via useCurrency hook
const { currency, setCurrency, rates, isLoading } = useCurrency();

// Change manually
setCurrency("AUD");

// Get formatted price
const formatted = formatPrice(product.price, currency, rates, "INR");
```

---

## 🔧 Fallback Rates

The system includes fallback rates for reliability:

```javascript
// Defined in both backend and frontend
FALLBACK_RATES = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
  AED: 0.044,
  AUD: 0.015,
};
```

**When are fallback rates used?**

1. External API is unreachable
2. Cached rates have expired
3. Rates are not provided in the request

---

## 💾 Caching Strategy

**Backend Cache:**

- Duration: 1 hour
- Scope: INR base currency only
- Updates: Automatically on first request after expiry

**Frontend Cache:**

- Duration: Browser session (localStorage)
- Scope: User's selected currency preference
- Updates: On manual currency change or page reload

---

## 📱 Supported Currencies

| Code | Symbol | Name              | Country        |
| ---- | ------ | ----------------- | -------------- |
| INR  | ₹      | Indian Rupee      | India          |
| AUD  | A$     | Australian Dollar | Australia      |
| USD  | $      | US Dollar         | United States  |
| EUR  | €      | Euro              | Europe         |
| GBP  | £      | British Pound     | United Kingdom |
| AED  | د.إ    | UAE Dirham        | UAE            |

---

## 🎨 Formatting Examples

```javascript
// Different formatting options
const price = 1500; // INR

// Standard
formatPrice(price, "AUD", rates, "INR");
// Output: "A$22.50"

// Compact
formatPrice(price, "AUD", rates, "INR", { compact: true });
// Output: "A$22.5K" (if over 1000)

// Symbol only
formatPriceSymbol(22.5, "AUD");
// Output: "A$22.50"

// Detailed info
getConversionInfo(price, "INR", "AUD", rates);
// Output: {
//   rate: 0.015,
//   convertedPrice: 22.5,
//   conversionText: "1 ₹ = 0.015 A$",
//   ...
// }
```

---

## ✅ Testing

### Test Convert Endpoint

```bash
curl -X POST http://localhost:5000/api/v1/currency/convert \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1000,
    "targetCurrency": "AUD",
    "baseCurrency": "INR"
  }'
```

### Test Rates Endpoint

```bash
curl http://localhost:5000/api/v1/currency/rates?base=INR
```

---

## 🚀 Performance Tips

1. **Cache Exchange Rates** - Don't fetch on every product load
2. **Use Fallback Rates** - Always have a backup value
3. **Batch Conversions** - Convert multiple products at once
4. **Limit API Calls** - Use cached rates when possible
5. **Lazy Load** - Only convert prices when needed

---

## 🐛 Troubleshooting

### Prices not converting?

- Check if rates are loaded: `console.log(rates)`
- Verify API endpoint is responding: `GET /api/v1/currency/rates`
- Ensure baseCurrency matches product price currency (default: INR)

### Showing wrong currency?

- Clear localStorage: `localStorage.removeItem('user_currency')`
- Check browser geolocation permissions
- Manually set currency: `useCurrency().setCurrency('AUD')`

### Fallback rates being used?

- This is expected if external API is down
- Rates may be slightly outdated but still functional
- Check console for "Using fallback exchange rates" warning

---

## 📝 Next Steps

1. **Update product endpoints** to include currency conversion
2. **Add currency switcher** to product pages
3. **Display conversion info** in product comparisons
4. **Add currency badge** near prices
5. **Create currency preference** in user settings
