// models/orderModel.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    pincode: String,
    paymentMode: String,
  },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      image: [String],
    }
  ],
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Order', orderSchema);
