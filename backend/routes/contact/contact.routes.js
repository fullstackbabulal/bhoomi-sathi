// ======================================================
// File: backend/routes/contact/contact.route.js
// Description: Contact Routes
// ======================================================

const express = require("express");

const router = express.Router();

// ======================================================
// CONTROLLERS
// ======================================================

const {
  getContactPageData,
  submitContactForm,
  getAllSubmissions,
  updateSubmissionStatus,
} = require("../../controllers/contact/contact.controller");

// ======================================================
// MIDDLEWARE
// ======================================================

const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

// ======================================================
// PUBLIC ROUTES
// ======================================================

// ------------------------------------------------------
// GET CONTACT PAGE DATA
// GET /api/contact
// ------------------------------------------------------

router.get("/", getContactPageData);

// ------------------------------------------------------
// SUBMIT CONTACT FORM
// POST /api/contact/submit
// ------------------------------------------------------

router.post("/submit", submitContactForm);

// ======================================================
// ADMIN ROUTES
// ======================================================

// ------------------------------------------------------
// GET ALL CONTACT SUBMISSIONS
// GET /api/contact/submissions
// ------------------------------------------------------

router.get(
  "/submissions",
  authMiddleware,
  roleMiddleware("admin"),
  getAllSubmissions,
);

// ------------------------------------------------------
// UPDATE SUBMISSION STATUS
// PATCH /api/contact/submissions/:id
// ------------------------------------------------------

router.patch(
  "/submissions/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateSubmissionStatus,
);

// ======================================================
// EXPORT
// ======================================================

module.exports = router;
