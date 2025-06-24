import React from 'react'
import { Swiper,SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import { assets } from '../assets/assets'
const ProductCarousel = () => {
  
  
      const products=[
        {
         id: 1,
      title: 'Women’s Health Tea',
      description: 'Supports hormonal balance and wellness.',
      price: '₹1,378.00',
      image: 'src/assets/lavender-1.jpg',
    },
    {
      id: 2,
      title: 'Liver Cleanse Tea',
      description: 'Detox your body with Ayurvedic herbs.',
      price: '₹1,476.00',
      image: 'src/assets/lavender-2.jpg',
    },
    {
      id: 3,
      title: 'Hibiscus Tea',
      description: 'Rich in antioxidants, improves metabolism.',
      price: '₹289.00',
      image: 'src/assets/lavender-3.jpg',
    },


      
      
      ]
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
        speed={2000}
        loop={true}
        slidesPerView={1}
        navigation
        breakpoints={{
          640:{slidesPerView:1},
          768:{slidesPerView:2},
          1024:{slidesPerView:3},
        }}
        >
{products.map((products)=>(
  <SwiperSlide key={products.id}>
    <div className="max-w-sm  mt-5 rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200">
      <img className='w-full h-48 object-cover' src={products.image} alt={products.title}/>
      <div className='p-5'>
        <h2 className='text-xl font-bold mb-2'>
          {products.title}
        </h2>
        <p className='text-gray-700 mb-4'>{products.description}</p>
        <div className='flex justify-between items-center'>
          <span className='text-lg font-semibold text-green-600'>{products.price}</span>
          <button className='bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800'>
            Add to Cart
          </button>
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