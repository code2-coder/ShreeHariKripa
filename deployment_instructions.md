# Deployment Instructions

This guide covers deploying the full-stack MERN application with Vercel for the Frontend and Render for the Backend.

## Backend Deployment (Render)

1. **Push your code to GitHub**
   Ensure your backend code is pushed to a GitHub repository.

2. **Create a Render Account**
   Go to [Render.com](https://render.com) and sign up/log in.

3. **Create a New Web Service**
   - Click "New" and select "Web Service".
   - Connect your GitHub account and select your repository.
   - If your backend is in a `backend` folder, set the **Root Directory** to `backend`.

4. **Configure Service Settings**
   - **Name**: Choose a name for your API.
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start` (Make sure your `package.json` has `"start": "node index.js"`)

5. **Set Environment Variables**
   Scroll down to the "Environment Variables" section and add all your `.env` variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A strong random string for JWT signing.
   - `EMAIL_USER`: Your Gmail address.
   - `EMAIL_APP_PASSWORD`: Your Gmail App Password.
   - `CLIENT_URL`: The URL of your deployed frontend (e.g., `https://your-frontend.vercel.app`).
   - `NODE_ENV`: `production`

6. **Deploy**
   Click "Create Web Service". Render will start building and deploying your backend. Once done, copy the deployment URL.

---

## Frontend Deployment (Vercel)

1. **Update API URL**
   Make sure your frontend is configured to use the production API URL. In your `frontend/src/services/api.js` or `.env` file, point to the Render URL you copied above.
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api/auth
   ```

2. **Create a Vercel Account**
   Go to [Vercel.com](https://vercel.com) and log in with GitHub.

3. **Import Project**
   - Click "Add New..." -> "Project".
   - Import your GitHub repository.

4. **Configure Project Settings**
   - If your frontend is inside a `frontend` folder, set the **Root Directory** to `frontend`.
   - Vercel should automatically detect Vite. The build command will be `npm run build` and output directory `dist`.

5. **Set Environment Variables**
   Add your environment variables in Vercel:
   - `VITE_API_URL`: Your Render backend URL (e.g., `https://your-backend-url.onrender.com`).
   
   > [!WARNING]
   > **Vercel API Rewrite Warning**: The repository contains [vercel.json](file:///e:/VaibhavPawar/CodeFusionProjects/ShreeHariKripa/frontend/vercel.json) which has a rewrite rule mapping `/api/:match*` to `https://shreeharikripa.onrender.com`. If your backend is deployed under a different Render domain, you **MUST** update the destination URL in `vercel.json` to your correct Render URL, or configure `VITE_API_URL` with your absolute backend URL.

6. **Deploy**
   Click "Deploy". Vercel will build and deploy your React app.

---

## Security Best Practices Implemented

1. **Bcrypt Hashing**: All OTPs are hashed before storing in the database using `bcryptjs`.
2. **Short-lived Expiry**: OTPs expire automatically after 5 minutes using Mongoose TTL indexes.
3. **Rate Limiting**: Integrated `express-rate-limit` to prevent abuse. Max 3 OTP requests per minute per IP.
4. **JWT Authentication**: Secure stateless session management using signed JSON Web Tokens.
5. **Input Validation**: Mongoose schema validation ensures required fields and valid email formats.
6. **Environment Secrets**: Sensitive keys (DB URI, JWT secret, Email credentials) are isolated in `.env`.
7. **CORS Config**: Backend strictly accepts requests only from predefined `CLIENT_URL` domains.
