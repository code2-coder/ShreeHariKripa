# 🎨 Visual UI Guide - Shipping & Packaging System

## Product Page

```
┌─────────────────────────────────────────────────┐
│ Ring Name                                       │
│ ⭐⭐⭐⭐⭐ (42 reviews)                            │
├─────────────────────────────────────────────────┤
│ Price: A$79.00                                  │
│ [Select Currency ▼]                             │
├─────────────────────────────────────────────────┤
│ Description...                                  │
├─────────────────────────────────────────────────┤
│ 📦 Every piece arrives in our signature         │
│    Shreeharikripa presentation sachet.          │
├─────────────────────────────────────────────────┤
│ [Add to Cart] [Buy Now]                         │
└─────────────────────────────────────────────────┘
```

---

## Cart Page - Packaging Selector

```
┌─────────────────────────────────────────────────┐
│ Packaging Options                               │
├─────────────────────────────────────────────────┤
│ ○ Standard Shreeharikripa Presentation Sachet   │
│   Included with every purchase                  │
│                                  ✓ Included     │
├─────────────────────────────────────────────────┤
│ ○ Exquisite Gift Packaging                      │
│   Premium luxury gift box with decorative       │
│   presentation                      + A$4.95    │
└─────────────────────────────────────────────────┘
```

---

## Cart Page - Shipping Method Selector

```
┌─────────────────────────────────────────────────┐
│ Shipping Method                                 │
├─────────────────────────────────────────────────┤
│ ○ Standard Delivery                             │
│   Standard Delivery: FREE (Order over A$99)     │
│   5-7 business days                             │
│                                        FREE     │
├─────────────────────────────────────────────────┤
│ ○ Express Post                                  │
│   Express Post: A$14.95                         │
│   2-3 business days                             │
│                                      A$14.95    │
├─────────────────────────────────────────────────┤
│ 📦 Free standard shipping on orders over A$99   │
└─────────────────────────────────────────────────┘
```

---

## Cart Page - Order Summary

```
BEFORE PACKAGING/SHIPPING SELECTION:
┌─────────────────────────────────────────────────┐
│ Order Summary                                   │
├─────────────────────────────────────────────────┤
│ Product(s)              A$79.00                 │
│ Tax (10%)              A$7.90                   │
│ ─────────────────────────────────────            │
│ Subtotal               A$86.90                  │
└─────────────────────────────────────────────────┘


AFTER SELECTIONS (Exquisite + Standard Free Shipping):
┌─────────────────────────────────────────────────┐
│ Order Summary                                   │
├─────────────────────────────────────────────────┤
│ Product(s)              A$79.00                 │
│ Tax (10%)              A$7.90                   │
│ Shipping               FREE ✓                   │
│ Packaging Upgrade      A$4.95                   │
│ ─────────────────────────────────────────────    │
│ Total                  A$91.85                  │
└─────────────────────────────────────────────────┘


AFTER SELECTIONS (Exquisite + Express Shipping):
┌─────────────────────────────────────────────────┐
│ Order Summary                                   │
├─────────────────────────────────────────────────┤
│ Product(s)              A$79.00                 │
│ Tax (10%)              A$7.90                   │
│ Shipping               A$14.95                  │
│ Packaging Upgrade      A$4.95                   │
│ ─────────────────────────────────────────────    │
│ Total                  A$106.80                 │
└─────────────────────────────────────────────────┘
```

---

## Admin Dashboard - Settings Panel

