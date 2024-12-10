import mongoose from "mongoose";

const categorySchema=new mongoose.Schema(
    {
        name:String,
        products:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'Product'
            }
        ]
    }
);
const categoryModel=new mongoose.model("Category",categorySchema);
export default categoryModel;