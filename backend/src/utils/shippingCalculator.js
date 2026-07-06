import Settings from "../models/settings.js";
import Product from "../models/product.js";
import { fetchCurrentRates, convertPrice } from "./priceConverter.js";

/**
 * Calculate shipping cost based on country, order total, and shipping method
 * @param {string} country - Destination country
 * @param {number} orderTotal - Order total in base currency
 * @param {string} shippingMethod - "standard" or "express"
 * @returns {Promise<Object>} Shipping info with amount and details
 */
export const calculateShipping = async (
    country,
    orderTotal,
    shippingMethod = "standard"
) => {
    let settings = await Settings.findOne();

    if (!settings) {
        // Initialize with defaults if not found
        settings = new Settings();
        await settings.save();
    }

    let shippingAmount = 0;
    let isFreeShipping = false;
    let shippingDetails = "";

    const countryLower = (country || "").toLowerCase();

    if (countryLower === "australia") {
        if (shippingMethod === "express") {
            shippingAmount = settings.australiaShipping.expressShippingPrice;
            shippingDetails = `Express Post: A$${shippingAmount.toFixed(2)}`;
        } else {
            // Standard shipping
            if (orderTotal >= settings.australiaShipping.freeShippingThreshold) {
                shippingAmount = 0;
                isFreeShipping = true;
                shippingDetails = `Standard Delivery: FREE (Order over A$${settings.australiaShipping.freeShippingThreshold})`;
            } else {
                shippingAmount = settings.australiaShipping.standardShippingPrice;
                shippingDetails = `Standard Delivery: A$${shippingAmount.toFixed(2)}`;
            }
        }
    } else if (countryLower === "india") {
        if (shippingMethod === "express") {
            shippingAmount = 14.95; // Default express shipping for India (in AUD base)
            shippingDetails = `Express Delivery: A$${shippingAmount.toFixed(2)}`;
        } else {
            shippingAmount = 0; // Standard shipping is FREE for India
            isFreeShipping = true;
            shippingDetails = `Standard Delivery: FREE`;
        }
    } else {
        // Default for other countries
        shippingAmount = 15;
        shippingDetails = `International Shipping: A$${shippingAmount.toFixed(2)}`;
    }

    return {
        country,
        shippingMethod,
        shippingAmount: Number(shippingAmount.toFixed(2)),
        isFreeShipping,
        shippingDetails,
        freeShippingThreshold:
            countryLower === "australia"
                ? settings.australiaShipping.freeShippingThreshold
                : null,
    };
};

/**
 * Calculate packaging cost
 * @param {string} packagingOption - "standard" or "exquisite"
 * @returns {Promise<Object>} Packaging info
 */
export const calculatePackaging = async (packagingOption = "standard") => {
    let settings = await Settings.findOne();

    if (!settings) {
        settings = new Settings();
        await settings.save();
    }

    let packagingAmount = 0;
    let packagingName = settings.packaging.standardPackagingName;

    if (packagingOption === "exquisite") {
        packagingAmount = settings.packaging.exquisitePackagingPrice;
        packagingName = settings.packaging.exquisitePackagingName;
    }

    return {
        packagingOption,
        packagingName,
        packagingAmount: Number(packagingAmount.toFixed(2)),
    };
};

/**
 * Calculate order totals (items + tax + shipping + packaging)
 * @param {number} itemsPrice - Total price of items
 * @param {number} taxRate - Tax rate (0.1 for 10%)
 * @param {number} shippingAmount - Shipping cost
 * @param {number} packagingAmount - Packaging cost
 * @returns {Object} Breakdown of all costs
 */
export const calculateOrderTotals = (
    itemsPrice,
    taxRate = 0.1,
    shippingAmount = 0,
    packagingAmount = 0
) => {
    const taxAmount = Number((itemsPrice * taxRate).toFixed(2));
    const totalAmount = Number(
        (itemsPrice + taxAmount + shippingAmount + packagingAmount).toFixed(2)
    );

    return {
        itemsPrice: Number(itemsPrice.toFixed(2)),
        taxAmount,
        taxRate: taxRate * 100 + "%",
        shippingAmount,
        packagingAmount,
        totalAmount,
        breakdown: {
            items: `A$${itemsPrice.toFixed(2)}`,
            tax: `A$${taxAmount.toFixed(2)} (${taxRate * 100}%)`,
            shipping: `A$${shippingAmount.toFixed(2)}`,
            packaging: `A$${packagingAmount.toFixed(2)}`,
            total: `A$${totalAmount.toFixed(2)}`,
        },
    };
};

/**
 * Get all available shipping options for a country
 * @param {string} country - Destination country
 * @param {number} orderTotal - Order total
 * @returns {Promise<Array>} Array of shipping options
 */
