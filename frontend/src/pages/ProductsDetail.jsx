import React from 'react';
import { products } from '../assets/products';
import { useNavigate, useParams } from 'react-router-dom';

const ProductsDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div className="p-6 text-red-500 text-center text-xl">❌ No product found</div>;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-10">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto object-cover rounded-lg shadow"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-3">{product.title}</h1>

          {/* Star Rating (static) */}
          <div className="flex items-center gap-1 mb-3">
            <span className="text-yellow-500">★ ★ ★ ★ ☆</span>
            <p className="text-sm text-gray-600 ml-2">(122 reviews)</p>
          </div>

          {/* Price */}
          <p className="text-2xl text-green-600 font-semibold mb-4">{product.price}</p>

          {/* Description */}
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Add to Cart Button */}
          <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800" onClick={()=>useNavigate('/Cart')}>
            Add to Cart
          </button>

          {/* Extra Info */}
          <div className="mt-8 text-sm text-gray-500 space-y-1">
            <hr className="my-4" />
            <h5>✔ 100% Original Product</h5>
            <h5>💵 Cash on Delivery Available</h5>
            <h5>🔁 Easy return within 7 days</h5>
          </div>
        </div>
      </div>

      {/* Optional Description Section */}
      <div className="max-w-6xl mx-auto mt-16 border-t pt-6 px-4">
        <h2 className="text-xl font-semibold mb-2">More About This Product</h2>
        <p className="text-sm text-gray-600">
          A healthy and natural tea to boost your daily wellness routine.
        </p>
      </div>
    </div>
  );
};

export default ProductsDetail;
