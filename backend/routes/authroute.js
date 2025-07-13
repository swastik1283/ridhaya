import express from 'express';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import userModel from '../models/UserModel.js';

const router = express.Router();
let otpStore = {}; // email -> { code, expiresAt }

// SEND OTP
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = {
      code: otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // valid for 5 minutes
    };

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    });

    res.json({ success: true, message: 'OTP sent to email' });
  } catch (error) {
    console.error("❌ Error sending OTP:", error.message);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

// VERIFY OTP

router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp, name } = req.body;
    const record = otpStore[email];

    // Debug logs
    console.log("🧾 Record from otpStore:", record);
    console.log("📨 OTP entered by user:", otp);
    console.log("📦 Stored OTP code:", record?.code);
    console.log("⏱️ Stored expiry:", record?.expiresAt);
    console.log("⏱️ Current time:", Date.now());
    console.log("✅ Code match:", record?.code?.toString() === otp?.toString());
    console.log("✅ Not expired:", record?.expiresAt > Date.now());

    if (
      !record ||
      record.code.toString() !== otp.toString() ||
      record.expiresAt < Date.now()
    ) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    let user = await userModel.findOne({ email });
    if (!user) {
      user = await userModel.create({ email, name: name?.trim() || 'User' });
      console.log("👤 New user created:", user);
    } else {
      console.log("👤 Existing user found:", user);
    }

    delete otpStore[email]; // OTP used, delete it

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET.trim(), { expiresIn: '1d' });
    console.log("🔐 Token issued:", token);

    res.json({
      success: true,
      token,
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error("❌ Error verifying OTP:", error.message);
    res.status(500).json({ success: false, message: 'Server error during OTP verification' });
  }
});


export default router;
