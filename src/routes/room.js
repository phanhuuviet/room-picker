import express from "express";
import { roomController } from "../controllers/room.js";
import { decodePayloadMiddleware } from "../middlewares/decodePayload.js";
import { validateJWT } from "../middlewares/jwt.js";
const router = express.Router();

router.get("/getall-room", roomController.getALlRoom);
router.get("/get-id-room/:id", roomController.getIdRoom);
router.delete("/delete-room/:id", roomController.removeRoom);
router.post(
    "/create-room",
    validateJWT,
    decodePayloadMiddleware,
    roomController.createRoom
);
router.put("/edit-room/:id", roomController.editRoom);
router.post("/evaluate-room/:id", roomController.evaluateRoom);
router.post("/remove-evaluate-room/:id", roomController.removeEvaluateRoom);
router.post("/edit-evaluate-room/:id", roomController.editEvaluateRoom);

export default router;
