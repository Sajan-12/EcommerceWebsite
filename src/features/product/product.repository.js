import { getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { reviewSchema } from "./review.schema.js";
import { productSchema } from "./product.schema.js";
import { categorySchema } from "./category.schema.js";

const reviewModel=mongoose.model('Review',reviewSchema);

const productModel=mongoose.model('Product',productSchema);

const categoryModel=mongoose.model('Category',categorySchema);

class ProductRepository{
    constructor(){
        this.collection="products";
    }
     async add(productData){
       
        try{
            //addProduct
           
            productData.categories=productData.category.split(',').map(ele=>ele.trim());
            console.log(productData);
             const newProduct=new productModel(productData);
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
            return savedProduct;
        }catch(err){
            console.log(err);
            throw new Error("something is wrong with product database");
        }
          
     }

     async getAll(){
        try{
        const db=getDB();
        const collection=db.collection(this.collection);
        const products=await collection.find().toArray();
        return products;
        }
        catch(err){
            console.log(err);
            throw new Error("something is wrong with product  database");
        }
     }

     async get(id){
        try{
        const db=getDB();
        const collection=db.collection(this.collection);
        const product=await collection.findOne({_id:new ObjectId(id)});
        return product;
        }catch(err){
            console.log(err);
            throw new Error("something is wrong with product  database");
        }
     }

     async filter(minPrice,maxPrice,categories){
         try{
            const db=getDB();
            const collection=db.collection(this.collection);
            let filterExpression={};
               if(minPrice){
                filterExpression.price={$gte:parseFloat(minPrice)};
               }
               if(maxPrice){
                filterExpression.price={...filterExpression.price,$lte:parseFloat(maxPrice)};
               }
               
                categories = JSON.parse(categories.replace(/'/g,'"'));
               console.log(categories);
               
            if(categories){
                filterExpression={$or:[{category:{$in: categories}}, filterExpression]}
                // filterExpression.category=category
            }
              const products= await collection.find(filterExpression).project({name:1,price:1,
                _id:0,ratings:{$slice:-1}
              }).toArray();
             return products;
         }
         catch(err){
            console.log(err);
            throw new Error("something is wrong with product database");
        }
     }

     /*async rate(userID, productID, rating){
          try{
            const db=getDB();
            const collection=db.collection(this.collection);
            //remove existing rating
            await collection.updateOne({
                _id:new ObjectId(productID)
            },
            {
                $pull:{ratings:{userID: new ObjectId(userID)}}
            })
            //add rating
           await collection.updateOne({
                _id:new ObjectId(productID)
            },{
               $push:{ratings:{userID:new ObjectId(userID),rating}}
            })
          }
          catch(err){
            console.log(err);
            throw new Error("something is wrong with product database");
        }
          }*/

        async rate(userID, productID, rating){
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
                const review=new reviewModel({
                    user:new ObjectId(userID),
                    product: new ObjectId(productID),
                    rating:rating
                });
               const savedReview= await review.save();
               product.reviews.push(savedReview);
               await product.save();
               console.log(savedReview);
               }
        }
        catch(err){
          console.log(err);
          throw new Error("something is wrong with product database");
          }
        
        }
        async averageProductPricePerCategory(){
            try{
                const db=getDB();
                return await db.collection(this.collection)
                    .aggregate([
                        {
                            // Stage 1: Get Vaerge price per category
                            $group:{
                                _id:"$category",
                                averagePrice:{$avg:"$price"}
                            }
                        }
                    ]).toArray();
            }catch(err){
                console.log(err); 
                throw new Error("something is wrong with product database");
            }
            }
        
}
export default  ProductRepository;