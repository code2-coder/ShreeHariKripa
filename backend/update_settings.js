import mongoose from "mongoose";
import dotenv from "dotenv";
import Settings from "./src/models/settings.js";

dotenv.config();

const updateSettings = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        let settings = await Settings.findOne();
        if (settings) {
            settings.australiaShipping.freeShippingThreshold = 99;
            settings.packaging.exquisitePackagingPrice = 5;
            await settings.save();
            console.log("Settings updated successfully!");
        } else {
            console.log("No settings found, defaults will apply on next fetch.");
        }
    } catch (err) {
        console.error("Error:", err);
    } finally {
        mongoose.disconnect();
    }
};

updateSettings();
