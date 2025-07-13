import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Receive cart items and total from cart page
  const cart = location.state?.cart || [];
  const total = location.state?.total || 0;

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMode: "cod",
  });

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      customer: form,
      items: cart,
      total: total,
      createdAt: new Date().toISOString(),
    };

    console.log("🧾 Sending Order:", orderData);

    try {
      // Replace with your backend URL
      await axios.post("http://localhost:4000/api/orders", orderData);
      alert("✅ Order placed successfully!");
      navigate("/thank-you"); // or navigate("/") if you don’t have a thank you page
    } catch (err) {
      console.error("❌ Order failed:", err);
      alert("❌ Failed to place order. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

      {/* Order Summary */}
      {cart.length > 0 && (
        <div className="mb-4 border p-4 rounded bg-gray-50">
          <h3 className="font-semibold mb-2">🛍 Order Summary</h3>
          {cart.map((item, i) => (
            <div key={i} className="text-sm">
              {item.name} × {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
            </div>
          ))}
          <div className="mt-2 font-semibold">Total: ₹{total.toFixed(2)}</div>
        </div>
      )}

      {/* Checkout Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="border px-3 py-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="border px-3 py-2"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          className="border px-3 py-2"
        />
        <textarea
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
          className="border px-3 py-2"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
          className="border px-3 py-2"
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
          required
          className="border px-3 py-2"
        />

        <div className="flex gap-4 items-center">
          <label className="font-medium">Payment Mode:</label>
          <select
            name="paymentMode"
            value={form.paymentMode}
            onChange={handleChange}
            className="border px-2 py-1"
          >
            <option value="cod">Cash on Delivery</option>
            <option value="online">Online Payment</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-black text-white py-2 px-6 mt-4 rounded hover:bg-gray-800"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
