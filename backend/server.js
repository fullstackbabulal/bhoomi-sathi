import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

// DB
import connectDB from "./config/db.js";

// Routes
import propertyRoutes from "./routes/propertyRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

// Middleware
import { globalLimiter } from "./middleware/rateLimiter.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

// ==========================================
// LOAD ENV
// ==========================================
dotenv.config();

// ==========================================
// CONNECT DATABASE
// ==========================================
connectDB();

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
// START SERVER
// ==========================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
