const ContactSubmission = require("../../models/contact/contactSubmission.model");
const ContactSettings = require("../../models/contact/contactSettings.model");

/**
 * GET CONTACT PAGE DATA
 * GET /api/contact
 */
const getContactPage = async (req, res) => {
  try {
    let settings = await ContactSettings.findOne();

    if (!settings) {
      settings = await ContactSettings.create({});
    }

    return res.status(200).json({
      success: true,
      message: "Contact page data fetched successfully",
      data: settings,
    });
  } catch (error) {
    console.error("Get contact page error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch contact page data",
    });
  }
};

/**
 * SUBMIT CONTACT FORM
 * POST /api/contact/submit
 */
const submitContactForm = async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    /* ==========================
       VALIDATION
    ========================== */

    if (!fullName || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be 10 digits",
      });
    }

    /* ==========================
       SAVE SUBMISSION
    ========================== */

    const submission = await ContactSubmission.create({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Your message has been submitted successfully",
      data: submission,
    });
  } catch (error) {
    console.error("Submit contact form error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit contact form",
    });
  }
};

/**
 * UPDATE CONTACT SETTINGS
 * PUT /api/contact
 */
const updateContactSettings = async (req, res) => {
  try {
    const payload = req.body;

    let settings = await ContactSettings.findOne();

    if (!settings) {
      settings = new ContactSettings({});
    }

    Object.keys(payload).forEach((key) => {
      settings[key] = payload[key];
    });

    await settings.save();

    return res.status(200).json({
      success: true,
      message: "Contact settings updated successfully",
      data: settings,
    });
  } catch (error) {
    console.error("Update contact settings error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update contact settings",
    });
  }
};

/**
 * GET CONTACT SUBMISSIONS
 * GET /api/contact/submissions
 */
const getContactSubmissions = async (req, res) => {
  try {
    const submissions = await ContactSubmission.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Contact submissions fetched successfully",
      data: submissions,
    });
  } catch (error) {
    console.error("Get contact submissions error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch contact submissions",
    });
  }
};

module.exports = {
  getContactPage,
  submitContactForm,
  updateContactSettings,
  getContactSubmissions,
};
