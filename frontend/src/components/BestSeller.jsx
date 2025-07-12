import React, { useState, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';

import { ShopContext } from '../context/ShopContext'; // adjust path

const BestSeller = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { products } = useContext(ShopContext);

  if (!products || products.length === 0) return null;

const bestSellers = products.filter(product => product.bestSeller);
  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-100">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Our Best Sellers
      </h2>

      <div className="max-w-6xl mx-auto px-4">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          centeredSlides={true}
          slidesPerView={3}
          spaceBetween={30}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {bestSellers.map((product, idx) => (
            <SwiperSlide key={product._id}>
              <div
                className={`flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
                  activeIndex === idx
                    ? 'scale-125 z-20'
                    : 'scale-80 opacity-30'
                }`}
              >
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-48 h-48 object-cover rounded-full shadow-lg"
                  />
                </Link>
                <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-500">₹{product.price}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BestSeller;
