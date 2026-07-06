import express from "express";
import { getExchangeRates, convertPrice } from "../controllers/currencyController.js";

const router = express.Router();

router.get("/currency/rates", getExchangeRates);
router.post("/currency/convert", convertPrice);

export default router;
