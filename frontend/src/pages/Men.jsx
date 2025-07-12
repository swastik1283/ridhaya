import React, { useContext } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
const Men = () => {
    const[men,setmen]=useState([]);
    const {BackendUrl}=useContext(ShopContext);
    useEffect(()=>{
        const fetchProduct=async()=>{
        try{
            const res= await axios.get('http://localhost:4000/api/product/list');

        if(res.data.success){
            const mensproduct=res.data.productRidaya.filter(
                (product)=>product.category === "Men"
            );
            setmen(mensproduct);
  console.log(setmen)
            console.log("Product received",res.data)
        }
        else{
            console.log("error")
        }

    }
    catch(error){
           console.log(error)
    }}
    fetchProduct()
},[]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-4 text-center">MEN'S COLLECTION</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {men.map((product) => (
             <NavLink to={`/product/${product._id}`} key={product._id}>
          <div  className="border rounded shadow p-4 text-center">
            <img
              src={product.image[0]} // Assuming image is an array
              alt={product.name}
              className="w-full h-48 object-cover mb-2"
            />
            <h3 className="text-lg font-medium">{product.name}</h3>
            <p className="text-gray-600">₹{product.price}</p>
          </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Men