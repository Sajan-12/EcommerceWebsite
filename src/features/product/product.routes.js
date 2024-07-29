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

// All the paths to the controller methods.
// localhost/api/products/filter?minPrice=10&maxPrice=100&catagory=10
productRouter.get('/filter',(req,res,next)=>{
    productController.filterProducts(req,res)});


// localhost/api/products
productRouter.get('/',(req,res,next)=>{
productController.getAllProducts(req,res,next)});
productRouter.post('/',upload.single('imageUrl'),(req,res)=>{productController.addProduct(req,res)});

productRouter.get('/avgPrice',(req,res,next)=>{productController.avgPrice(req,res)});

productRouter.get('/:id',(req,res,next)=>{productController.getOneProduct(req,res)});
export default productRouter;