import React, { useContext, useState } from 'react'
import { Swiper,SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'

const ProductCarousel = () => {
  const[activeIndex,setActiveIndex]=useState(0);
  const {products}=useContext(ShopContext);
     const navigate=useNavigate();
  


  useEffect(() => {
    console.log('Loaded products:', products)
  }, [products])
  console.log(products)
    if (!products) {
    return <p className="text-center mt-10 text-gray-500">Loading products...</p>
  }

  if (products.length === 0) {
    return <p className="text-center mt-10 text-gray-500">No products available.</p>
  }
      return(
           
       <div className='mt-5'>
      <div className=' flex justify-between text-3xl text-black '>
        <div className='text-center w-full'>
        Our Range of  Products
        </div>
      </div>
    <div className='max-w-5xl mx-auto px-2'>
        
        <Swiper
        modules={[Navigation,Autoplay]}
        spaceBetween={20}
        autoplay={{delay:0,
          disableOnInteraction:false,
        }}
        speed={5000}
        loop={true}
        slidesPerView={1}
        navigation
        breakpoints={{
          640:{slidesPerView:1},
          768:{slidesPerView:2},
          1024:{slidesPerView:3},
        }}
        >
{products.map((product,idx)=>(
  <SwiperSlide key={product._id}>
  
    <div className="max-w-sm max-w-lg w-full mt-5 rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200">
    <img
  className='w-full h-48 object-cover'
  src={product.image?.[0] || 'https://via.placeholder.com/300x200?text=No+Image'}
  alt={product.name}
/>

      <div className='p-5'>
        <h2 className='text-xl font-bold mb-2'>
          {product.name}
        </h2>
        <p className='text-gray-700 mb-4'>{product.description}</p>
        <div className='flex justify-between items-center'>
          <span className='text-lg font-semibold text-green-600'>₹{product.price}</span>
          <Link to={`/product/${product._id}`} className='bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800'>
  View Details
</Link>
        </div>
      </div>
    </div>
  </SwiperSlide>
))}
</Swiper>
       </div>
       </div>
   
  )
}

export default ProductCarousel