import mongoose from 'mongoose';

export const likeSchema=new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        likeable:{
            type:mongoose.Schema.Types.ObjectId,
            refPath:'on_model'
        },
        on_model:{
            type:String,
            enum:['Product','Category']
        }

    }
).pre('save',(next)=>{
    console.log('data is save');
    next();
}).post('save',(doc)=>{
    console.log(doc);
})