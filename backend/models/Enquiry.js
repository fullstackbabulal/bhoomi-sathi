const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
      index: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
    },

    message: { type: String, trim: true },

    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      index: true,
    },

    source: {
      type: String,
      enum: ["website", "facebook", "whatsapp", "call", "other"],
      default: "website",
      index: true,
    },

    campaign: String,
    medium: String,

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
        createdAt: { type: Date, default: Date.now },
      },
    ],

    isRead: { type: Boolean, default: false, index: true },
    followUpDate: Date,

    isSpam: { type: Boolean, default: false },
    ipAddress: String,
    userAgent: String,
  },
  { timestamps: true },
);

// INDEXES
enquirySchema.index({ createdAt: -1 });
enquirySchema.index({ phone: 1, createdAt: -1 });
enquirySchema.index({ phone: 1, property: 1, createdAt: -1 });

// Normalize phone
enquirySchema.pre("save", function (next) {
  if (this.phone) {
    this.phone = this.phone.replace(/\D/g, "").slice(-10);
  }
  next();
});

module.exports = mongoose.model("Enquiry", enquirySchema);
