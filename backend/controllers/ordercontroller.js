// controllers/orderController.js
import orderModel from "../models/orderModel.js";

export const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const createOrder = async (req, res) => {
  try {
    const order = new orderModel(req.body);
    await order.save();
    res.status(201).json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};