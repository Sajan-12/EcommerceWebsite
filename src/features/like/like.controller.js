import likeModel from "./like.model.js";
import { ObjectId } from "mongodb";
export default class LikeController{
    
    async getLikes(req,res,next){
        try{
          const {type,id}=req.body;
          console.log(req.body);

          const liked=await likeModel.find({
            likeable:new ObjectId(id),
            on_model:type
        }).populate('user')
        .populate({path:'likeable',model: type})
        res.status(200).send(liked);
        }
        catch(err){
            console.log(err);
        }

    }
    
    async likeItem(req,res){
        try{
     const {type,id}=req.body;
     const userID= req.body.userID;
     if(type!='Product'&&type!='Category')
        res.status(404).send('Invalid');
     else if(type=='Product'){
       const like= await likeModel({
            user:new ObjectId(userID),
            likeable:new ObjectId(id),
            on_model:'Product'
          }
         );
         await like.save();

     }
      else  {
        const like=await likeModel({
            user:new ObjectId(userID),
            likeable:new ObjectId(id),
             on_model:'Category'
          }
         );
         await like.save();
      }
    return res.status(201).send('liked');
    }
    catch(err){
        console.log(err);
    }
    }
   
}