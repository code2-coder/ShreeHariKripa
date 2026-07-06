# 🚀 Quick Reference - Currency Converter

## Most Common Use Cases

### 1. Display Product Price with Auto-Conversion

```jsx
import { PriceDisplay } from "../components/PriceDisplay";

<PriceDisplay price={1500} variant="compact" />;
// Output: "A$22.50" (auto-converts based on user's selected currency)
```

### 2. Get Converted Price (Backend)

```javascript
import { convertPrice } from "../utils/priceConverter";

const audPrice = convertPrice(1500, "AUD", rates);
// Returns: 22.5
```

### 3. Format Price with Symbol

```javascript
import { formatCurrency } from "../utils/priceConverter";

const formatted = formatCurrency(22.5, "AUD");
// Returns: "A$22.50"
```

### 4. Convert Via API (Frontend)

```javascript
import { convertPriceAPI } from "../api/currencyService";

const result = await convertPriceAPI(1500, "AUD", "INR");
// Returns: { convertedAmount: 22.5, rate: 0.015, ... }
```

### 5. Add Conversion Info to Product Response

```javascript
import { addConvertedPrice } from "../utils/priceConverter";

const enrichedProduct = addConvertedPrice(product, "AUD", rates);
// product.price becomes AUD, includes priceINR, priceInAllCurrencies
```

---

## Key Conversion Rates

| From   | To  | Rate  |
| ------ | --- | ----- |
| ₹1     | A$  | 0.015 |
| A$1    | ₹   | 66.67 |
| ₹1     | $   | 0.012 |
| ₹100   | A$  | 1.5   |
| ₹1000  | A$  | 15    |
| ₹10000 | A$  | 150   |

---

## API Endpoints

### Get Exchange Rates

```
GET /api/v1/currency/rates?base=INR
```

### Convert Price

```
POST /api/v1/currency/convert
Body: { amount: 1500, targetCurrency: "AUD", baseCurrency: "INR" }
```

---

## Frontend Imports

```javascript
// Currency utilities
import {
  convertPrice,
  formatPrice,
  formatPriceSymbol,
  getConversionInfo,
  getPriceInMultipleCurrencies,
  SUPPORTED_CURRENCIES,
  FALLBACK_RATES,
} from "../utils/currencyUtils";

// Currency context
import { useCurrency } from "../context/CurrencyContext";

// Currency service (API)
import {
  getExchangeRates,
  convertPriceAPI,
  getConversionRate,
  convertProductPrice,
} from "../api/currencyService";

// Components
import {
  PriceDisplay,
  CurrencySelector,
  PriceComparison,
} from "../components/PriceDisplay";
```

---

## Backend Imports

```javascript
// Price converter
import {
  convertPrice,
  formatCurrency,
  addConvertedPrice,
  addConvertedPricesToProducts,
  getPriceInMultipleCurrencies,
} from "../utils/priceConverter";

// Currency controller
import {
  getExchangeRates,
  convertPrice,
} from "../controllers/currencyController";
```

---

## Common Patterns

### Pattern 1: Display in Product Card

```jsx
<div className="product-card">
  <h3>{product.name}</h3>
  <PriceDisplay price={product.price} variant="compact" />
  <CurrencySelector />
</div>
```

### Pattern 2: Show All Currencies

```jsx
import { getPriceInMultipleCurrencies } from "../utils/currencyUtils";
import { useCurrency } from "../context/CurrencyContext";

const { rates } = useCurrency();
const prices = getPriceInMultipleCurrencies(product.price, "INR", rates);

{
  Object.entries(prices).map(([currency, data]) => (
    <div key={currency}>
      {currency}: {data.formatted}
    </div>
  ));
}
```

### Pattern 3: Backend Response with Conversion

```javascript
// Add to getProductById
import { addConvertedPrice } from "../utils/priceConverter";

const product = await Product.findById(id);
const rates = await getExchangeRates("INR");
const enriched = addConvertedPrice(product, "AUD", rates);

res.json({ success: true, product: enriched });
```

---

## Troubleshooting Checklist

- [ ] Are exchange rates loaded? Check `useCurrency().rates`
- [ ] Is price a valid number? Check `typeof price === 'number' && price > 0`
- [ ] Are base/target currencies valid? Check `SUPPORTED_CURRENCIES`
- [ ] Is API endpoint responding? Test: `GET /api/v1/currency/rates`
- [ ] Is fallback working? Check console for "Using fallback rates"
- [ ] Is cache stale? Wait 1 hour or restart backend
