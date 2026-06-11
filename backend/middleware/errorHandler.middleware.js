// ======================================================
// File: middleware/errorHandler.js
// Description: Global Error Middleware
// ======================================================

// ======================================================
// GLOBAL ERROR HANDLER
// ======================================================
const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err.message);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // ====================================================
  // INVALID MONGODB OBJECT ID
  // ====================================================
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ID: ${err.path}`;
  }

  // ====================================================
  // DUPLICATE KEY ERROR
  // ====================================================
  if (err.code === 11000) {
    statusCode = 400;

    const field = Object.keys(err.keyValue)[0];

    message = `${field} already exists`;
  }

  // ====================================================
  // MONGOOSE VALIDATION ERROR
  // ====================================================
  if (err.name === "ValidationError") {
    statusCode = 400;

    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }

  // ====================================================
  // JWT ERROR
  // ====================================================
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  // ====================================================
  // JWT EXPIRED
  // ====================================================
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  // ====================================================
  // RESPONSE
  // ====================================================
  res.status(statusCode).json({
    success: false,
    message,

    // Show stack only in development
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};

// ======================================================
// 404 NOT FOUND HANDLER
// ======================================================
const notFound = (req, res, next) => {
  const error = new Error(
    `Route not found - ${req.originalUrl}`
  );

  res.status(404);

  next(error);
};

// ======================================================
// EXPORTS
// ======================================================
module.exports = {
  errorHandler,
  notFound,
};