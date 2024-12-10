import mongoose from "mongoose";
const orderSchema=new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    totalAmount:{
        type:Number 
    },
    timestamp:{
         type:Date,
    }
});
const orderModel=mongoose.model("Order",orderSchema);
export default orderModel;

