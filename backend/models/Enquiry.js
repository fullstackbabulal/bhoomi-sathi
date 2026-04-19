import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    // ===============================
    // USER INFO (LEAD CAPTURE)
    // ===============================
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String, // IMPORTANT: always string (10-digit)
      required: true,
      match: /^[0-9]{10}$/,
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },

    message: {
      type: String,
      trim: true,
    },

    // ===============================
    // PROPERTY RELATION
    // ===============================
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      index: true,
    },

    // ===============================
    // SOURCE TRACKING (MARKETING)
    // ===============================
    source: {
      type: String,
      enum: ["website", "facebook", "whatsapp", "call", "other"],
      default: "website",
      index: true,
    },

    campaign: String, // FB Ad Campaign Name
    medium: String, // cpc, organic, etc.

    // ===============================
    // STATUS (SALES PIPELINE)
    // ===============================
    status: {
      type: String,
      enum: ["new", "contacted", "visited", "closed", "rejected"],
      default: "new",
      index: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    notes: [
      {
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // ===============================
    // ANTI-SPAM
    // ===============================
    isSpam: {
      type: Boolean,
      default: false,
    },
    ipAddress: String,
    userAgent: String,
  },
  { timestamps: true },
);

// ===============================
// INDEXES
// ===============================
enquirySchema.index({ createdAt: -1 });
enquirySchema.index({ phone: 1, createdAt: -1 });

const Enquiry = mongoose.model("Enquiry", enquirySchema);

export default Enquiry;
