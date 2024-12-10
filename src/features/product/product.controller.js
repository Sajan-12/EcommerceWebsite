import categoryModel from './category.model.js';
import productModel from './product.model.js';
import { ObjectId } from "mongodb";
import reviewModel from './review.model.js';

export default class ProductController{
     
    async getAllProducts(req,res){
      try{
        const products=await  productModel.find();
       res.status(200).send(products);
      }
      catch(err){
        console.log(err);
        res.status(400).send("something went wrong");
      }
    }

     async addProduct(req,res,next){
      
         const {name,category,price,instock,description,sizes}=req.body;
         
     const productData={name,description,price:parseFloat(price),
      imageUrl:req?.file?.filename,category,instock:parseFloat(instock),sizes:sizes?.split(',')};
     
      try{
        //addProduct
       
        productData.categories=productData.category.split(',').map(ele=>ele.trim());
        console.log(productData);
         const newProduct=await productModel(productData);
         const savedProduct=await newProduct.save();

        //updateCatogories
        await categoryModel.updateMany(
            {
              _id:{$in:productData.categories},
            },
            {
               $push:{products:new ObjectId(savedProduct._id)}
            }
        )
        res.status(201).send(savedProduct);
    }catch(err){
        console.log(err);
        throw new Error("something is wrong with product controller");
    }
    }
   
   async getOneProduct(req,res){
    try{
        const id=req.params.id;
        console.log(id);
      const product =await productModel.findById(id);
      if(!product)
      res.status(404).send('Product is not found!');
       res.status(200).send(product);
     }
     catch(err){
      console.log(err);
      res.status(400).send("something went wrong");
    }
    }

    
     async rateProduct(req, res,next){
      const {userID,productID,rating}=req.body;
      console.log(userID,productID,rating);
      try{ 
           
        const product=await productModel.findById(productID);
        if(!product){
          throw new Error("product not found");
        }
        console.log(product);
      
         // Find the existing review
         const userReview=await reviewModel.findOne({user:new ObjectId(userID),
          product: new  ObjectId(productID)
         });
         console.log(userReview)
         if(userReview){
          userReview.rating=rating;
          await userReview.save();
         }
         else{
          const review=await reviewModel({
              user:new ObjectId(userID),
              product: new ObjectId(productID),
              rating:rating
          });
         const savedReview= await review.save();
         product.reviews.push(savedReview);
         await product.save();
         console.log(savedReview);
         }
         res.status(201).send(product);
     }
     catch(err){
      console.log(err);
      res.status(400).send("something went wrong");
    }
    }  
}