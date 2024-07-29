import "./env.js";
// 1. Import express
import express from 'express';
//import swagger from 'swagger-ui-express';

import productRouter from './src/features/product/product.routes.js';
import bodyParser from 'body-parser';
import userRouter from './src/features/user/user.routes.js';
import jwtAuth from './src/middleware/jwt.middleware.js';
import cartRouter from './src/features/cartitems/cartitems.routes.js';
//import basicAuthorizer from './src/middleware/basicAuth.middleware.js';
//import apiDocs from './swagger.json' assert {type: 'json'};
import orderRouter from "./src/features/order/order.routes.js";

import connectToMongodb from "./src/config/mongodb.js";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";
import likeRouter from "./src/features/like/like.routes.js";

// 2. Create Server
const server = express();
server.use(bodyParser.json());
server.use(express.urlencoded({extended:true}));

//server.use('/api-docs', swagger.serve, swagger.setup(apiDocs));
// for all requests related to product, redirect to product routes.
// localhost:3200/api/products
server.use('/api/products',jwtAuth,productRouter);
server.use('/api/users',userRouter);
server.use('/api/carts',jwtAuth,cartRouter);
server.use('/api/orders',jwtAuth,orderRouter );
server.use('/api/likes', likeRouter);
// 3. Default request handler
server.get('/', (req, res)=>{
    res.send("Welcome to Ecommerce APIs");
});



//handle 404 error
server.use((req,res)=>{
  res.status(404).send("API not found");
})

// 4. Specify port.
server.listen(3200,()=>{
    console.log("Server is running at 3200");
    connectToMongodb();
    connectUsingMongoose();
});
