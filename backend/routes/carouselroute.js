import express from 'express';
import { addcarousel,listCarousel,removeCarousel } from '../controllers/carouselcontroller.js';
import upload from '../middleware/multer.js';
import adminauth from '../middleware/adminauth.js';


const carouselrouter=express.Router()

carouselrouter.post('/add',adminauth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1}]),addcarousel)
carouselrouter.get('/list',listCarousel)
carouselrouter.post('/remove',removeCarousel)

export default carouselrouter