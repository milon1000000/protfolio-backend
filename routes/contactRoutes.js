// import express from "express";
// import { contactController } from "../app/controller/contactController.js";
// const contactRouter=express.Router();

// // routes
// contactRouter.post("/contactController",contactController)

// export default contactRouter;


import express from "express";
import { contactController } from "../app/controller/contactController.js";

const contactRouter = express.Router();

// ✅ clean route (IMPORTANT)
contactRouter.post("/", contactController);

export default contactRouter;