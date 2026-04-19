// ==========================================
// GLOBAL ERROR HANDLER (LAST MIDDLEWARE)
// ==========================================
export const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Server Error";

  // ==========================================
  // MONGOOSE: INVALID OBJECT ID
  // ==========================================
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ID: ${err.path}`;
  }

  // ==========================================
  // MONGOOSE: DUPLICATE KEY
  // ==========================================
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
  }

  // ==========================================
  // MONGOOSE: VALIDATION ERROR
  // ==========================================
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  // ==========================================
  // JWT ERRORS
  // ==========================================
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  // ==========================================
  // RESPONSE
  // ==========================================
  res.status(statusCode).json({
    success: false,
    message,

    // Only show stack in development
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};

// ==========================================
// 404 NOT FOUND HANDLER
// ==========================================
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
