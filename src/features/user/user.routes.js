// 1. Import express.
import express from 'express';
import UserController from './user.controller.js';
import jwtAuth from '../../middleware/jwt.middleware.js';

// 2. Initialize Express router.
const userRouter = express.Router();

const userController = new UserController();

// All the paths to controller methods.

userRouter.post('/signup',(req,res,next)=>{
    userController.signUp(req,res,next);
});
userRouter.post('/signin',(req,res,next)=>{
    userController.signIn(req,res,next);
});
userRouter.put('/resetPassword',jwtAuth,(req,res,next)=>{
    userController. resetPassword(req,res,next);
})
export default userRouter;