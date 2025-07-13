import React, { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { BackendUrl, currency } from '../App'

const CarouselList = ({token}) => {
  const[list,setlist]=useState([])
  const fetchList=async()=>{
     try {
      const response=await axios.get(BackendUrl+'/api/Carousel/list')
       if(response.data.success){
        setlist(response.data.carimageRidaya)
        console.log(response)
       }
       else{
toast.error(response.data.message)

       }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
     }
  }

  const removeProduct=async(id)=>{
    try {
      const response=await axios.post(BackendUrl+'/api/Carousel/remove',{id},{headers:{token}})
     if(response.data.success){
      toast.success(response.data.message)
      await fetchList();
     }
     else{
      toast.error(response.data.message)
     }
    } catch (error) {
        console.log(error)
      toast.error(error.message)
    }
  }
  useEffect(()=>{
     fetchList()
  },[])
  return (
    <>
    <p className='mb-2'></p>
    <div className='flex flex-col gap-2'>
      {/*---------------List Table----------*/}
      <div className=' md:grid grid-cols-[2fr_5fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
        <b>Image</b>
       
      <b className='text-center'>Action</b>
      </div>
      {/*-------------Product List-------------*/}
      {
      list.map((item,index)=>(
        <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
          <img className='w-12'src={item.carimage[0]}alt=""/>
          <p>{item.name}</p>
        
                   <p className='text-right md:text-center cursor-pointer text-lg' onClick={()=>removeProduct(item._id)}>X</p>
          </div>
      ))
      }
      </div>
      </>
  )
}

export default CarouselList