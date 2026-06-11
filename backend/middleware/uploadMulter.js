// ======================================================
// File: backend/middleware/uploadMulter.js
// Description: Shared Upload Middleware
// Supports: Property + Blog + Agent Uploads
// ======================================================

const multer = require("multer");
const fs = require("fs");
const path = require("path");

// ======================================================
// SAFE STRING
// ======================================================

const safeString = (value = "") => {
  return String(value).trim();
};

// ======================================================
// SLUGIFY
// ======================================================

const slugify = (text = "") => {
  return safeString(text)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// ======================================================
// GET ENTITY CONFIG
// property | blog | agent
// ======================================================

const getEntityFolder = (req) => {
  const entity = safeString(
    req.body.entity || req.params.entity || "property",
  ).toLowerCase();

  switch (entity) {
    // ==================================================
    // PROPERTY
    // ==================================================
    case "property": {
      const title = safeString(req.body.title || req.body.propertyName);

      const slug = safeString(req.body.slug);

      return {
        type: "property",

        // priority:
        // slug → title → fallback
        name: slug || title || "general-property",
      };
    }

    // ==================================================
    // BLOG
    // ==================================================
    case "blog": {
      const title = safeString(req.body.title || req.body.blogTitle);

      const slug = safeString(req.body.slug);

      return {
        type: "blog",

        // priority:
        // slug → title → fallback
        // FIXED:
        // removes untitled-blog issue
        name: slug || title || "general-blog",
      };
    }

    // ==================================================
    // AGENT
    // ==================================================
    case "agent": {
      const name = safeString(req.body.name || req.body.agentName);

      const slug = safeString(req.body.slug);

      return {
        type: "agent",

        // priority:
        // slug → name → fallback
        name: slug || name || "general-agent",
      };
    }

    // ==================================================
    // DEFAULT
    // ==================================================
    default:
      return {
        type: "misc",
        name: "general",
      };
  }
};

// ======================================================
// STORAGE
// uploads/images/{type}/{slug}
// ======================================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      const { type, name } = getEntityFolder(req);

      const slug = slugify(name) || "general";

      const uploadPath = path.join(
        process.cwd(),
        "uploads",
        "images",
        type,
        slug,
      );

      // ensure folder exists
      fs.mkdirSync(uploadPath, {
        recursive: true,
      });

      cb(null, uploadPath);
    } catch (error) {
      cb(error);
    }
  },

  filename: (req, file, cb) => {
    try {
      const extension = path.extname(file.originalname);

      const uniqueName = `${Date.now()}-${Math.round(
        Math.random() * 1e9,
      )}${extension}`;

      cb(null, uniqueName);
    } catch (error) {
      cb(error);
    }
  },
});

// ======================================================
// IMAGE FILTER
// ======================================================

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  return cb(new Error("Only image files are allowed."), false);
};

// ======================================================
// MULTER CONFIG
// ======================================================

const uploadMulter = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 20,
  },
});

// ======================================================
// EXPORT
// ======================================================

module.exports = uploadMulter;
