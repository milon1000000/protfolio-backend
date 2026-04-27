// import Contact from "../model/contactModel.js";
// import { sendContactToAdmin } from "../utility/emailUtility.js";

// export const contactController = async (req, res) => {
//   try {
//     const { name, email, message } = req.body;

//     if (!name || !email || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     const newMessage = await Contact.create({
//       name,
//       email,
//       message,
//     });

//     await sendContactToAdmin({ name, email, message });

//     return res.status(200).json({
//       success: true,
//       message: "Message sent successfully",
//       data: newMessage,
//     });
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
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