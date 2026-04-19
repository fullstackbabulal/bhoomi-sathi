// ==============================
// USER MODEL (AUTH + ROLES + FAVORITES)
// ==============================

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// ==============================
// USER SCHEMA
// ==============================
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // 🔐 never return password by default
    },

    phone: {
      type: String, // keep as string (as per your rule)
    },

    role: {
      type: String,
      enum: ["user", "agent", "admin"],
      default: "user",
    },

    avatar: {
      type: String,
      default: "",
    },

    // ❤️ Saved Properties
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],

    isVerified: {
      type: Boolean,
      default: false,
    },

    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true },
);

// ==============================
// INDEXES (PERFORMANCE)
// ==============================
UserSchema.index({ email: 1 });

// ==============================
// PASSWORD HASHING (PRE SAVE)
// ==============================
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// ==============================
// MATCH PASSWORD METHOD
// ==============================
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ==============================
// EXPORT
// ==============================
export default mongoose.model("User", UserSchema);
