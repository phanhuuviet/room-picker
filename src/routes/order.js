import express from "express";
import { orderController } from "../controllers/order.js";
import { validateJWT } from "../middlewares/jwt.js";
import { decodePayloadMiddleware } from "../middlewares/decodePayload.js";
const router = express.Router();
router.post(
    "/create-order/:id",
    validateJWT,
    decodePayloadMiddleware,
    orderController.createOrder
);
router.get("/getall-order", validateJWT, orderController.getAllOrder);
router.get("/get-id-order/:id", validateJWT, orderController.getIdOrder);
router.get(
    "/get-order-user/:id",
    validateJWT,
    orderController.getAllOrderByUser
);
router.post(
    "/payment-cash/:id",
    validateJWT,
    decodePayloadMiddleware,
    orderController.updateStatusOrder
);

export default router;
