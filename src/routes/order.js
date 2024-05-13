import express from "express";
import { orderController } from "../controllers/order.js";
const router = express.Router();
router.post("/create-order/:id", orderController.createOrder);
router.get("/getall-order", orderController.getAllOrder);
router.get("/get-id-order/:id", orderController.getIdOrder);
router.get("/get-order-user/:id", orderController.getAllOrderByUser);
router.post("/payment-cash/:id", orderController.updateStatusOrder);




export default router;
