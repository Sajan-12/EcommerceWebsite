import cartItemModel from "./cartItems.model.js";
import { ObjectId } from "mongodb";


export class CartItemsController {
    
    async add(req, res,next) {
        try{
        const { productID, quantity } = req.body;
        const userID = req.body.userID;
        console.log(userID);
          await cartItemModel.updateOne({productID:new ObjectId(productID),
            userID:new ObjectId(userID)},{$inc:{quantity:quantity}},{upsert:true});
           return  res.status(201).send("Cart is updated");
        }
        catch(err){
            console.log(err);
            res.status(200).send("error comes from cart Controller");
        }

    }

    async get(req,res){
        try{
     const userID=req.body.userID;
     const items=await cartItemModel.find({userID: new ObjectId(userID)});
     return res.status(200).send(items);
        }
        catch(err){
            console.log(err);
            res.status(200).send("error comes from cart Controller");
        }
    }

    async delete(req,res){
        try{
        const userID=req.body.userID;
        const cartItemId=req.params.id;
        console.log(userID,cartItemId);
        const result= await cartItemModel.deleteOne({_id:new ObjectId(cartItemId),
            userID: new ObjectId(userID)});
        if (!result) {
            return res.status(404).send("item not found");
        }
        else{
            return res
            .status(201)
            .send('Cart item is removed');
            }
        }
        catch{
            console.log(err);
            res.status(200).send("error comes from cart Controller");
        }
    }
}