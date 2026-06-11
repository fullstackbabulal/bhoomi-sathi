// ======================================================
// File: backend/middleware/role.middleware.js
// Description: Role-Based Authorization Middleware
// ======================================================

// ======================================================
// AUTHORIZE ROLES
// Example:
//
// roleMiddleware("admin")
//
// roleMiddleware("admin", "agent")
//
// roleMiddleware("user", "agent", "admin")
// ======================================================
const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // ================================================
      // USER NOT AUTHENTICATED
      // ================================================
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized. Please login first.",
        });
      }

      // ================================================
      // INVALID ROLE ACCESS
      // ================================================
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message:
            "Access denied. You do not have permission to access this resource.",
        });
      }

      // ================================================
      // ACCESS GRANTED
      // ================================================
      next();
    } catch (error) {
      console.error("Role Middleware Error:", error);

      return res.status(500).json({
        success: false,
        message: "Authorization failed.",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  };
};

// ======================================================
// EXPORT
// ======================================================
module.exports = roleMiddleware;