export const getShippingOptions = async (country, orderTotal) => {
    const standardShipping = await calculateShipping(country, orderTotal, "standard");
    const expressShipping = await calculateShipping(country, orderTotal, "express");

    return [
        {
            id: "standard",
            name: "Standard Delivery",
            description: standardShipping.shippingDetails,
            price: standardShipping.shippingAmount,
            isFree: standardShipping.isFreeShipping,
            deliveryDays: "5-7 business days",
        },
        {
            id: "express",
            name: "Express Post",
            description: expressShipping.shippingDetails,
            price: expressShipping.shippingAmount,
            isFree: false,
            deliveryDays: "2-3 business days",
        },
    ];
};

/**
 * Validate order prices against database and exchange rates
 * @param {Object} reqBody - Request body containing order details
 * @returns {Promise<Object|boolean>} Verified amounts or false if invalid
 */
export const validateOrderPrices = async (reqBody) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        shippingAmount,
        packagingAmount = 0,
        shippingMethod = "standard",
        packagingOption = "standard",
        totalAmount,
        currency = "INR",
    } = reqBody;

    const rates = await fetchCurrentRates();
    const country = shippingInfo?.country || "";
    const countryLower = country.toLowerCase();
    const checkoutCurrency = currency.toUpperCase();

    // 1. Calculate database items total in INR
    let calculatedItemsPriceInINR = 0;
    for (const item of orderItems) {
        const product = await Product.findById(item.product);
        if (!product) {
            console.error(`Product not found during validation: ${item.product}`);
            return false;
        }

        let basePrice = product.price;
        if (item.size && product.variants && product.variants.length > 0) {
            const variant = product.variants.find((v) => v.size === item.size);
            if (variant) {
                basePrice = variant.price;
            }
        }

        calculatedItemsPriceInINR += basePrice * item.quantity;
    }

    // 2. Convert items total to checkout currency
    const expectedItemsPrice = Number(
        convertPrice(calculatedItemsPriceInINR, checkoutCurrency, rates).toFixed(2)
    );

    // 3. Calculate shipping in AUD base first, then convert
    const itemsPriceInAUD = convertPrice(calculatedItemsPriceInINR, "AUD", rates);
    const shippingInfoCalculated = await calculateShipping(
        country,
        itemsPriceInAUD,
        shippingMethod
    );
    const expectedShippingAmount = Number(
        convertPrice(
            shippingInfoCalculated.shippingAmount,
            checkoutCurrency,
            rates
        ).toFixed(2)
    );

    // 4. Calculate packaging in AUD base, then convert (no packaging upgrade for India)
    let expectedPackagingAmount = 0;
    if (countryLower !== "india") {
        const packagingInfoCalculated = await calculatePackaging(packagingOption);
        expectedPackagingAmount = Number(
            convertPrice(
                packagingInfoCalculated.packagingAmount,
                checkoutCurrency,
                rates
            ).toFixed(2)
        );
    }

    // 5. Calculate total
    const expectedTotalAmount = Number(
        (
            expectedItemsPrice +
            expectedShippingAmount +
            expectedPackagingAmount
        ).toFixed(2)
    );

    // 6. Tolerance checks (allow small diff due to rounding / cache mismatch)
    const tolerance = checkoutCurrency === "INR" ? 15 : 2; // ₹15 tolerance for INR, $2 tolerance for AUD/USD/GBP etc.

    const itemsPriceDiff = Math.abs(itemsPrice - expectedItemsPrice);
    const shippingDiff = Math.abs(shippingAmount - expectedShippingAmount);
    const packagingDiff = Math.abs(packagingAmount - expectedPackagingAmount);
    const totalDiff = Math.abs(totalAmount - expectedTotalAmount);

    if (
        itemsPriceDiff > tolerance ||
        shippingDiff > tolerance ||
        packagingDiff > tolerance ||
        totalDiff > tolerance
    ) {
        console.error(`Price validation failed.
          Expected items: ${expectedItemsPrice}, got: ${itemsPrice} (diff: ${itemsPriceDiff})
          Expected shipping: ${expectedShippingAmount}, got: ${shippingAmount} (diff: ${shippingDiff})
          Expected packaging: ${expectedPackagingAmount}, got: ${packagingAmount} (diff: ${packagingDiff})
          Expected total: ${expectedTotalAmount}, got: ${totalAmount} (diff: ${totalDiff})`);
        return false;
    }

    return {
        itemsPrice: expectedItemsPrice,
        shippingAmount: expectedShippingAmount,
        packagingAmount: expectedPackagingAmount,
        totalAmount: expectedTotalAmount,
        taxAmount: 0,
    };
};
