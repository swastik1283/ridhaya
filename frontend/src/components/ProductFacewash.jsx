import React from 'react'
import { products } from '../assets/products'

const ProductFacewash = () => {
  return (
    <div> 
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
        {products.map((products)=>(
            <div key={products.id} className='p-4 mt-1 bg=-gradient black to white'>
                <img src={products.image}
                alt={products.title}
                 className="w-full h-48 object-cover rounded-md"/>
            
                <h3 className="mt-4 text-lg font-semibold text-gray-800">{products.title}</h3>
            <p className="text-gray-600">{products.price}</p>
            </div>
        ))}
        </div>
    </div>
  )
}

export default ProductFacewash