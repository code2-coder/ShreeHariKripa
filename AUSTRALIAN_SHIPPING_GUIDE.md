# 🚚 Australian Shipping & 📦 Packaging System

Complete implementation guide for Australian shipping rules, packaging add-ons, and admin settings.

## 📋 Overview

This system provides:

- ✅ Australian-specific shipping rules with free shipping threshold (A$99)
- ✅ Standard and Express shipping options
- ✅ Exquisite gift packaging as paid add-on (A$4.95)
- ✅ Admin dashboard to manage all prices without code changes
- ✅ Customizable packaging text across all pages
- ✅ Automatic order total calculation

---

## 🏗️ Architecture

### Models

#### **Settings Model** (`backend/models/settings.js`)

Stores all configurable settings:

```javascript
{
  australiaShipping: {
    standardShippingPrice: 9.95,
    expressShippingPrice: 14.95,
    freeShippingThreshold: 99
  },
  packaging: {
    exquisitePackagingPrice: 4.95,
    standardPackagingName: "...",
    exquisitePackagingName: "..."
  },
  packagingText: {
    productPageText: "...",
    shippingInfoText: "...",
    faqText: "...",
    checkoutText: "..."
  }
}
```

#### **Order Model Updates** (`backend/models/order.js`)

Added new fields:

```javascript
{
  packagingAmount: Number,        // e.g., 4.95
  packagingOption: String,        // "standard" or "exquisite"
  shippingMethod: String,         // "standard" or "express"
  // ... existing fields
}
```

---

## 🔧 Backend Implementation

### Controllers

#### **Settings Controller** (`backend/controllers/settingsController.js`)

**Endpoints:**

```
GET  /api/v1/settings                     - Get all settings
PUT  /api/v1/settings                     - Update settings (admin only)
POST /api/v1/settings/shipping            - Calculate shipping cost
GET  /api/v1/settings/packaging-options   - Get packaging options
GET  /api/v1/settings/packaging-text      - Get packaging text for page
```

**Example: Get Shipping Cost**

```javascript
// Request
POST /api/v1/settings/shipping
{
  "country": "Australia",
  "orderTotal": 150,
  "shippingMethod": "standard"
}

// Response
{
  "success": true,
  "country": "Australia",
  "orderTotal": 150,
  "shippingMethod": "standard",
  "shippingAmount": 0,           // FREE because 150 > 99 threshold
  "isFreeShipping": true,
  "freeShippingThreshold": 99
}
```

### Utilities

#### **Shipping Calculator** (`backend/utils/shippingCalculator.js`)

```javascript
import {
  calculateShipping, // Get shipping cost
  calculatePackaging, // Get packaging cost
  calculateOrderTotals, // Calculate items + tax + shipping + packaging
  getShippingOptions, // Get all shipping options for a country
} from "../utils/shippingCalculator.js";

// Example usage in order creation
const shipping = await calculateShipping("Australia", 150, "standard");
const packaging = await calculatePackaging("exquisite");
const totals = calculateOrderTotals(
  itemsPrice,
  0.1,
  shipping.shippingAmount,
  packaging.packagingAmount,
);
```

---

## 🎨 Frontend Implementation

### Hooks & Services

#### **Shipping Service** (`frontend/src/app/api/shippingService.js`)

```javascript
import {
  getShippingCost, // Get shipping cost
  getShippingOptions, // Get available shipping options
  getPackagingOptions, // Get packaging options
  getPackagingText, // Get text for display
  calculateOrderTotals, // Calculate totals
  formatShippingDisplay, // Format for UI
} from "../api/shippingService";

// Example usage
const options = await getShippingOptions("Australia", 150);
// Returns array of { id, name, price, isFree, deliveryDays }
```

### Components

#### **1. PackagingSelector** (`frontend/src/app/components/ShippingAndPackaging.jsx`)

```jsx
import { PackagingSelector } from "../components/ShippingAndPackaging";

<PackagingSelector
  onSelect={(option) => {
    console.log(option);
    // { id: "exquisite", name: "...", price: 4.95 }
  }}
  selectedOption="standard"
/>;
```

**Rendered Output:**

