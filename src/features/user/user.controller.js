import userModel from './user.model.js';
import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

export default class UserController {

  async resetPassword(req, res, next){
    const {newPassword} =req.body;
    const hashedPassword = await bcrypt.hash(newPassword,12);
    const userID=req.body.userID;
    try{
      let user = await userModel.findById(userID);
      if(user){
          user.password=hashedPassword;
          await user.save();
          return res.status(200).send("password is updated");
      }else{
         throw new Error("No such user found");
      }
      
  } catch(err){
      console.log(err);
      throw new Error("Something went wrong with database");
  }
  }

  async signUp(req,res,next) {
    const {
      name,
      email,
      password,
      type,
    } = req.body;
   
    const hashedPassword = await bcrypt.hash(password, 12);
    const user =await userModel({
      name,
      email,
      password:hashedPassword,
      type
    }
    );
    const savedUser=await user.save();
    res.status(201).send(savedUser);
  }

  async signIn(req, res, next) {
    try{
      // 1. Find user by email.
      const{email,password}=req.body;
      console.log(req.body);
    const user = await  userModel.findOne({email});
    console.log(user);
    if(!user){
      return res
        .status(400)
        .send('Incorrect Credentials');
    }else{
   // 2. Compare password with hashed password.
    const result = await bcrypt.compare(password, user.password);
  if(result){
 // 3. Create token.
 const token = jwt.sign(
  {
    userID: user._id,
    email: user.email,
  },
  'AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz',
  {
    expiresIn: '3h',
  }
);
// 4. Send token.
       return res.status(200).send(token);
          }     
else {
    return res.status(404).send("password not matched");
}   

    }

    }
    catch(err){
      console.log(err);
      console.log("error in user contoller");
      return res.status(200).send(err);
    }
  }

}
