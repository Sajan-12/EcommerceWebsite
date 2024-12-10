import mongoose from 'mongoose';

 const cartSchema=new mongoose.Schema(
    {
        productID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"product"
        },
        userID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
        quantity:Number

    }
 )
 const cartItemModel=new mongoose.model('CartItem',cartSchema);
 export default cartItemModel;