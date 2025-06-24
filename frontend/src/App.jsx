import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/navbar'
import Products from './pages/Products'
import About from './pages/About'
import Marque from './components/Marque'
const App = () => {
  return (
    <div> 
      <Marque/>
      <Navbar/>
    
      <Routes>
<Route path='/' element={<Home/>}/>
<Route path='/Products' element={<Products/>}/>
<Route path='/About' element={<About/>}/>

      </Routes>
    </div>
  )
}

export default App