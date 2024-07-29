import { ObjectId } from "mongodb";

import {getDB} from "../../config/mongodb.js";

export default class CartItemsRepository{
   constructor(){
       this.collection="cartItems";
   }
    
   async add(userID,productID,quantity){
         try{
             const db=getDB();
             const collection=db.collection(this.collection);
              await collection.updateOne({productID:new ObjectId(productID),
                userID:new ObjectId(userID)},{$inc:{quantity:quantity}},{upsert:true});
         }
         catch(err){ 
           console.log(err);
           throw new Error("error comes from cartitem repository");
         }
   }
   
   async get(userID){
       try{
        const db=getDB();
        const collection=db.collection(this.collection);
        return await collection.find({userID:new ObjectId(userID)}).toArray();
       }
       catch(err){
        console.log(err);
        throw new Error("error comes from cartitem repository");
      }
       
   }

   async delete(cartItemId,userID){
    try{
        const db=getDB();
        const collection=db.collection(this.collection);
        const result= await collection.deleteOne({userID:new ObjectId(userID),
            _id:new ObjectId(cartItemId)});
        return result.deletedCount>0;
       }
       catch(err){
        console.log(err);
        throw new Error("error comes from cartitem repository");
      }
   }
}