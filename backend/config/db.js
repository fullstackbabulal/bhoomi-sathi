// ==============================
// MONGODB CONNECTION (PRODUCTION READY)
// ==============================

import mongoose from "mongoose";

// Retry Configuration
const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds

let retries = 0;

// ==============================
// CONNECT DATABASE FUNCTION
// ==============================
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "bhoomi_sathi",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Reset retries on success
    retries = 0;
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);

    if (retries < MAX_RETRIES) {
      retries++;
      console.log(`🔁 Retrying connection... (${retries}/${MAX_RETRIES})`);

      setTimeout(connectDB, RETRY_DELAY);
    } else {
      console.error("🚨 Max retries reached. Exiting...");
      process.exit(1);
    }
  }
};

// ==============================
// CONNECTION EVENTS (IMPORTANT)
// ==============================
mongoose.connection.on("connected", () => {
  console.log("📡 Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Mongoose error:", err.message);
});

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB disconnected!");
});

// ==============================
// GRACEFUL SHUTDOWN
// ==============================
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("🔴 MongoDB connection closed due to app termination");
  process.exit(0);
});

// ==============================
// EXPORT
// ==============================
export default connectDB;
