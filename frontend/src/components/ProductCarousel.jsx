import React from 'react'
import { Swiper,SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import { assets } from '../assets/assets'
import {products} from '../assets/products'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const ProductCarousel = () => {
  
  const navigate=useNavigate();

      return(
           
       <div className='mt-5'>
      <div className=' flex justify-between text-3xl text-black '>
        <div className='text-center w-full'>
        Our Products
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
{products.map((product)=>(
  <SwiperSlide key={product.id}>
    <div className="max-w-sm max-w-lg w-full mt-5 rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200">
      <img className='w-full h-48 object-cover' src={product.image} alt={product.title}/>
      <div className='p-5'>
        <h2 className='text-xl font-bold mb-2'>
          {product.title}
        </h2>
        <p className='text-gray-700 mb-4'>{product.description}</p>
        <div className='flex justify-between items-center'>
          <span className='text-lg font-semibold text-green-600'>{product.price}</span>
          <Link to={`/product/${product.id}`} className='bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800'>
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