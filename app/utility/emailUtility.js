// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export const sendContactToAdmin = async ({ name, email, message }) => {
//   const mailOptions = {
//     from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
//     to: "milonmondolmd33@gmail.com", 

//     subject: "New Contact Message",

//     html: `
//       <h2>New Message</h2>
//       <p><b>Name:</b> ${name}</p>
//       <p><b>Email:</b> ${email}</p>
//       <p><b>Message:</b> ${message}</p>
//     `,
//   };

//   return await transporter.sendMail(mailOptions);
// };



import Contact from "../model/contactModel.js";
import { sendContactToAdmin } from "../utility/emailUtility.js";

export const contactController = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // ✅ validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ save to DB
    const newMessage = await Contact.create({
      name,
      email,
      message,
    });

    // ✅ email (fail holeo API crash korbe na)
    try {
      await sendContactToAdmin({ name, email, message });
    } catch (err) {
      console.log("Email error:", err.message);
    }

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("FULL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message, // 🔥 debug er jonno
    });
  }
};