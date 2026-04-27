import express from "express";
import { contactController } from "../app/controller/contactController.js";
const contactRouter=express.Router();

// routes
contactRouter.post("/contactController",contactController)

export default contactRouter;