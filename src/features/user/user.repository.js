import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";


// creating model from schema.
const UserModel = mongoose.model('User', userSchema)

export default class UserRepository{

    async resetPassword(userID, hashedPassword){
        try{
            let user = await UserModel.findById(userID);
            if(user){
                user.password=hashedPassword;
                await user.save();
            }else{
               throw new Error("No such user found");
            }
            
        } catch(err){
            console.log(err);
            throw new Error("Something went wrong with database");
        }
    }

    async signUp(user){
        try{
            // create instance of model.
            const newUser = new UserModel(user);
            await newUser.save();
            return newUser;
        }
        catch(err){
            throw new Error("Something went wrong with database");
        }
    }

    async signIn(email, password){
        try{
           return await UserModel.findOne({email, password});
        }
        catch(err){
            console.log(err);
            throw new Error("Something went wrong with database");
        }
    }

    async findByEmail(email) {
        try{
        return await UserModel.findOne({email});
      }catch(err){
        console.log(err);
        throw new Error("Something went wrong with database");
      }
      }
}