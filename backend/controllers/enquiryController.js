const Enquiry = require("../models/Enquiry");

exports.createEnquiry = async (req, res) => {
  try {
    const { phone, property } = req.body;

    // 🚫 Prevent duplicate within last 5 minutes
    const existing = await Enquiry.findOne({
      phone,
      property,
      createdAt: { $gte: new Date(Date.now() - 5 * 60 * 1000) },
    });

    if (existing) {
      return res.status(200).json({
        success: true,
        message: "Already submitted recently",
      });
    }

    const enquiry = await Enquiry.create({
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    res.status(201).json({ success: true, data: enquiry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
