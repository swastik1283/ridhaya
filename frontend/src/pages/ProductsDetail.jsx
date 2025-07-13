import React, { useContext } from 'react';
import { products } from '../assets/products';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';


import { ShopContext } from '../context/ShopContext';
const ProductsDetail = () => {
  const { id } = useParams();
  const {addToCart,currency}=useContext(ShopContext)
  console.log("URL ID:", id);
   const navigate = useNavigate();
  const[product,setProducts]=useState(null);
    const [mainImageIndex, setMainImageIndex] = useState(0);
     const [intervalId, setIntervalId] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

 useEffect(()=>{
  const fetchProduct=async()=>{
  try{  const res=await axios.get(`http://localhost:4000/api/product/${id}`);
     setProducts(res.data.product);
  
    } catch(err){
      console.log('failed to fetch product:',err);
    }
  };
  fetchProduct();
},[id]);
  useEffect(() => {
    if (product?.image?.length > 1) {
      const id = setInterval(() => {
        setMainImageIndex((prevIndex) =>
          (prevIndex + 1) % product.image.length
        );
      }, 5000);
      setIntervalId(id);

      return () => clearInterval(id);
    }
  }, [product]);
   const handleThumbnailClick = (index) => {
    setMainImageIndex(index);
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  if (!product) {
    return <div className="p-6 text-red-500 text-center text-xl">❌ No product found</div>;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-10">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <img
           src={product.image?.[mainImageIndex]}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg shadow"
          />
          {product.image?.length>1 &&(
            <div className='flex gap-3 mt-4'>
              {product.image.map((img,idx)=>(
                <img key={idx}
                src={img}
                alt={`thumbnail ${idx}`}
                onClick={()=>handleThumbnailClick(idx)}
                className={`w-16 h-16 object-cover rounded cursor-pointer border${
                  idx === mainImageIndex ? 'border-black' : 'border-gray-300'}`}/>
              ))}
        </div>)  }
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

          {/* Star Rating (static) */}
          <div className="flex items-center gap-1 mb-3">
            <span className="text-yellow-500">★ ★ ★ ★ ☆</span>
            <p className="text-sm text-gray-600 ml-2">(122 reviews)</p>
          </div>

          {/* Price */}
          <p className="text-xl text-black-600 font-semibold mb-4">{currency}{product.price}</p>

          {/* Description */}
          <p className="text-gray-700 text-xl mb-6">{showFullDescription
              ? product.description
              : product.description.slice(0, 150) + '...'}
            {product.description.length > 150 && (
              <button
                className="text-blue-500 ml-2 underline text-sm"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? 'Show less' : 'Read more'}
              </button>
            )}</p>

          {/* Add to Cart Button */}
          <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800" onClick={()=>addToCart(product._id)}>
            Add to Cart
          </button>

          {/* Extra Info */}
          <div className="mt-8 text-xl text-gray-500 space-y-1">
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
