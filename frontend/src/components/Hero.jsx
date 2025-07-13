import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import axios from 'axios';

const Hero = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
  axios.get('http://localhost:4000/api/carousel/list')
    .then((res) => {
      console.log("Full response:", res.data); 
      if (res.data.success) {
        const imagesUrls = res.data.carimageRidaya.flatMap(item => item.carimage);
        console.log("Extracted URLs:", imagesUrls); 
        setImages(imagesUrls);
      }
    })
    .catch(err => console.error("Carousel fetch error:", err));
}, []);


  return (
    <div className='w-full h-[450px] bg-gray-200'>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3000 }}
        navigation
        pagination={{ clickable: true }}
        slidesPerView={1}
        loop={true}
      >
        {images.length === 0 ? (
          <div className="text-center text-red-500 p-4">No images loaded</div>
        ) : (
          images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`slide${index}`}
                className='w-full h-[450px] object-cover'
              />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

export default Hero;