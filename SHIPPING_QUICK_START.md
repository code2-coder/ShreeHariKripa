# 🚚 Quick Start - Shipping & Packaging

## For Developers: Quick Integration Guide

### 1️⃣ Product Page - Show Packaging Info

```jsx
import { PackagingInfo } from "@/components/ShippingAndPackaging";
import { getPackagingText } from "@/api/shippingService";

const [text, setText] = useState("");

useEffect(() => {
  getPackagingText("product").then(setText);
}, []);

return <PackagingInfo text={text} />;
```

---

### 2️⃣ Cart Page - Add Shipping Calculator

```jsx
import {
  ShippingMethodSelector,
  OrderSummary,
} from "@/components/ShippingAndPackaging";
import { getShippingCost } from "@/api/shippingService";

const [shipping, setShipping] = useState(null);
const [method, setMethod] = useState("standard");

useEffect(() => {
  getShippingCost("Australia", cartTotal, method).then(setShipping);
}, [method, cartTotal]);

return (
  <>
    <ShippingMethodSelector
      country="Australia"
      orderTotal={cartTotal}
      onSelect={(opt) => setMethod(opt.id)}
    />
    <OrderSummary shippingAmount={shipping?.shippingAmount || 0} />
  </>
);
```

---

### 3️⃣ Checkout - Packaging Selector

```jsx
import { PackagingSelector } from "@/components/ShippingAndPackaging";

const [packaging, setPackaging] = useState("standard");

<PackagingSelector
  onSelect={(opt) => setPackaging(opt.id)}
  selectedOption={packaging}
/>;
```

---

### 4️⃣ Admin Dashboard - Settings Panel

```jsx
import { AdminSettingsPanel } from "@/components/AdminSettingsPanel";

<AdminSettingsPanel onSaved={(settings) => console.log(settings)} />;
```

---

## 🔌 Backend: Order Creation

```javascript
import {
  calculateShipping,
  calculatePackaging,
} from "../utils/shippingCalculator.js";

const { shippingAmount } = await calculateShipping(
  "Australia",
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
});
```

---

## 📱 Components Reference

| Component                | Use Case                         | Props                                                          |
| ------------------------ | -------------------------------- | -------------------------------------------------------------- |
| `PackagingSelector`      | Select packaging on product/cart | `onSelect`, `selectedOption`                                   |
| `ShippingMethodSelector` | Select shipping method           | `country`, `orderTotal`, `onSelect`, `selectedMethod`          |
| `OrderSummary`           | Display price breakdown          | `itemsPrice`, `taxAmount`, `shippingAmount`, `packagingAmount` |
| `PackagingInfo`          | Display packaging text           | `text`, `showIcon`                                             |
| `AdminSettingsPanel`     | Manage all prices                | `onSaved`                                                      |

---

## 🛣️ API Endpoints

| Method | Endpoint                             | Purpose                 |
| ------ | ------------------------------------ | ----------------------- |
| GET    | `/api/v1/settings`                   | Get all settings        |
| PUT    | `/api/v1/settings`                   | Update settings (admin) |
| POST   | `/api/v1/settings/shipping`          | Calculate shipping      |
| GET    | `/api/v1/settings/packaging-options` | Get packaging options   |
| GET    | `/api/v1/settings/packaging-text`    | Get packaging text      |

---

## 💰 Pricing (Default AUD)

| Item                | Price   | Notes                |
| ------------------- | ------- | -------------------- |
| Standard Shipping   | A$9.95  | FREE if order ≥ A$99 |
| Express Shipping    | A$14.95 | Always charged       |
| Exquisite Packaging | A$4.95  | Optional upgrade     |

All prices manageable from admin panel without code changes.

---

## 🎯 Typical User Flow

1. **Browse Products** → See packaging info (PackagingInfo)
2. **Add to Cart** → Calculate shipping (ShippingMethodSelector)
3. **Review Cart** → See order summary (OrderSummary)
4. **Checkout** → Select packaging (PackagingSelector)
5. **Place Order** → Submit with all selections

---

## 🔍 Quick Troubleshooting

| Issue                    | Solution                                             |
| ------------------------ | ---------------------------------------------------- |
| Shipping not calculating | Check country matches "Australia" (case-insensitive) |
| Prices not updating      | Admin panel may need refresh or clear cache          |
| Packaging not showing    | Fetch with `getPackagingOptions()` first             |
| Settings page blank      | Check admin authorization role                       |

---

## 📚 Full Documentation

See [AUSTRALIAN_SHIPPING_GUIDE.md](AUSTRALIAN_SHIPPING_GUIDE.md) for complete implementation details.
