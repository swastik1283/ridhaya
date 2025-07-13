// routes/orderRoutes.js
import express from "express";
import { listOrders,createOrder } from "../controllers/ordercontroller.js";

const router = express.Router();

router.get("/orders", listOrders); // GET /api/orders for admin
router.post("/orders", createOrder); 
export default router;
