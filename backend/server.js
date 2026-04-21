const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// ==========================================
// LOAD ENV FIRST
// ==========================================
dotenv.config();

// ==========================================
// DB + REDIS
// ==========================================
const connectDB = require("./config/db");
const { connectRedis } = require("./config/redis");

// ==========================================
// ROUTES
// ==========================================
const propertyRoutes = require("./routes/propertyRoutes");
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");

// ==========================================
// MIDDLEWARE
// ==========================================
const { globalLimiter } = require("./middleware/rateLimiter");
const { errorHandler, notFound } = require("./middleware/errorHandler");

// ==========================================
// INIT APP
// ==========================================
const app = express();

// ==========================================
// SECURITY MIDDLEWARE
// ==========================================
app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  }),
);

app.use(cookieParser());

// ==========================================
// BODY PARSER
// ==========================================
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// ==========================================
// LOGGING (DEV ONLY)
// ==========================================
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ==========================================
// RATE LIMITING (GLOBAL)
// ==========================================
app.use(globalLimiter);

// ==========================================
// HEALTH CHECK
// ==========================================
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// ==========================================
// ROUTES
// ==========================================
app.use("/api/properties", propertyRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);

// ==========================================
// 404 HANDLER
// ==========================================
app.use(notFound);

// ==========================================
// ERROR HANDLER (LAST)
// ==========================================
app.use(errorHandler);

// ==========================================
// START SERVER (PROPER ORDER)
// ==========================================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log("🔄 Starting server...");

    // ✅ Connect MongoDB
    await connectDB();

    // ✅ Connect Redis (non-blocking safe)
    await connectRedis();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
