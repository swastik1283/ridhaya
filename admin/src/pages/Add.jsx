import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify'
import { BackendUrl } from '../App'
const Add = ({token}) => {
  const[image1,setimage1]=useState(false)
  const[image2,setimage2]=useState(false)
  const[image3,setimage3]=useState(false)

  const[name,setName]=useState('')
  const[description,setDescription]=useState('')
  const[price,setPrice]=useState('')
  const [category,setcategory]=useState('')
  const[subcategory,setsubcategory]=useState('')

  const[bestseller,setbestseller]=useState(false)

  const onSubmitHandler=async(e)=>{
     e.preventDefault();

  try{
     const formData=new FormData()

     formData.append("name",name)
     formData.append("description",description)
     formData.append("price",price)
   formData.append("category",category)
   formData.append("Subcategory",subcategory)
     formData.append("bestseller",bestseller)
     
      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)


      const response=await axios.post(BackendUrl+"/api/product/add",formData,{headers:{token}})
      if(response.data.success){
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setPrice('')
        setimage1(false)
        setimage2(false)
        setimage3(false)
        
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
          <label htmlFor='image1'>
            <img className='w-20' src={!image1 ?assets.upload_area:URL.createObjectURL(image1)} alt="" />
            <input onChange={(e)=>setimage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor='image2'>
            <img className='w-20' src={!image2 ?assets.upload_area:URL.createObjectURL(image2)} alt="" />
            <input onChange={(e)=>setimage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor='image3'>
            <img className='w-20' src={ !image3 ? assets.upload_area:URL.createObjectURL(image3)} alt="" />
            <input onChange={(e)=>setimage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
        </div>
      </div>


      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name}className='w-full max-w-[500px] px-3 py-2' type="text" placeholder="Your Product Name" required/>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description}className='w-full max-w-[500px] px-3 py-2' type="text" placeholder="Description" />
      </div>
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

        <div>
          <p className='mb-2' >Product category</p>
          <select onChange={(e)=>setcategory(e.target.value)}  value={category}className='w-full px-3 py-2'>
           <option value="">Select category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product subcategory</p>
          <select onChange={(e)=>setsubcategory(e.target.value)} value={subcategory}className='w-full px-3 py-2'>
            <option value="">Select Subcategory</option>
            <option value="Shampoo">Shampoo</option>
            <option value="Facewash">Facewash</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e)=>setPrice(e.target.value)} value={price}className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25'>
          </input>
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input onChange={()=>setbestseller(prev=>!prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor='bestseller'>Add to BestSeller</label>
      </div>

      <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>
  )
}

export default Add