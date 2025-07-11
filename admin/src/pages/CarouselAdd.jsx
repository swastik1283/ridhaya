import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify'
import { BackendUrl } from '../App'
const CarouselAdd = ({token}) => {
  const[carimage1,setcarimage1]=useState(false)
  const[carimage2,setcarimage2]=useState(false)
  const[carimage3,setcarimage3]=useState(false)

  const onSubmitHandler=async(e)=>{
     e.preventDefault();
     try{
     const formData=new FormData()
    carimage1 && formData.append("carimage1",carimage1)
      carimage2 && formData.append("carimage2",carimage2)
      carimage3 && formData.append("carimage3",carimage3)

        const response=await axios.post(BackendUrl+"/api/Carousel/add",formData,{headers:{token}})
            if(response.data.success){
              toast.success(response.data.message)
              setcarimage1(false)
              setcarimage2(false)
              setcarimage3(false)

               }
                    else{
                      toast.error(response.data.message)
                    }
                }
    catch(error){
        console.log(error)
        toast.error(error.message)
    
      }
      }

      return (
        <form onSubmit={onSubmitHandler}className='flex flex-col w-full items-start gap-3'>
              <div>
                <p className='mb-2'>Uplaod image</p>
                <div className='flex gap-2'>
                  <label htmlFor='carimage1'>
                    <img className='w-20' src={!carimage1 ?assets.upload_area:URL.createObjectURL(carimage1)} alt="" />
                    <input onChange={(e)=>setcarimage1(e.target.files[0])} type="file" id="carimage1" hidden />
                  </label>
                  <label htmlFor='carimage2'>
                    <img className='w-20' src={!carimage2 ?assets.upload_area:URL.createObjectURL(carimage2)} alt="" />
                    <input onChange={(e)=>setcarimage2(e.target.files[0])} type="file" id="carimage2" hidden />
                  </label>
                  <label htmlFor='carimage3'>
                    <img className='w-20' src={ !carimage3 ? assets.upload_area:URL.createObjectURL(carimage3)} alt="" />
                    <input onChange={(e)=>setcarimage3(e.target.files[0])} type="file" id="carimage3" hidden />
                  </label>
                </div>
              </div>
        
           <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>
  )
      
    }

    export default CarouselAdd
