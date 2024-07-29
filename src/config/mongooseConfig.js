import dotenv from "dotenv";
import mongoose from "mongoose";
import { categorySchema } from "../features/product/category.schema.js";
dotenv.config();

const url = process.env.DB_URL;
export const connectUsingMongoose=async()=>{
 try{
    await mongoose.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    console.log("Mongodb connected using mongoose");
    addCategories()
 }
 catch(err){
    console.log("Error while connecting to db");
    console.log(err);
 }
}

async function addCategories(){
    const categoryModel=mongoose.model('Category',categorySchema);
    const categories=categoryModel.find();
    if(!categories || (await categories).length==0){
          categoryModel.insertMany([
         
               {name:'Books'}, {name:'Clothing'},{name:'Electronics'}
          ])
    }
    console.log('categories are added');
}