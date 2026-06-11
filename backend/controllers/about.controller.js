// ======================================================
// File: backend/controllers/about.controller.js
// Description: About Page Controller
// ======================================================

// ======================================================
// STATIC FALLBACK DATA
// (Temporary until DB/Admin CMS integration)
// ======================================================
const aboutData = require("../data/about.data");

// ======================================================
// GET ABOUT PAGE DATA
// ======================================================
const getAboutPage = async (req, res, next) => {
  try {
    // --------------------------------------------------
    // Future Ready:
    // Replace with DB fetch or CMS fetch
    // Example:
    // const aboutPage = await About.findOne()
    // --------------------------------------------------

    return res.status(200).json({
      success: true,
      message: "About page data fetched successfully",
      data: aboutData,
    });
  } catch (error) {
    console.error("Get About Page Error:", error);

    next(error);
  }
};

// ======================================================
// EXPORTS
// ======================================================
module.exports = {
  getAboutPage,
};
