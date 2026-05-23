// ======================================================
// File: backend/scripts/createSuperAdmin.js
// Description: Create First Admin User
// ======================================================

require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("../config/db.config");
const User = require("../models/User.model");

const createSuperAdmin = async () => {
  try {
    // ================================================
    // CONNECT DATABASE
    // ================================================
    await connectDB();

    const email = "babulalratua@gmail.com";
    const password = "947497@superAdmin";

    // ================================================
    // CHECK EXISTING ADMIN
    // ================================================
    const existingAdmin = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingAdmin) {
      console.log("⚠️ Admin already exists");
      console.log({
        id: existingAdmin._id,
        email: existingAdmin.email,
        role: existingAdmin.role,
      });

      process.exit(0);
    }

    // ================================================
    // CREATE ADMIN
    // Password auto-hashed by pre('save')
    // ================================================
    const admin = await User.create({
      name: "Super Admin",
      email: email.toLowerCase(),
      password,
      role: "admin",
      phone: "",
      avatar: "",
      isVerified: true,
      isActive: true,
    });

    console.log("✅ First Admin Created Successfully");
    console.log({
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to create admin");
    console.error(error.message);

    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

createSuperAdmin();
