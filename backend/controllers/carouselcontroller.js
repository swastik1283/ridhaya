import {v2 as cloudinary} from 'cloudinary'
import mongoose from 'mongoose'
import CarouselModel from '../models/CarouselModel.js'

const addcarousel=async(req,res)=>{
    try{
      const carimage1 = req.files.image1 && req.files.image1[0];
const carimage2 = req.files.image2 && req.files.image2[0];
const carimage3 = req.files.image3 && req.files.image3[0];
    
       


        const carimage=[carimage1,carimage2,carimage3].filter((item)=>item!==undefined)

         let carimagesUrl=await Promise.all(
                    carimage.map(async(item)=>{
                         let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                          return result.secure_url
                          }))

                          const carimageData={carimage:carimagesUrl}
                          console.log(carimageData);



            const carimageRidaya= new CarouselModel(carimageData)
            await  carimageRidaya.save()
            res.json({success:true,message:"Carousel Added"})
    }
    catch(error){
        res.json({success:false,message:error.message})
     console.log("error in adding",error)
    }
}

const listCarousel=async(req,res)=>{
try {
    const carimageRidaya=await CarouselModel.find({})
    res.json({success:true,carimageRidaya})

} catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
}
}

const removeCarousel = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // <== Debug line
    const { id } = req.body; 

    if (!id) {
      return res.status(400).json({ success: false, message: "Carousel ID is required" });
    }

    const deleted = await CarouselModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Carousel not found" });
    }

    res.json({ success: true, message: "Carousel deleted successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export {addcarousel,listCarousel,removeCarousel}