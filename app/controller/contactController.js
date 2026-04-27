import Contact from "../model/contactModel.js";
import { sendContactToAdmin } from "../utility/emailUtility.js";

export const contactController = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newMessage = await Contact.create({
      name,
      email,
      message,
    });

    await sendContactToAdmin({ name, email, message });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};