const multer = require("multer");
const fs = require("fs");
const path = require("path");

// ======================================================
// SLUGIFY
// ======================================================
const slugify = (text = "") => {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

// ======================================================
// GET ENTITY CONFIG
// ======================================================
const getEntityFolder = (req) => {
  const entity = req.body.entity || req.params.entity || "property";

  switch (entity.toLowerCase()) {
    case "property":
      return {
        type: "property",
        name: req.body.title || req.body.propertyName || "untitled-property",
      };

    case "blog":
      return {
        type: "blog",
        name: req.body.title || req.body.blogTitle || "untitled-blog",
      };

    case "agent":
      return {
        type: "agent",
        name: req.body.name || req.body.agentName || "unknown-agent",
      };

    default:
      return {
        type: "misc",
        name: "general",
      };
  }
};

// ======================================================
// STORAGE
// ======================================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      const { type, name } = getEntityFolder(req);

      const slug = slugify(name);

      // uploads/images/property/name
      const uploadPath = path.join(
        process.cwd(),
        "uploads",
        "images",
        type,
        slug,
      );

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
      const ext = path.extname(file.originalname);

      const uniqueName = `${Date.now()}-${Math.round(
        Math.random() * 1e9,
      )}${ext}`;

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
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed."), false);
  }
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

module.exports = uploadMulter;
