import express from "express";
import { userController } from "../controllers/user.js";
const router = express.Router();
router.get("/getall-user", userController.getAllUser);
router.get("/get-user/:id", userController.getUser);
export default router;
