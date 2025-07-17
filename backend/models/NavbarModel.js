import mongoose from 'mongoose';


const Navbarschema=new mongoose.Schema({
title:{
    type:String, required:true
},
link:{type:String},
parentId:{
    type:mongoose.Schema.Types.ObjectId,ref:'Navbaritem',default:null
},
order:{
    type:Number,default:0
},
isVisible:{
    type:Boolean,default:true
}
})

export default mongoose.model('Navbaritem',Navbarschema);
