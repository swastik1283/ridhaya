import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import ProductsDetail from './pages/ProductsDetail'
import About from './pages/About'
import Footer from './components/Footer'
import Marque from './components/Marque'
import Login from './pages/Login'
import ProductOil from './components/ProductOil'
import ProductFacewash from './components/ProductFacewash'
import Men from './pages/Men'
import Women from './pages/Women'
import Bestseller from './pages/Bestseller'
import axios from 'axios';
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

axios.defaults.baseURL = 'http://localhost:4000';
// axios.defaults.withCredentials = true; 
const App = () => {
  return (
    <div> 
      <Marque/>
      <Navbar/>
    <main className='flex-1'>
      <Routes>
<Route path='/' element={<Home/>}/>
<Route path='/product/:id' element={<ProductsDetail/>}/>
<Route path='/About' element={<About/>}/>
<Route path='/Login' element={<Login/>}/>
<Route path='/ProductOil' element={<ProductOil/>}/>
<Route path='/ProductFacewash' element={<ProductFacewash/>}/>
  <Route path='/Bestseller' element={<Bestseller/>}/>  
  <Route path="/Men" element={<Men/>} />
  <Route path="/Women" element={<Women/>}/>
  <Route path="/cart" element={<Cart/>}/>
  <Route path="/checkout" element={<Checkout />} />
   </Routes>
   </main>      <Footer/>
    </div>
  )
}

export default App