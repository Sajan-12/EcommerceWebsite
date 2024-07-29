import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { ObjectId } from "mongodb";

const likeModel=mongoose.model('Like',likeSchema);
export class LikeRepository{

   async getLikes(type, id){ 
      return await likeModel.find({
          likeable: new ObjectId(id),
          on_model:type
      })
      .populate('user')
      .populate({path:'likeable', model: type})
  }

     
    async likeProduct(userID,ProductID){
         try{
             const like=new likeModel({
               user:new ObjectId(userID),
               likeable:new ObjectId(ProductID),
                on_model:'Product'
             }
            );
            await like.save();

         }
         catch(err){
            console.log(err);
            throw new Error("something is wrong in like repository");
         }

    }

    async likeCategory(userID,categoryID){
        try{
            const like=new likeModel({
              user:new ObjectId(userID),
              likeable:new ObjectId(categoryID),
               on_model:'Category'
            }
           );
           await like.save();

        }
        catch(err){
           console.log(err);
           throw new Error("something is wrong in like repository");
        }

   }
}