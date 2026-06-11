// ======================================================
// File: backend/models/User.model.js
// Description: User Model (Admin / Agent / User)
// ======================================================

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// ======================================================
// USER SCHEMA
// ======================================================
const userSchema = new mongoose.Schema(
  {
    // ==================================================
    // BASIC INFORMATION
    // ==================================================
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    // ==================================================
    // ROLE & AUTHORIZATION
    // ==================================================
    role: {
      type: String,
      enum: ["admin", "agent", "user"],
      default: "user",
      required: true,
      index: true,
    },

    // ==================================================
    // PROFILE
    // ==================================================
    avatar: {
      type: String,
      default: "",
      trim: true,
    },

    // ==================================================
    // FAVORITE PROPERTIES
    // ==================================================
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],

    // ==================================================
    // ACCOUNT STATUS
    // ==================================================
    isVerified: {
      type: Boolean,
      default: false,
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// ======================================================
// HASH PASSWORD BEFORE SAVE
// ======================================================
/*userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);

    next();
  } catch (error) {
    next(error);
  }
});
*/

// ======================================================
// HASH PASSWORD BEFORE SAVE
// ======================================================
userSchema.pre("save", async function () {
  // ==============================================
  // PASSWORD NOT MODIFIED
  // ==============================================
  if (!this.isModified("password")) {
    return;
  }

  // ==============================================
  // HASH PASSWORD
  // ==============================================
  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

/*userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});*/

// ======================================================
// COMPARE PASSWORD METHOD
// ======================================================
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ======================================================
// SAFE USER JSON RESPONSE
// Removes sensitive fields automatically
// ======================================================
userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;

  return user;
};

// ======================================================
// EXPORT MODEL
// ======================================================
const User = mongoose.model("User", userSchema);

module.exports = User;
