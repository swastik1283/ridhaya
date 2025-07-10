import mongoose from "mongoose";

const carouselschema=new mongoose.Schema({
    carimage:{type:Array,required:true}
})

export default mongoose.model('Carousel',carouselschema);