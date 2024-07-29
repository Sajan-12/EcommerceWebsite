import CartItemModel from "./cartItems.model.js";
import CartItemsRepository from "./cartItems.Repository.js";


export class CartItemsController {
    constructor(){
          this.cartItemsRepository=new CartItemsRepository();
    }
    async add(req, res,next) {
        try{
        const { productID, quantity } = req.body;
        const userID = req.body.userID;
          await this.cartItemsRepository.add( userID,productID,quantity);
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
     const item= await this.cartItemsRepository.get(userID);
     return res.status(200).send(item);
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
        const result= await this.cartItemsRepository.delete(cartItemId,userID);
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