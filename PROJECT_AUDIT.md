# 📋 Complete Project Audit & Architecture Review — ShreeHariKripa

**Project:** ShreeHariKripa Full-Stack eCommerce Platform  
**Architect:** Senior Full-Stack Architect & DevOps Engineer  
**Date:** August 30, 2026  
**Status:** Audit Completed — Implementation Plan Ready  

---

## 1. Current Architecture Overview

```text
ShreeHariKripa (Monorepo)
├── backend/ (Node.js + Express 5.2.1 + Mongoose 9.3.3 + Nodemon/TSX + Redis/In-Memory)
│   └── src/
│       ├── app.js (Express application bootstrap & middleware chain)
│       ├── server.js (Database connection, Redis startup, graceful shutdown, listener)
│       ├── cache/ (In-memory fallback + redisClient wrapper)
│       ├── config/ (redis.js, passport.js)
│       ├── controllers/ (23 mixed-cased controllers)
│       ├── database/ (connection.js, pageSeeder.js, priceRangeSeeder.js)
│       ├── helpers/ (response.js)
│       ├── middleware/ (auth.js, cache.js, catchAsyncErrors.js, errors.js, rateLimiter.js, validator.js)
│       ├── models/ (18 Mongoose models: Product, User, Order, Category, etc.)
│       ├── repositories/ (BaseRepository, ProductRepository, UserRepository, OrderRepository)
│       ├── routes/ (22 route files)
│       ├── services/ (AuthService, ProductService, OrderService, EmailService, zeptoMail.service.js, etc.)
│       ├── utils/ (apiFilters, logger, errorHandler, priceConverter, shippingCalculator, etc.)
│       └── validators/ (Zod request validation schemas)
│
├── frontend/ (React 18.3.1 + Vite 6.3.5 + TailwindCSS 4.1 + React Router 7.13 + Redux Toolkit 2.12)
│   └── src/
│       ├── api/ (axios.js, currencyService.js, shippingService.js)
│       ├── components/ (common/, forms/, layout/, ui/)
│       ├── context/ (AuthContext, CartContext, CategoryContext, CurrencyContext, WishlistContext)
│       ├── hooks/ (useCurrencyDetection, useSEO)
│       ├── pages/ (33 page components)
│       ├── routes/ (index.jsx with lazy loading)
│       ├── services/ (api.js, auth.service.js, cart.service.js, category.service.js, etc.)
│       ├── store/ (slices: authSlice, cartSlice, wishlistSlice)
│       ├── styles/
│       └── utils/
│
└── root/
    ├── kill-ports.js & wait-port.js (Port management and development startup synchronization)
    ├── package.json (Concurrently orchestration)
    └── render.yaml (Deployment specification)
```

---

## 2. Problems & Architectural Deficiencies Identified

### A. Backend Architecture & Code Organization
1. **Controller & Route Naming Inconsistency:**
   - Mixed casing across controllers: `AuthController.js`, `ProductController.js`, `categoryController.js`, `adPosterController.js`, `delhiveryControllers.js`, `forgotPassword.controller.js`.
   - Mixed route naming: `categoryRoutes.js`, `forgotPassword.routes.js`, `authRoutes.js`.
   - Standard target: `*.controller.js` and `*.routes.js` with uniform naming conventions.
2. **Scattered Error & Response Formats:**
   - Some controllers throw generic Errors, some use `next(new ErrorHandler(...))`, some return raw `res.status(500).json(...)`.
   - `errorHandler.js` vs `errors.js` vs `response.js`: Lack of unified `ApiError.js`, `ApiResponse.js`, and `asyncHandler.js` utilities.
3. **Middleware Redundancy & Naming:**
   - `catchAsyncErrors.js` vs standard `asyncHandler.js`.
   - `auth.js` exports both `isAuthenticatedUser`, `protect`, `authorizeRoles`.
   - Need clean separation: `auth.middleware.js`, `admin.middleware.js`, `error.middleware.js`, `rateLimit.middleware.js`, `validation.middleware.js`.
4. **Thin Controller Delegation:**
   - Some controllers (e.g. `settingsController.js`, `shipmentController.js`, `ReviewController.js`) contain inline business logic that should reside in dedicated services (`settings.service.js`, `shipment.service.js`, `review.service.js`).

### B. Database & Query Performance
1. **Unbounded Queries on High-Volume Collections:**
   - Some endpoints load entire result sets without limits (`limit=100` in Home page).
   - Dynamic product listing query should enforce max `limit: 100` and default `limit: 20` with lean projections.
2. **Missing Lean Projections:**
   - Multiple read queries retrieve full Mongoose documents without `.lean()`, allocating unnecessary Mongoose document overhead.