```
Packaging Options
○ Standard Shreeharikripa Presentation Sachet
  Included with every purchase
  ✓ Included

○ Exquisite Gift Packaging
  Premium luxury gift box with decorative presentation
  + A$4.95
```

#### **2. ShippingMethodSelector**

```jsx
import { ShippingMethodSelector } from "../components/ShippingAndPackaging";

<ShippingMethodSelector
  country="Australia"
  orderTotal={150}
  onSelect={(option) => {
    console.log(option);
    // { id: "standard", name: "Standard Delivery", price: 0, isFree: true }
  }}
  selectedMethod="standard"
/>;
```

**Rendered Output:**

```
Shipping Method
○ Standard Delivery
  Standard Delivery: FREE (Order over A$99)
  5-7 business days

○ Express Post
  Express Post: A$14.95
  2-3 business days

📦 Free standard shipping on orders over A$99
```

#### **3. OrderSummary**

```jsx
import { OrderSummary } from "../components/ShippingAndPackaging";

<OrderSummary
  itemsPrice={79.0}
  taxAmount={7.9}
  shippingAmount={0}
  packagingAmount={4.95}
/>;
```

**Rendered Output:**

```
Order Summary
Product(s)              A$79.00
Tax (10%)              A$7.90
Shipping              FREE
Packaging Upgrade     A$4.95
─────────────────────────────
Total                A$91.85
```

#### **4. PackagingInfo**

```jsx
import { PackagingInfo } from "../components/ShippingAndPackaging";

<PackagingInfo text="Every piece arrives in our signature Shreeharikripa presentation sachet." />;
```

### Admin Settings Panel

#### **AdminSettingsPanel** (`frontend/src/app/components/AdminSettingsPanel.jsx`)

```jsx
import { AdminSettingsPanel } from "../components/AdminSettingsPanel";

// Add to admin dashboard
<AdminSettingsPanel onSaved={(settings) => console.log(settings)} />;
```

**Features:**

- Edit shipping costs
- Edit free shipping threshold
- Edit packaging prices and names
- Edit packaging text for all pages
- Edit tax rate
- Edit default currency

**UI Sections:**

1. 🚚 Australia Shipping
   - Standard Shipping Price
   - Express Shipping Price
   - Free Shipping Threshold

2. 📦 Packaging Options
   - Standard Packaging Name
   - Exquisite Packaging Name
   - Exquisite Packaging Price

3. ✍️ Packaging Display Text
   - Product Page Text
   - Shipping Info Page Text
   - FAQ Page Text
   - Checkout Page Text

4. ⚙️ Global Settings
   - Tax Rate
   - Default Currency

---

## 📱 Integration Examples

### Product Page

```jsx
import { PackagingInfo } from "../components/ShippingAndPackaging";
import { getPackagingText } from "../api/shippingService";

export function ProductPage() {
  const [packagingText, setPackagingText] = useState("");

  useEffect(() => {
    const fetchText = async () => {
      const text = await getPackagingText("product");
      setPackagingText(text);
    };
    fetchText();
  }, []);

  return (
    <>
      <PriceDisplay price={product.price} variant="compact" />
      <PackagingInfo text={packagingText} />
    </>
  );
}
```

### Cart Page

```jsx
import {
  PackagingSelector,
  ShippingMethodSelector,
  OrderSummary,
} from "../components/ShippingAndPackaging";

export function CartPage() {
  const [packaging, setPackaging] = useState("standard");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [shipping, setShipping] = useState(null);

  useEffect(() => {
    const calculateShip = async () => {
      const result = await getShippingCost(
        "Australia",
        cartTotal,
        shippingMethod,
      );
      setShipping(result);
    };
    calculateShip();
  }, [shippingMethod, cartTotal]);

  const handlePackagingChange = (option) => {
    setPackaging(option.id);
  };

  const handleShippingChange = (option) => {
    setShippingMethod(option.id);
  };

  return (
    <div className="space-y-6">
      <PackagingSelector
        onSelect={handlePackagingChange}
        selectedOption={packaging}
      />

      <ShippingMethodSelector
        country="Australia"
        orderTotal={cartTotal}
        onSelect={handleShippingChange}
        selectedMethod={shippingMethod}
      />

      <OrderSummary
        itemsPrice={itemsPrice}
        taxAmount={taxAmount}
        shippingAmount={shipping?.shippingAmount || 0}
        packagingAmount={packaging === "exquisite" ? 4.95 : 0}
      />
    </div>
  );
}
```

