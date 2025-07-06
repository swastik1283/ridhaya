import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/navbar'
import ProductsDetail from './pages/ProductsDetail'
import About from './pages/About'
import Footer from './components/Footer'
import Marque from './components/Marque'
import Login from './pages/Login'
import ProductOil from './components/ProductOil'
import ProductFacewash from './components/ProductFacewash'
const App = () => {
  return (
    <div> 
      <Marque/>
      <Navbar/>
    
      <Routes>
<Route path='/' element={<Home/>}/>
<Route path='/product/:id' element={<ProductsDetail/>}/>
<Route path='/About' element={<About/>}/>
<Route path='/Login' element={<Login/>}/>
<Route path='/ProductOil' element={<ProductOil/>}/>
<Route path='/ProductFacewash' element={<ProductFacewash/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App