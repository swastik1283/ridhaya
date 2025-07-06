import express from 'express'
import {listProduct,singleProduct,removeProduct,addproduct} from '../controllers/productController.js'
import upload from '../middleware/multer.js';
import adminauth from '../middleware/adminauth.js';
const productRouter=express.Router();

productRouter.post('/add',adminauth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1}]),addproduct)
productRouter.get('/list',listProduct)
productRouter.post('/remove',removeProduct)
productRouter.post('/single',singleProduct)


export default productRouter