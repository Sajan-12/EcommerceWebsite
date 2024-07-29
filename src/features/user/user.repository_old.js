import { getDB } from "../../config/mongodb.js";

class UserRepository{

    async signUp(newuser){
    try{
   
     //1.get db
     const db=getDB();
     //2.get collections 
      const collection=db.collection("users");

      //3.insert document
      await collection.insertOne(newuser);
      return newuser;
    }
    catch(err){
      console.log(err);
      throw new Error("something is wrong from database");
    }
  }
    async signIn(email,password){
        try{
            
             //1.get db
             const db=getDB();
             //2.get collections 
              const collection=db.collection("users");
             //find the data
            return  await collection.findOne({email,password});
            }
            catch(err){
                console.log(err);
              throw new Error("something is wrong from database");
            }
    }

    async findByEmail(email){
          
      try{//1.get db
          const db=getDB();
          //2.get collections 
           const collection=db.collection("users");
           //3.find the data by email
           return  await collection.findOne({email});
      }
      catch(err){
        console.log(err);
      }
    }
     
}
export default UserRepository;