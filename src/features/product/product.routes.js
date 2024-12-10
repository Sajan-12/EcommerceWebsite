// Manage routes/paths to ProductController

// 1. Import express.
import express from 'express';
import ProductController from './product.controller.js';
import { upload } from '../../middleware/fileupload.middleware.js';

//initialize Routers
const productRouter =express.Router();
const productController = new ProductController();

//rating requestext
productRouter.post('/rate',(req,res,next)=>{productController.rateProduct(req,res,next)});

// All the paths for product controller.

productRouter.get('/',(req,res,next)=>{
productController.getAllProducts(req,res,next)});
productRouter.post('/',upload.single('imageUrl'),(req,res)=>{productController.addProduct(req,res)});

productRouter.get('/:id',(req,res,next)=>{productController.getOneProduct(req,res)});
export default productRouter;