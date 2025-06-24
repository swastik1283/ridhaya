import {Swiper,SwiperSlide} from 'swiper/react';
import{Autoplay,Navigation,Pagination} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { assets } from '../assets/assets';

const Hero=()=>{
 return (
    <div className='w-full h-[450]px'>
        <Swiper 
        modules={[Autoplay,Navigation,Pagination]}
        autoplay={{delay:3000}}
        navigation
        pagination={{clickable:true}}
         slideperview={1} loop={true}>
            <SwiperSlide>
                <img src="src/assets/carousel-lavender-1.jpg" alt="slide-1" className='w-full h-[450px] object-cover'></img>
                       </SwiperSlide>
        <SwiperSlide>
             <img src="src/assets/carousel-lavender-2.jpg" alt="slide-2" className='w-full h-[450px] object-cover'></img>
                    </SwiperSlide>
        </Swiper>

    </div>
 )
}

export default Hero;