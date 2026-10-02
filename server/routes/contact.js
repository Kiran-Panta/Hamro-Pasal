import express from "express";
import nodemailer from "nodemailer";
import Contact from "../models/Contact.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

// =========================
// CUSTOMER SENDS MESSAGE
// =========================
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Save in MongoDB
    const contact = await Contact.create({
      name,
      email,
      message,
    });

    // Send email to admin
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "New Contact Message - Hamro Pasal",
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Message saved & sent successfully",
      contact,
    });
  } catch (error) {
    console.log("CONTACT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to process contact request",
    });
  }
});

// =========================
// ADMIN GETS ALL MESSAGES
// =========================
router.get("/admin", isAuth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not admin",
      });
    }

    const messages = await Contact.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.log("GET CONTACT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch contact messages",
    });
  }
});

// =========================
// ADMIN DELETE MESSAGE
// =========================
router.delete("/admin/:id", isAuth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not admin",
      });
    }

    const message = await Contact.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.log("DELETE CONTACT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete message",
    });
  }
});

export default router;