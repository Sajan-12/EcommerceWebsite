import ProductModel from './product.model.js';
import ProductRepository from './product.repository.js';
import mongoose from "mongoose";

export default class ProductController{
     constructor(){
        this.productRepository=new ProductRepository();
     }
    async getAllProducts(req,res){
      try{
        const products=await  this.productRepository.getAll();
       res.status(200).send(products);
      }
      catch(err){
        console.log(err);
        res.status(400).send("something went wrong");
      }
    }

     async addProduct(req,res,next){
      try{
         const {name,categories,price,instock,description,sizes}=req.body;
         
      
     const newProduct=new ProductModel(name,description,parseFloat(price),
     req?.file?.filename,categories,parseFloat(instock),sizes?.split(','));
     
    const createdProduct=await  this.productRepository.add(newProduct);
        return res.status(201).send(createdProduct);
      }
      catch(err){
        console.log(err);
        res.status(400).send("something went wrong");
      }
    }
   
   async getOneProduct(req,res){
    try{
        const id=req.params.id;
        console.log(id);
      const product =await this.productRepository.get(id);
      if(!product)
      res.status(404).send('Product is not found!');
       res.status(200).send(product);
     }
     catch(err){
      console.log(err);
      res.status(400).send("something went wrong");
    }
    }

     async filterProducts(req,res){
        const minPrice=req.query.minPrice;
        const maxPrice=req.query.maxPrice;
        const category=req.query.category;
        const products=await this.productRepository.filter(minPrice,maxPrice,category);
       res.status(200).send(products);
     }

     async rateProduct(req, res,next) {
      try{
      const userID=req.body.userID;
      const productID=req.body.productID;
      const rating=req.body.rating;
      console.log(userID,productID,rating);
            
       await this.productRepository.rate(
        userID,
        productID, 
        parseFloat(rating)
        );
          return res
          .status(200)
          .send('Rating has been added');
        }
          catch(err){
            console.log(err);
            res.status(400).send("something went wrong");
          }
     }
      async avgPrice(req,res,next){
          try{
             const result=await this.productRepository.averageProductPricePerCategory();
             res.status(200).send(result);
          }
          catch(err){
            console.log(err);
            res.status(400).send("something went wrong");
          }
      }
      
    
}