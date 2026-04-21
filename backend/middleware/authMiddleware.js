const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ==========================================
// VERIFY TOKEN (PROTECT ROUTES)
// ==========================================
const protect = async (req, res, next) => {
  try {
    let token;

    // ===============================
    // 1. GET TOKEN FROM HEADER
    // ===============================
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // ===============================
    // 2. GET TOKEN FROM COOKIES
    // ===============================
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    // ===============================
    // 3. NO TOKEN
    // ===============================
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    // ===============================
    // 4. VERIFY TOKEN
    // ===============================
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ===============================
    // 5. GET USER
    // ===============================
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // ===============================
    // 6. ATTACH USER TO REQUEST
    // ===============================
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, invalid token",
    });
  }
};

// ==========================================
// ROLE-BASED AUTHORIZATION
// ==========================================
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Role '${req.user.role}' not allowed`,
      });
    }

    next();
  };
};

// ==========================================
// OPTIONAL AUTH (FOR MIXED ROUTES)
// ==========================================
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return next(); // continue without user
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (user) {
      req.user = user;
    }

    next();
  } catch (error) {
    next(); // fail silently
  }
};

// ==========================================
// ADMIN ONLY (SHORTCUT)
// ==========================================
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Admin access required",
  });
};

module.exports = {
  protect,
  authorize,
  optionalAuth,
  adminOnly,
};
