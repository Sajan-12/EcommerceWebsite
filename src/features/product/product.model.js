
import mongoose from 'mongoose';


 const productSchema=new mongoose.Schema(
    {
        name:String,
        price:Number,
        description:String,
        category:String,
        instock:Number,
        imageUrl:String,
        reviews:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Review'
            } 
        ],
        categories:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Category'
            }
        ]
    }
)
const productModel=new mongoose.model("Product",productSchema);
export default productModel;