```
┌──────────────────────────────────────────────────────┐
│ Shipping & Packaging Settings                        │
├──────────────────────────────────────────────────────┤
│                                                      │
│ 🚚 Australia Shipping                               │
│ ┌────────────────────────────────────────────────┐  │
│ │ Standard Shipping Price (A$):  [9.95    ]      │  │
│ │ Express Shipping Price (A$):   [14.95   ]      │  │
│ │ Free Shipping Threshold (A$):  [99      ]      │  │
│ └────────────────────────────────────────────────┘  │
│                                                      │
│ 📦 Packaging Options                                │
│ ┌────────────────────────────────────────────────┐  │
│ │ Standard Packaging Name:                        │  │
│ │ [Standard Shreeharikripa Presentation Sachet] │  │
│ │                                                 │  │
│ │ Exquisite Packaging Name:                      │  │
│ │ [Exquisite Gift Packaging              ]       │  │
│ │                                                 │  │
│ │ Exquisite Packaging Price (A$): [4.95    ]     │  │
│ └────────────────────────────────────────────────┘  │
│                                                      │
│ ✍️  Packaging Display Text                          │
│ ┌────────────────────────────────────────────────┐  │
│ │ Product Page Text:                             │  │
│ │ [Every piece arrives in our signature          │  │
│ │  Shreeharikripa presentation sachet.      ]    │  │
│ │                                                 │  │
│ │ Shipping Info Page Text:                       │  │
│ │ [Every piece arrives in our signature          │  │
│ │  Shreeharikripa presentation sachet.      ]    │  │
│ │ ... (FAQ & Checkout text fields)               │  │
│ └────────────────────────────────────────────────┘  │
│                                                      │
│ ⚙️  Global Settings                                 │
│ ┌────────────────────────────────────────────────┐  │
│ │ Tax Rate (%):      [10          ]               │  │
│ │ Default Currency:  [AUD ▼       ]               │  │
│ └────────────────────────────────────────────────┘  │
│                                                      │
│                              [Save Settings]        │
└──────────────────────────────────────────────────────┘
```

---

## Order Breakdown Examples

### Example 1: Small Order ($50) - Standard Shipping

```
╔═══════════════════════════════════════╗
║ PRODUCT PAGE                          ║
╠═══════════════════════════════════════╣
║ Item: Ring                            ║
║ Price: A$50.00                        ║
║                                       ║
║ 📦 Every piece arrives in our         ║
║    signature Shreeharikripa           ║
║    presentation sachet.               ║
╚═══════════════════════════════════════╝

                      ↓ Add to Cart

╔═══════════════════════════════════════╗
║ CART PAGE                             ║
╠═══════════════════════════════════════╣
║ Packaging Options                     ║
║ ○ Standard (Included)                 ║
║ ○ Exquisite (+A$4.95)                 ║
║                                       ║
║ Shipping Method                       ║
║ ○ Standard: A$9.95                    ║
║ ○ Express: A$14.95                    ║
║                                       ║
║ Order Summary                         ║
║ Items:      A$50.00                   ║
║ Tax (10%):  A$5.00                    ║
║ Shipping:   A$9.95                    ║
║ Packaging:  Included                  ║
║ ─────────────────────                 ║
║ Total:      A$64.95                   ║
╚═══════════════════════════════════════╝
```

---

### Example 2: Large Order ($120) - Free Shipping + Exquisite Packaging

```
╔═══════════════════════════════════════╗
║ CART PAGE                             ║
╠═══════════════════════════════════════╣
║ Packaging Options                     ║
║ ○ Standard (Included)                 ║
║ ☑ Exquisite (+A$4.95)     👈 Selected │
║                                       ║
║ Shipping Method                       ║
║ ☑ Standard: FREE          👈 Selected │
║ ○ Express: A$14.95                    ║
║                                       ║
║ 📦 Free standard shipping on orders   ║
║    over A$99                          ║
║                                       ║
║ Order Summary                         ║
║ Items:      A$120.00                  ║
║ Tax (10%):  A$12.00                   ║
║ Shipping:   FREE ✓                    ║
║ Packaging:  A$4.95                    ║
║ ─────────────────────────             ║
║ Total:      A$136.95                  ║
╚═══════════════════════════════════════╝
```

---

### Example 3: Order Confirmation Email

```
╔═════════════════════════════════════════════╗
║                 Shreeharikripa              ║
║            Order Confirmation               ║
║                                             ║
║ Order ID: #ORD-2024-12345                   ║
║ Date: June 22, 2024                         ║
╠─────────────────────────────────────────────╣
║ ITEMS ORDERED                               ║
├─────────────────────────────────────────────┤
║ Ring (Size: 7) ............ A$79.00         ║
║ Quantity: 1                                 ║
╠─────────────────────────────────────────────╣
║ ORDER TOTAL                                 ║
├─────────────────────────────────────────────┤
║ Subtotal ................ A$79.00           ║
║ Tax (10%) ............... A$7.90            ║
║ Shipping (Standard) ..... FREE ✓            ║
║ Packaging (Exquisite) ... A$4.95            ║
║ ─────────────────────────────────            ║
║ TOTAL DUE ............... A$91.85           ║
╠─────────────────────────────────────────────╣
║ SHIPPING DETAILS                            ║
├─────────────────────────────────────────────┤
║ Method: Standard Delivery                   ║
║ Delivery Time: 5-7 business days            ║
║ Packaging: Exquisite Gift Packaging         ║
║                                             ║
║ 📦 Every piece arrives in our               ║
║    signature Shreeharikripa                 ║
║    presentation sachet.                     ║
╠─────────────────────────────────────────────╣
║ SHIPPING TO                                 ║
├─────────────────────────────────────────────┤
║ John Doe                                    ║
║ 123 Main Street                             ║
║ Sydney NSW 2000, Australia                  ║
╚─────────────────────────────────────────────╝
```

