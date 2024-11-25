import express from "express";
import { decodedPayload, signin, signup } from "../controllers/auth.js";
import { decodePayloadMiddleware } from "../middlewares/decodePayload.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/decoded", decodePayloadMiddleware, decodedPayload);

export default router;
