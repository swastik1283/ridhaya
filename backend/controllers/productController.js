import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'

//add product


const addproduct=async(req,res)=>{
   
    try {
        const{name,description,price,category,Subcategory,bestSeller}=req.body
        const image1=req.files.image1 && req.files.image1[0]
        const image2=req.files.image2 &&req.files.image2[0]
        const image3=req.files.image3 && req.files.image3[0]
        
        const images=[image1,image2,image3].filter((item)=>item !==undefined)
        
        let imagesUrl=await Promise.all(
            images.map(async(item)=>{
                 let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                  return result.secure_url
            }))
         
        const productData={
            name,description,category,Subcategory,price:Number(price),
           bestSeller: bestSeller === "true" ? true : false,image:imagesUrl,date:Date.now()
        }
        console.log(productData)

        const productRidaya=new productModel(productData);
        await productRidaya.save()
        res.json({success:true,message:"product added "})
    
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//list product


const listProduct=async(req,res)=>{
try {
    const productRidaya=await productModel.find({})
    res.json({success:true,productRidaya})

} catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
}
}

//single product info


const singleProduct=async(req,res)=>{
try {
    const {productId}=req.body
    const product=await productModel.findById(productId)
    res.json({success:true,product})

} catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
}
}

//remove prod

const removeProduct = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // <== Debug line
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const deleted = await productModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export {listProduct,singleProduct,removeProduct,addproduct}