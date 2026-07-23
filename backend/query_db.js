import mongoose from "mongoose";
import dotenv from "dotenv";
import Settings from "./src/models/settings.js";

dotenv.config();

const queryDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const settings = await Settings.findOne();
        console.log(JSON.stringify(settings, null, 2));
    } catch (err) {
        console.error("Error:", err);
    } finally {
        mongoose.disconnect();
    }
};

queryDb();
