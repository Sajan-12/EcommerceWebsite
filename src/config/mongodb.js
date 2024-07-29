import { MongoClient } from "mongodb";

//const url="mongodb://localhost:27017";
const url =process.env.DB_URL;
let client;
const connectToMongodb=()=>{
    MongoClient.connect(url)
    .then((clientInstance)=>{
        client=clientInstance;
        createIndexes(client.db());
        console.log("Mongodb is connected")})
    .catch((err)=>console.log(err));
}

export default connectToMongodb;

export function getDB(){
    return client.db();
}

export function getClient(){
    return client;
}
const createIndexes = async(db)=>{
    try{
        
        await db.collection("products").createIndex({name:1, category:-1});
        await db.collection("products").createIndex({desc: "text"});
    }catch(err){
        console.log(err);
    }
    console.log("Indexes are created");
    }