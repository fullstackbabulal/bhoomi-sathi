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
const path = require("path");

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
const testimonialRoutes = require("./routes/Testimonials.route");
const enquiryRoutes = require("./routes/enquiry.routes.js");
// ======================================================
// APP CONFIG
// ======================================================
const app = express();

const PORT = process.env.PORT || 4000;

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

// ======================================================
// CONNECT DATABASE
// ======================================================
connectDB();

// ======================================================
// SECURITY MIDDLEWARE
// Fix:
// ERR_BLOCKED_BY_RESPONSE.NotSameOrigin
// ======================================================
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  }),
);

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
    origin: CLIENT_URL,
    credentials: true,
  }),
);

// ======================================================
// BODY PARSER
// ======================================================
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

// ======================================================
// COOKIE PARSER
// ======================================================
app.use(cookieParser());

// ======================================================
// STATIC FILES
// Serve Uploaded Images/Videos
// Example:
// http://localhost:4000/uploads/file.png
// ======================================================
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"), {
    setHeaders: (res) => {
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  }),
);

// ======================================================
// HEALTH CHECK
// ======================================================
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "✅ Bhoomi Sathi API is running successfully.",
    server: `http://localhost:${PORT}`,
    environment: process.env.NODE_ENV || "development",
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
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/enquiries", enquiryRoutes);

// ======================================================
// 404 HANDLER
// ======================================================
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "❌ API route not found.",
    path: req.originalUrl,
    method: req.method,
  });
});

// ======================================================
// GLOBAL ERROR HANDLER
// ======================================================
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);

  return res.status(500).json({
    success: false,
    message: "Something went wrong on the server.",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// ======================================================
// START SERVER
// ======================================================
app.listen(PORT, () => {
  console.log("");
  console.log("====================================");
  console.log("🚀 Bhoomi Sathi Backend Started");
  console.log(`🌐 Server URL: http://localhost:${PORT}`);
  console.log(`🖥️ Client URL: ${CLIENT_URL}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log("====================================");
  console.log("");
});
