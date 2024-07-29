//manage paths/routes
import express from "express";
import { CartItemsController } from "./cartitems.controller.js"

const  cartRouter= express.Router();
const cartItemsController=new CartItemsController();
cartRouter.post('/',(req,res,next)=>
    {cartItemsController.add(req,res,next)});
cartRouter.get('/',(req,res)=>
    {cartItemsController.get(req,res)});
cartRouter.delete('/:id',(req,res)=>
    {cartItemsController.delete(req,res)});
export default  cartRouter;