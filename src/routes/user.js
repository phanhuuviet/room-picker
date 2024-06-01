import express from "express";
import { userController } from "../controllers/user.js";
const router = express.Router();
router.get("/getall-user", userController.getAllUser);
router.get("/get-user/:id", userController.getUser);
router.delete("/delete-user/:id", userController.deleteUser);
router.put("/update-user/:id", userController.updateUser);
export default router;
