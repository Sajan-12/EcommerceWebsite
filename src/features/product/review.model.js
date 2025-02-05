import mongoose from "mongoose";

 const reviewSchema=new mongoose.Schema({
     product:{
        type:mongoose.Schema.Types.ObjectId,ref:'Product'
     },
     user:{
         type:mongoose.Schema.Types.ObjectId,ref:'User'
     },
     rating:Number
})

const reviewModel=new mongoose.model("Review",reviewSchema);
export default reviewModel;