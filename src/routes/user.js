import express from "express";
import { userController } from "../controllers/user.js";
import { validateJWT } from "../middlewares/jwt.js";
const router = express.Router();
router.get("/getall-user", validateJWT, userController.getAllUser);
router.get("/get-user/:id", validateJWT, userController.getUser);
export default router;
