import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/orders");
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("❌ Failed to fetch orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📦 Placed Orders (Admin Panel)</h2>

      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders have been placed yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition"
            >
              {/* Order Date */}
              <div className="mb-2 text-sm text-gray-600">
                <span className="font-semibold">Order Date:</span>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </div>

              {/* Customer Info */}
              <div className="mb-3">
                <h4 className="font-semibold mb-1 text-lg text-gray-700">👤 Customer</h4>
                <p><span className="font-medium">Name:</span> {order.customer.name}</p>
                <p><span className="font-medium">Email:</span> {order.customer.email}</p>
                <p><span className="font-medium">Phone:</span> {order.customer.phone}</p>
                <p><span className="font-medium">City:</span> {order.customer.city}</p>
                <p><span className="font-medium">Address:</span> {order.customer.address}</p>
                <p><span className="font-medium">Payment Mode:</span> {order.customer.paymentMode}</p>
              </div>

              {/* Items */}
              <div className="mb-3">
                <h4 className="font-semibold mb-1 text-lg text-gray-700">🛒 Items</h4>
                <ul className="list-disc ml-6 text-sm">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      <strong>{item.name}</strong> × {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Total */}
              <div className="text-right font-bold text-xl text-green-700">
                Total: ₹{order.total.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