3. **Index Evaluation:**
   - `Product`, `User`, and `Order` models have solid indexes; additional compound indexes on `Review` (`{ product: 1, createdAt: -1 }`), `Category` (`{ parentCategory: 1 }`), `Shipment` (`{ orderId: 1 }`, `{ status: 1 }`) will accelerate lookups.

### C. Redis & In-Memory Caching
1. **Unconditional Redis Socket Attempts (Fixed in previous step, now solidified):**
   - Graceful opt-in detection when `REDIS_URL` or `REDIS_HOST` is set.
   - Transparent in-memory fallback with `.unref()` on cleanup timers.
   - Need comprehensive cache invalidation triggers on all product, category, banner, poster, and setting mutations.

### D. Frontend Architecture & API Services
1. **Duplicate API Layer:**
   - `frontend/src/api/axios.js` and `frontend/src/services/api.js` existed side-by-side with circular or redundant imports.
   - `frontend/src/api/currencyService.js` and `frontend/src/api/shippingService.js` were thin stubs pointing to `frontend/src/services/`.
   - Solution: Unify into `services/api/` with `client.js`, `authApi.js`, `productApi.js`, `orderApi.js`, `categoryApi.js`, `adminApi.js`, `shippingApi.js`.
2. **Context vs Redux Toolkit State Overlap:**
   - Cart, Wishlist, and Auth exist in both React Context (`AuthContext`, `CartContext`, `WishlistContext`) and Redux Toolkit slices (`authSlice`, `cartSlice`, `wishlistSlice`).
   - Need clean synchronization so global state is coherent without duplicate dispatching or re-rendering.
3. **Component Grouping:**
   - Over 19 components were placed directly in `components/common/` rather than feature folders:
     - `product/` -> `ProductCard.jsx`, `BestSellers.jsx`, `HeritageCollection.jsx`, `CuratedGallery.jsx`
     - `layout/` -> `Header.jsx`, `Footer.jsx`, `AccountDropdown.jsx`, `MobileBottomNav.jsx`, `AdminSidebar.jsx`
     - `admin/` -> `AdminSettingsPanel.jsx`, `admin/*`
     - `shipping/` -> `ShippingAndPackaging.jsx`, `shipping/*`
     - `returns/` -> `returns/*`
     - `reviews/` -> `reviews/*`
     - `ui/` -> `dropdown-menu.jsx`, `select.jsx`, `WhatsAppButton.jsx`, `TrustBanner.jsx`, `Newsletter.jsx`

### E. Scripts & Root Workflow
1. **Port Cleanup Race Condition (`kill-ports.js`):**
   - On Windows, `taskkill` exits with code 1 if a PID exits between `netstat` and `taskkill`.
   - Solution: Move to `scripts/kill-ports.js`, capture `taskkill` errors silently with `2>nul`, and report "Process already terminated."
2. **Port Waiting (`wait-port.js`):**
   - Move to `scripts/wait-port.js` and update `package.json` dev scripts.

### F. Security & Secret Exposure
1. **Logging Hygiene:**
   - Ensure `zeptoMail.service.js` and `server.js` NEVER log raw API keys or tokens.
   - Secure HTTP headers via Helmet with tuned Content Security Policy.
   - Robust Rate Limiting on `/api` routes (500 req/15min) and strict limits on auth/login routes.
   - Strict admin authorization middleware on all `/api/v1/admin/*` and sensitive management endpoints.

---

## 3. Step-by-Step Refactoring Plan (Phases 1-10)

| Phase | Description | Key Deliverables |
| :--- | :--- | :--- |
| **Phase 1** | **Audit & Planning** | Comprehensive `PROJECT_AUDIT.md` & `implementation_plan.md` artifact. |
| **Phase 2** | **Structure** | Create `scripts/`, standardize backend & frontend directory layout without breaking imports. |
| **Phase 3** | **Backend Architecture** | Standardize `ApiError`, `ApiResponse`, `asyncHandler`, `error.middleware.js`, `auth.middleware.js`, thin controllers + services. |
| **Phase 4** | **Frontend Architecture** | Centralize `services/api/` layer, organize `components/` into feature directories, clean layouts and lazy routes. |
| **Phase 5** | **Database & Queries** | Optimize Mongoose queries with `.lean()`, `.select()`, verified compound indexes. |
| **Phase 6** | **Redis Caching** | Enhanced cache service with in-memory fallback, invalidation patterns on all mutations. |
| **Phase 7** | **Security & Auth** | Audit JWT verification, cookie options (`httpOnly`, `sameSite`, `secure`), Helmet headers, input validation. |
| **Phase 8** | **Performance & UX** | Deduplicate API calls, optimize image loading, code splitting with React lazy, Vite build optimizations. |
| **Phase 9** | **Dead Code & Cleanup** | Remove obsolete stubs, unused imports, fix `kill-ports.js` process race condition. |
| **Phase 10** | **Verification & Testing** | Run tests, build frontend bundle (`npm run build`), verify server startup and API endpoints. |
