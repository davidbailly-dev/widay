import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/database"; 
import { requireEnv } from "./config/env";

dotenv.config();

const env = requireEnv();
const PORT = Number(env.PORT);

if (!Number.isInteger(PORT)) {
    throw new Error("PORT must be a valid server");
}

async function startServer(): Promise<void> {
    try {
        // Connect to database
        await connectDB();

        app.listen(PORT, () => {
            console.log(`✅ Server is running on port ${PORT}`);
        });
    } catch(error) {
        console.error('❌ Failed to start server: ', error);
        process.exit(1);
    }
}

// Run server
startServer();