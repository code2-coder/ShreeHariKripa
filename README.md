# ShreeHariKripa

A full-stack e-commerce application with shipping integration, currency conversion, and payment processing capabilities.

## Project Overview

ShreeHariKripa is a comprehensive e-commerce platform featuring:

- **Product Management**: Browse and manage products with attributes and categories
- **Shopping Cart & Checkout**: Seamless purchasing experience
- **Payment Integration**: Secure payment processing
- **Shipping Integration**: Delhivery shipping with tracking
- **Returns Management**: Handle product returns and refunds
- **Multi-currency Support**: Currency conversion capabilities
- **Admin Dashboard**: Manage products, orders, and settings
- **User Authentication**: Secure JWT-based authentication

## Project Structure

```
├── backend/              # Node.js/Express backend API
│   ├── config/          # Database and authentication config
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/          # Database models (Sequelize)
│   ├── routes/          # API routes
│   ├── services/        # Business logic services
│   ├── templates/       # Email templates
│   └── utils/           # Utility functions
├── client/              # Primary frontend application
│   ├── src/             # React components and pages
│   ├── public/          # Static assets
│   └── package.json     # Frontend dependencies
├── frontend/            # Alternative/backup frontend
│   ├── src/             # React components and pages
│   ├── public/          # Static assets
│   └── package.json     # Frontend dependencies
├── server/              # Express server configuration
│   └── src/             # Server source files
├── shared/              # Shared constants and utilities
│   └── constants/       # Shared constants
├── postman_collection.json  # API collection for testing
└── deployment_instructions.md
```

## Tech Stack

### Backend

- **Node.js** with Express.js
- **Sequelize** ORM for database
- **JWT** for authentication
- **Passport.js** for OAuth/authentication
- **Cloudinary** for image upload
- **Resend** for email notifications

### Frontend

- **React** with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls

### Database

- **MySQL/PostgreSQL** (via Sequelize)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MySQL/PostgreSQL database
- Cloudinary account (for image uploads)
- Resend account (for email notifications)

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd ShreeHariKripa
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../client
npm install
```

### 4. Setup environment variables

Create `.env` files in both `backend/` and `client/` directories:

**backend/.env**

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=shreeharikripa
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
RESEND_API_KEY=your_resend_api_key
```

**client/.env**

```
VITE_API_URL=http://localhost:5000
```

### 5. Setup database

```bash
cd backend
npm run seed
```

## Running the Project

### Development Mode

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

Backend runs on `http://localhost:5000`

**Terminal 2 - Frontend:**

```bash
cd client
npm run dev
```

Frontend runs on `http://localhost:5173`

### Production Build

```bash
# Backend
cd backend
npm run build

# Frontend
cd client
npm run build
npm run preview
```

## API Documentation

The API follows RESTful conventions. Key endpoints include:

- **Authentication**: `/api/auth/` - Login, register, logout
- **Products**: `/api/products/` - Product CRUD operations
- **Orders**: `/api/orders/` - Order management
- **Categories**: `/api/categories/` - Category management
- **Attributes**: `/api/attributes/` - Product attributes
- **Shipping**: `/api/shipping/` - Delhivery integration
- **Payments**: `/api/payments/` - Payment processing
- **Returns**: `/api/returns/` - Return requests

## Product Management

### Basic Product Information

When creating or updating a product, the following information is required:

| Field                  | Type      | Description                                                   |
| ---------------------- | --------- | ------------------------------------------------------------- |
| **Product Name**       | Text      | The name of the product (e.g., Gold Necklace, Silver Bangles) |
| **Category**           | Dropdown  | Select from available categories                              |
| **Status**             | Dropdown  | Draft, Published, or Hidden                                   |
| **Base Selling Price** | Number    | Price in ₹ (Indian Rupees)                                    |
| **Full Description**   | Text Area | Detailed product description and features                     |

### Available Product Categories

- 🎭 **Mukut** - Traditional crowns and headpieces
- ✨ **Chandrika** - Decorative jewelry pieces
- 📿 **Necklace** - Neck-worn jewelry
- 🎀 **Chokar** - Choker-style necklaces
- 💫 **Kilangi** - Traditional ankle jewelry
- 🌙 **Nath** - Nose rings and studs
- 🪡 **Kamar Bandh** - Waist ornaments and belts
- ⭐ **Tilak** - Forehead marks and bindis
- 🪘 **Flutes** - Musical instruments
- 💍 **Bangles** - Arm bracelets and bangles
- 👂 **Earrings** - Ear ornaments
- 💇 **Hair Accessories** - Hair clips, pins, and ornaments

### Product Features (Tabular Format)

Display product features and specifications in the following table format:

| Feature           | Specification          | Details            |
| ----------------- | ---------------------- | ------------------ |
| Material          | Gold/Silver/Brass/etc  | Type and purity    |
| Weight            | In grams               | Approximate weight |
| Design            | Pattern name           | Design details     |
| Size              | S/M/L/XL or cm         | Available sizes    |
| Durability        | High/Medium/Low        | Expected lifespan  |
| Care Instructions | Specific care          | How to maintain    |
| Occasion          | Wedding/Daily/Festival | Suitable for       |
| Warranty          | Duration               | Warranty period    |

### Example Product Entry

```json
{
  "name": "Traditional Gold Necklace",
  "category": "Necklace",
  "status": "Published",
  "baseSellingPrice": 5999,
  "description": "Elegant traditional gold necklace with intricate designs...",
  "features": [
    {
      "feature": "Material",
      "specification": "22K Gold",
      "details": "Pure gold plated"
    },
    {
      "feature": "Weight",
      "specification": "15g",
      "details": "Approximate weight"
    },
    {
      "feature": "Design",
      "specification": "Kundan",
      "details": "Traditional Kundan work with precious stones"
    },
    {
      "feature": "Size",
      "specification": "Adjustable",
      "details": "One size fits all"
    }
  ]
}
```

## Features

### ✅ User Features

- User registration and authentication
- Browse products by category
- Add to cart and checkout
- Order tracking
- Return product requests
- Wishlist management
- Currency conversion

### ✅ Admin Features

- Product management
- Order management
- User management
- Returns management
- Shipping tracking
- Settings configuration
- Analytics and reports

### ✅ Integrations

- **Delhivery**: Real-time shipping and tracking
- **Cloudinary**: Image hosting and optimization
- **Resend**: Email notifications
- **Payment Gateway**: Secure payment processing

## Testing

### API Testing

Use the provided Postman collection: `postman_collection.json`

```bash
# Or run tests
cd backend
npm test
```

### JWT Testing

```bash
cd backend
npm run test:jwt
```

## Guides & Documentation

- [User Guide](USER_GUIDE.md)
- [Shipping Guide](AUSTRALIAN_SHIPPING_GUIDE.md)
- [Currency Converter Guide](CURRENCY_CONVERTER_GUIDE.md)
- [Deployment Instructions](deployment_instructions.md)
- [Implementation Checklist](IMPLEMENTATION_CHECKLIST.md)

## Common Issues & Troubleshooting

### Database Connection Issues

- Ensure MySQL/PostgreSQL is running
- Verify credentials in `.env`
- Run `node backend/checkDb.js` to test connection

### Port Already in Use

- Change PORT in `.env` or backend server config
- Or kill the process using the port

### Image Upload Failures

- Check Cloudinary credentials
- Ensure API key and secret are correct

## Deployment

Refer to [deployment_instructions.md](deployment_instructions.md) for detailed deployment steps.

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

[Your License Here]

## Support

For issues and questions, please open an issue in the repository or contact the development team.

---

**Last Updated**: 2026-07-02
