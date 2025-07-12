import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const Cart = () => {
  const { cartItems, products, BackendUrl, currency, updateQuantity } = useContext(ShopContext);
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    // Filter products to match items in cart
    const filtered = products.filter(product => cartItems[product._id || product.id]);
    setCartList(filtered);
  }, [cartItems, products]);

  const getTotalPrice = () => {
    return cartList.reduce((acc, item) => {
      const qty = cartItems[item._id || item.id] || 0;
      return acc + item.price * qty;
    }, 0);
  };

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>🛒 Your Cart</h2>
      
      {cartList.length === 0 ? (
        <p className='text-center text-gray-500'>Cart is empty</p>
      ) : (
        <div className='flex flex-col gap-4'>
          {cartList.map((item, index) => {
            const qty = cartItems[item._id || item.id];
            return (
              <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-4 items-center border p-2 rounded shadow-sm'>
                <img src={item.image} className='w-16 h-16 object-cover rounded' alt={item.name} />
                <div>
                  <h3 className='font-semibold'>{item.name}</h3>
                  <p className='text-gray-600 text-sm'>{currency}{item.price}</p>
                </div>
                <div className='flex items-center gap-2'>
                  <button
                    className='px-2 py-1 bg-gray-200 rounded'
                    onClick={() => updateQuantity(item._id || item.id, qty - 1)}
                  >-</button>
                  <span>{qty}</span>
                  <button
                    className='px-2 py-1 bg-gray-200 rounded'
                    onClick={() => updateQuantity(item._id || item.id, qty + 1)}
                  >+</button>
                </div>
                <p className='text-sm text-center'>{currency}{(item.price * qty).toFixed(2)}</p>
                <button
                  onClick={() => updateQuantity(item._id || item.id, 0)}
                  className='text-red-500 text-sm hover:underline'
                >
                  Remove
                </button>

{/*                  
                <button
                  onClick={() => updateQuantity(item._id || item.id, 0)}
                  className='text-red-500 text-sm hover:underline'
                >
                 Checkout
                </button> */}
              </div>
            );
          })}
        </div>
      )}

      {cartList.length > 0 && (
        <div className='mt-6 text-right font-semibold text-xl'>
          Total: {currency}{getTotalPrice().toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default Cart;
