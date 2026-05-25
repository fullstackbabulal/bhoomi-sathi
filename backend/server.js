// ======================================================
// File: backend/server.js
// Description: Server Entry Point
// ======================================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");

// ======================================================
// DATABASE
// ======================================================
const connectDB = require("./config/db.config.js");

// ======================================================
// ROUTES
// ======================================================
const authRoutes = require("./routes/auth.route.js");

const propertyRoutes = require("./routes/property.route.js");

const blogRoutes = require("./routes/blog.route.js");

const commentRoutes = require("./routes/comment.route.js");

const aboutRoutes = require("./routes/about.route.js");

const contactRoutes = require("./routes/contact/contact.routes.js");
// ======================================================
// APP CONFIG
// ======================================================
const app = express();

const PORT = process.env.PORT || 4000;

// ======================================================
// CONNECT DATABASE
// ======================================================
connectDB();

// ======================================================
// SECURITY MIDDLEWARE
// ======================================================
app.use(helmet());

// ======================================================
// LOGGER
// ======================================================
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ======================================================
// CORS
// HttpOnly Cookie Support
// ======================================================
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",

    credentials: true,
  }),
);

// ======================================================
// BODY PARSER
// ======================================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================================================
// COOKIE PARSER
// Required for JWT HttpOnly Cookies
// ======================================================
app.use(cookieParser());

// ======================================================
// HEALTH CHECK
// ======================================================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Bhoomi Sathi API Running",
  });
});

// ======================================================
// API ROUTES
// ======================================================
app.use("/api/auth", authRoutes);

app.use("/api/properties", propertyRoutes);

app.use("/api/blogs", blogRoutes);

app.use("/api/comments", commentRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/contact", contactRoutes);
// ======================================================
// 404 HANDLER
// Express 5 Compatible
// ======================================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ======================================================
// GLOBAL ERROR HANDLER
// ======================================================
app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// ======================================================
// START SERVER
// ======================================================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
