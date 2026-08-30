import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    orderItems: z.array(
      z.object({
        name: z.string().min(1, "Item name is required"),
        quantity: z.number().int().positive("Quantity must be at least 1"),
        image: z.string().default("no-image"),
        price: z.number().nonnegative("Price cannot be negative"),
        product: z.string().min(1, "Product ID is required"),
        size: z.string().optional().nullable(),
      })
    ).min(1, "Order must contain at least one item"),
    shippingInfo: z.object({
      fullName: z.string().min(2, "Full name is required"),
      address: z.string().min(3, "Address is required"),
      city: z.string().min(2, "City is required"),
      phoneNo: z.string().min(6, "Valid phone number is required"),
      altPhoneNo: z.string().optional().nullable(),
      zipCode: z.string().min(2, "Valid postal/zip code is required"),
      country: z.string().min(2, "Country is required"),
    }),
    paymentMethod: z.enum(["COD", "Card"]),
    shippingMethod: z.enum(["standard", "express"]).default("standard"),
    packagingOption: z.enum(["standard", "exquisite"]).default("standard"),
    itemsPrice: z.number().nonnegative().optional(),
    taxAmount: z.number().nonnegative().optional(),
    shippingAmount: z.number().nonnegative().optional(),
    packagingAmount: z.number().nonnegative().optional(),
    totalAmount: z.number().nonnegative().optional(),
    currency: z.string().default("INR"),
  }),
});

export const updateOrderStatusSchema = z.object({
  body: z.object({
    status: z.enum(["Processing", "Shipped", "Delivered"]).optional(),
    trackingId: z.string().optional(),
    trackingUrl: z.string().optional(),
  }),
});
