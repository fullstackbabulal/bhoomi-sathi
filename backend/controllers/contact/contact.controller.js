// ======================================================
// File: backend/controllers/contact.controller.js
// Description: Contact Controller
// ======================================================

const ContactSettings = require("../../models/contact/contactSettings.model");
const ContactSubmission = require("../../models/contact/contactSubmission.model");

// ======================================================
// GET CONTACT PAGE DATA
// GET /api/contact
// ======================================================

const getContactPageData = async (req, res) => {
  try {
    let settings = await ContactSettings.findOne().lean();

    if (!settings) {
      settings = await ContactSettings.create({});
    }

    return res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("Get Contact Page Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch contact page data.",
    });
  }
};

// ======================================================
// SUBMIT CONTACT FORM
// POST /api/contact/submit
// ======================================================

const submitContactForm = async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    // ==================================================
    // VALIDATION
    // ==================================================

    if (!fullName?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Full name is required.",
      });
    }

    if (!email?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    if (!phone?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Phone is required.",
      });
    }

    if (!subject?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Subject is required.",
      });
    }

    if (!message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    // ==================================================
    // SAVE SUBMISSION
    // ==================================================

    const submission = await ContactSubmission.create({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Contact form submitted successfully.",
      data: submission,
    });
  } catch (error) {
    console.error("Submit Contact Form Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to submit contact form.",
    });
  }
};

// ======================================================
// GET ALL CONTACT SUBMISSIONS
// ADMIN ONLY
// GET /api/contact/submissions
// ======================================================

const getAllSubmissions = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    }

    const submissions = await ContactSubmission.find(query)
      .sort({
        createdAt: -1,
      })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await ContactSubmission.countDocuments(query);

    return res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: submissions,
    });
  } catch (error) {
    console.error("Get Submissions Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch submissions.",
    });
  }
};

// ======================================================
// UPDATE SUBMISSION STATUS
// ADMIN ONLY
// PATCH /api/contact/submissions/:id
// ======================================================

const updateSubmissionStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = ["new", "in-progress", "resolved", "closed"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid submission status.",
      });
    }

    const submission = await ContactSubmission.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
      },
    );

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Submission updated successfully.",
      data: submission,
    });
  } catch (error) {
    console.error("Update Submission Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update submission.",
    });
  }
};

// ======================================================
// EXPORTS
// ======================================================

module.exports = {
  getContactPageData,
  submitContactForm,
  getAllSubmissions,
  updateSubmissionStatus,
};
