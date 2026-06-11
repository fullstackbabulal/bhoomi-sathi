// ======================================================
// File: backend/utils/jwt.util.js
// Description: JWT Utility
// Generates JWT Token + Sets HttpOnly Cookie
// ======================================================

const jwt = require("jsonwebtoken");

// ======================================================
// GENERATE JWT TOKEN
// ======================================================
const generateToken = (userId) => {
  return jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || "7d",
    },
  );
};

// ======================================================
// SEND TOKEN IN HTTPONLY COOKIE
// ======================================================
const sendTokenResponse = (user, statusCode, res) => {
  // ================================================
  // GENERATE TOKEN
  // ================================================
  const token = generateToken(user._id);

  // ================================================
  // COOKIE CONFIGURATION
  // ================================================
  const cookieOptions = {
    httpOnly: true,

    secure: process.env.NODE_ENV === "production",

    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",

    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  // ================================================
  // SET COOKIE
  // ================================================
  res.cookie("token", token, cookieOptions);

  // ================================================
  // REMOVE PASSWORD FROM RESPONSE
  // ================================================
  const safeUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    avatar: user.avatar,
    isVerified: user.isVerified,
    isActive: user.isActive,
  };

  // ================================================
  // SEND RESPONSE
  // ================================================
  return res.status(statusCode).json({
    success: true,
    message: "Authentication successful",
    user: safeUser,
  });
};

// ======================================================
// CLEAR AUTH COOKIE (LOGOUT)
// ======================================================
const clearTokenCookie = (res) => {
  res.clearCookie("token", {
    httpOnly: true,

    secure: process.env.NODE_ENV === "production",

    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
};

// ======================================================
// EXPORTS
// ======================================================
module.exports = {
  generateToken,
  sendTokenResponse,
  clearTokenCookie,
};
