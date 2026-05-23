// ======================================================
// File: controllers/enquiryController.js
// Description: Enquiry Controller
// ======================================================

const Enquiry = require("../models/Enquiry.model.js");

// ======================================================
// CREATE ENQUIRY
// ======================================================
const createEnquiry = async (
  req,
  res
) => {
  try {
    const {
      name,
      phone,
      property,
    } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================
    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message:
          "Name and phone are required",
      });
    }

    // ==========================================
    // PREVENT DUPLICATE ENQUIRY
    // Same phone + property
    // Within last 5 minutes
    // ==========================================
    const existingEnquiry =
      await Enquiry.findOne({
        phone,
        property:
          property || null,

        createdAt: {
          $gte: new Date(
            Date.now() -
              5 *
                60 *
                1000
          ),
        },
      });

    if (existingEnquiry) {
      return res.status(200).json({
        success: true,
        message:
          "You already submitted an enquiry recently",
      });
    }

    // ==========================================
    // CREATE ENQUIRY
    // ==========================================
    const enquiry =
      await Enquiry.create({
        ...req.body,

        ipAddress:
          req.ip,

        userAgent:
          req.headers[
            "user-agent"
          ] || "",
      });

    return res.status(201).json({
      success: true,
      message:
        "Enquiry submitted successfully",
      data: enquiry,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

// ======================================================
// GET ALL ENQUIRIES
// ======================================================
const getEnquiries =
  async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        status,
        property,
      } = req.query;

      const query = {};

      // ==========================================
      // FILTERS
      // ==========================================
      if (status) {
        query.status =
          status;
      }

      if (property) {
        query.property =
          property;
      }

      const enquiries =
        await Enquiry.find(
          query
        )
          .populate(
            "property",
            "title slug"
          )
          .populate(
            "assignedTo",
            "name email"
          )
          .sort({
            createdAt:
              -1,
          })
          .skip(
            (page - 1) *
              Number(limit)
          )
          .limit(
            Number(limit)
          );

      const total =
        await Enquiry.countDocuments(
          query
        );

      return res.status(200).json({
        success: true,
        total,
        page:
          Number(page),
        pages:
          Math.ceil(
            total /
              Number(
                limit
              )
          ),
        data: enquiries,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// ======================================================
// GET SINGLE ENQUIRY
// ======================================================
const getEnquiryById =
  async (req, res) => {
    try {
      const enquiry =
        await Enquiry.findById(
          req.params.id
        )
          .populate(
            "property"
          )
          .populate(
            "assignedTo",
            "name email phone"
          );

      if (!enquiry) {
        return res.status(404).json({
          success: false,
          message:
            "Enquiry not found",
        });
      }

      // Mark as read
      if (!enquiry.isRead) {
        enquiry.isRead =
          true;

        await enquiry.save();
      }

      return res.status(200).json({
        success: true,
        data: enquiry,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// ======================================================
// UPDATE ENQUIRY
// ======================================================
const updateEnquiry =
  async (req, res) => {
    try {
      const enquiry =
        await Enquiry.findById(
          req.params.id
        );

      if (!enquiry) {
        return res.status(404).json({
          success: false,
          message:
            "Enquiry not found",
        });
      }

      Object.assign(
        enquiry,
        req.body
      );

      await enquiry.save();

      return res.status(200).json({
        success: true,
        message:
          "Enquiry updated successfully",
        data: enquiry,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// ======================================================
// DELETE ENQUIRY
// ======================================================
const deleteEnquiry =
  async (req, res) => {
    try {
      const enquiry =
        await Enquiry.findById(
          req.params.id
        );

      if (!enquiry) {
        return res.status(404).json({
          success: false,
          message:
            "Enquiry not found",
        });
      }

      await enquiry.deleteOne();

      return res.status(200).json({
        success: true,
        message:
          "Enquiry deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// ======================================================
// EXPORTS
// ======================================================
module.exports = {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
};