### Checkout

```jsx
export const newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    packagingOption = "standard",
    shippingMethod = "standard",
    paymentMethod,
  } = req.body;

  // Calculate amounts
  const { shippingAmount } = await calculateShipping(
    shippingInfo.country,
    itemsPrice,
    shippingMethod,
  );

  const { packagingAmount } = await calculatePackaging(packagingOption);

  const totalAmount = itemsPrice + taxAmount + shippingAmount + packagingAmount;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    packagingAmount,
    shippingMethod,
    packagingOption,
    totalAmount,
    paymentMethod,
    user: req.user._id,
  });

  res.status(201).json({ success: true, order });
});
```

---

## 💡 Shipping Rules

### Australia

**Standard Shipping:**

- Cost: A$9.95
- Free if order total ≥ A$99
- Delivery: 5-7 business days

**Express Shipping:**

- Cost: A$14.95
- Always charged
- Delivery: 2-3 business days

**Free Shipping Threshold:** A$99

### Other Countries

Currently defaulting to A$15 for international. Can be extended similarly.

---

## 📊 Price Breakdown Examples

### Example 1: Small Order with Standard Shipping

```
Items:      A$50.00
Tax (10%):  A$5.00
Shipping:   A$9.95  (standard, under $99)
Packaging:  Standard (included)
─────────────────────
Total:      A$64.95
```

### Example 2: Large Order with Free Shipping & Packaging

```
Items:      A$120.00
Tax (10%):  A$12.00
Shipping:   FREE     (order > $99)
Packaging:  Standard (included)
─────────────────────
Total:      A$132.00
```

### Example 3: Order with Exquisite Packaging

```
Items:      A$80.00
Tax (10%):  A$8.00
Shipping:   A$9.95  (standard)
Packaging:  A$4.95  (exquisite upgrade)
─────────────────────
Total:      A$102.90
```

### Example 4: Large Order with Express & Packaging

```
Items:      A$150.00
Tax (10%):  A$15.00
Shipping:   FREE     (order > $99, but...)
            A$14.95  (express selected)
Packaging:  A$4.95   (exquisite upgrade)
─────────────────────
Total:      A$184.90
```

---

## 🔐 Admin Security

- Settings update requires authentication and admin role
- Use middleware: `isAuthenticatedUser` + `authorizeRoles('admin')`
- All price changes are logged in audit trails

---

## 🧪 Testing

### Test Settings Update

```bash
curl -X PUT http://localhost:5000/api/v1/settings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "australiaShipping": {
      "standardShippingPrice": 12.00,
      "expressShippingPrice": 18.00,
      "freeShippingThreshold": 125
    },
    "packaging": {
      "exquisitePackagingPrice": 5.99
    }
  }'
```

### Test Shipping Calculation

```bash
curl -X POST http://localhost:5000/api/v1/settings/shipping \
  -H "Content-Type: application/json" \
  -d '{
    "country": "Australia",
    "orderTotal": 80,
    "shippingMethod": "standard"
  }'
```

### Test Packaging Options

```bash
curl http://localhost:5000/api/v1/settings/packaging-options
```

---

## 🚀 Deployment Checklist

- [ ] Initialize Settings in database with default values
- [ ] Add AdminSettingsPanel to admin dashboard
- [ ] Update cart to use new packaging selector
- [ ] Update checkout to calculate new totals
- [ ] Update order confirmation email with packaging/shipping details
- [ ] Test all shipping scenarios
- [ ] Verify admin can update prices
- [ ] Test currency conversion with new amounts
- [ ] Update FAQ and shipping info pages with new text

---

## 📝 Related Files

- Backend: `backend/models/settings.js`, `backend/controllers/settingsController.js`, `backend/routes/settingsRoutes.js`
- Frontend: `frontend/src/app/components/ShippingAndPackaging.jsx`, `frontend/src/app/components/AdminSettingsPanel.jsx`
- Utils: `backend/utils/shippingCalculator.js`, `frontend/src/app/api/shippingService.js`
