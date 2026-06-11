// File: mongodb.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("❌ MONGO_URI missing in environment variables");
      process.exit(1);
    }

    // 🔒 Recommended connection options
    const opts = {
      maxPoolSize: 20, // Limit connections
      serverSelectionTimeoutMS: 10000, // Increase timeout for Windows DNS issues
      socketTimeoutMS: 45000, // Close idle sockets
      retryWrites: true, // Retry writes if supported
      autoIndex: false, // 🔒 Prevent auto-creating indexes in prod
      family: 4, // IPv4 only - fixes Windows DNS SRV querySrv ECONNREFUSED
      authSource: "admin", // 🔒 Explicit auth database (override if needed)
      connectTimeoutMS: 10000,
    };

    // ✅ Security event logging
    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB Connected Successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB Connection Error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB Disconnected");
    });

    // 🚀 Connect (don't log secrets like MONGO_URI)
    await mongoose.connect(process.env.MONGO_URI, opts);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;