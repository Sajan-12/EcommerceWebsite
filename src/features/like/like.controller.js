import { LikeRepository } from "./like.repository.js";

export default class LikeController{
    constructor(){
        this.likeRepository=new LikeRepository();
    }

    async getLikes(req,res,next){
        try{
          const {type,id}=req.query;
          console.log(req.query);
         const likes=await this.likeRepository.getLikes(type,id);
         res.status(200).send(likes);
        }
        catch(err){
            console.log(err);
        }

    }
    async likeItem(req,res){
        try{
     const {type,id}=req.body;
      
     if(type!='Product'&&type!='Category')
        res.status(404).send('Invalid');
     else if(type=='Product')
        await this.likeRepository.likeProduct(req.body.userID,id);
      else  await this.likeRepository.likeCategory(req.body.userID,id);
    return res.status(201).send('liked');
    }
    catch(err){
        console.log(err);
    }
    }
   
}