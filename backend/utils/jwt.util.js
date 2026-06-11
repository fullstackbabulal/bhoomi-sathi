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
// COOKIE OPTIONS
// ======================================================

const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,

    secure: isProduction,

    sameSite: isProduction ? "none" : "lax",

    domain: isProduction ? ".bhartiavenue.com" : undefined,

    path: "/",

    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };
};

// ======================================================
// SEND TOKEN RESPONSE
// ======================================================

const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);

  const cookieOptions = getCookieOptions();

  // ====================================================
  // SET HTTPONLY COOKIE
  // ====================================================

  res.cookie("token", token, cookieOptions);

  // ====================================================
  // SAFE USER OBJECT
  // ====================================================

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

  // ====================================================
  // RESPONSE
  // ====================================================

  return res.status(statusCode).json({
    success: true,
    message: "Authentication successful",
    user: safeUser,
  });
};

// ======================================================
// CLEAR COOKIE
// ======================================================

const clearTokenCookie = (res) => {
  res.clearCookie("token", getCookieOptions());
};

// ======================================================
// EXPORTS
// ======================================================

module.exports = {
  generateToken,
  sendTokenResponse,
  clearTokenCookie,
};
