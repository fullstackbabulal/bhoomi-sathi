const express = require("express");

const {
  getContactPage,
  submitContactForm,
  updateContactSettings,
  getContactSubmissions,
} = require("../../controllers/contact/contact.controller");

const router = express.Router();

/* ==================================
   PUBLIC ROUTES
================================== */

// Get Contact Page Data
router.get("/", getContactPage);

// Submit Contact Form
router.post("/submit", submitContactForm);

/* ==================================
   ADMIN ROUTES
================================== */

// Update Contact Settings
router.put("/", updateContactSettings);

// Get Contact Submissions
router.get("/submissions", getContactSubmissions);

module.exports = router;
