import express from "express";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";
import {
  getCurrencySettings,
  updateCurrencySettings,
} from "../controllers/currencySettingController.js";

const router = express.Router();

// Public: Get currently configured exchange rates
router.get("/currency-settings", getCurrencySettings);

// Admin: Update configured exchange rates
router.put(
  "/currency-settings",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateCurrencySettings
);

export default router;
