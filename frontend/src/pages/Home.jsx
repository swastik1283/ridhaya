import React from 'react'
import Navbar from '../components/navbar'
import Hero from '../components/Hero'
import ProductCarousel from '../components/ProductCarousel'
import Collection from '../components/Collection'
import Banner from '../components/Banner'
import BestSeller from '../components/BestSeller'
const Home = () => {
  return (
   <div>
 
    <Hero/>
<ProductCarousel/>
<Collection/>
<Banner/>
<BestSeller/>
    </div>
  )
}

export default Home