---

## Data Flow Diagram

```
USER JOURNEY
============

1. PRODUCT PAGE
   ┌─────────────────┐
   │ View Product    │
   │ See Packaging   │
   │ Info (📦 text)  │
   └────────┬────────┘
            │
            ↓
2. ADD TO CART
   ┌─────────────────┐
   │ Item in cart    │
   └────────┬────────┘
            │
            ↓
3. CART PAGE
   ┌──────────────────────────┐
   │ SELECT PACKAGING         │
   │ ○ Standard (included)    │
   │ ○ Exquisite (+A$4.95)    │
   │                          │
   │ SELECT SHIPPING          │
   │ ○ Standard (A$9.95/FREE) │
   │ ○ Express (A$14.95)      │
   │                          │
   │ ORDER SUMMARY            │
   │ Items + Tax + Shipping   │
   │ + Packaging              │
   │ = TOTAL                  │
   └────────┬─────────────────┘
            │
            ↓
4. CHECKOUT
   ┌─────────────────┐
   │ Confirm Details │
   │ Select Payment  │
   │ Place Order     │
   └────────┬────────┘
            │
            ↓
5. ORDER CREATED (Backend)
   ┌──────────────────────────┐
   │ Order saved with:        │
   │ - packagingOption        │
   │ - packagingAmount        │
   │ - shippingMethod         │
   │ - shippingAmount         │
   │ - totalAmount            │
   └────────┬─────────────────┘
            │
            ↓
6. CONFIRMATION EMAIL
   ┌──────────────────────────┐
   │ Email sent with:         │
   │ - All order details      │
   │ - Packaging info         │
   │ - Shipping method        │
   │ - Tracking (when ready)  │
   └──────────────────────────┘
```

---

## API Response Examples

### Get Shipping Cost (Order under threshold)

```json
{
  "success": true,
  "country": "Australia",
  "orderTotal": 50,
  "shippingMethod": "standard",
  "shippingAmount": 9.95,
  "isFreeShipping": false,
  "freeShippingThreshold": 99
}
```

### Get Shipping Cost (Order over threshold)

```json
{
  "success": true,
  "country": "Australia",
  "orderTotal": 150,
  "shippingMethod": "standard",
  "shippingAmount": 0,
  "isFreeShipping": true,
  "freeShippingThreshold": 99
}
```

### Get Packaging Options

```json
{
  "success": true,
  "packagingOptions": [
    {
      "id": "standard",
      "name": "Standard Shreeharikripa Presentation Sachet",
      "price": 0,
      "description": "Included with every purchase"
    },
    {
      "id": "exquisite",
      "name": "Exquisite Gift Packaging",
      "price": 4.95,
      "description": "Premium luxury gift box with decorative presentation"
    }
  ]
}
```

---

## States & Transitions

```
PACKAGING STATE
===============
Standard (default, included, A$0)
         ↕
Exquisite (upgrade available, +A$4.95)


SHIPPING STATE
==============
Standard Available
    ↕
Standard Free (if order ≥ A$99)
    ↕
Express Available

Total Calculation
==================
itemsPrice (from products)
      ↓
+ taxAmount (itemsPrice * taxRate)
      ↓
+ shippingAmount (based on method & total)
      ↓
+ packagingAmount (based on selection)
      ↓
= totalAmount
```

---

## Component Interactions

```
Cart Page
│
├─ PackagingSelector
│  └─ onChange → setPackaging
│     └─ recalculate total
│
├─ ShippingMethodSelector
│  └─ onChange → setShippingMethod
│     └─ fetch shipping cost
│     └─ recalculate total
│
└─ OrderSummary
   └─ displays: items + tax + shipping + packaging
   └─ shows total
```

This visual guide helps understand how all components work together in the user interface!
