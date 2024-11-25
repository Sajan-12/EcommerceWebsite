import jwt from 'jsonwebtoken';

const jwtAuth= (req,res,next)=>{
  //read the token
  const token=req.headers['authorization'];
  //if not token return error
  if(!token)
  return res.status(400).send('no autorize');
   //chek valid token
   try{
   const payload=jwt.verify(token,
    'AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz');
    req.body.userID=payload.userID;
    }
   catch(error){
     console.log(error);
    return res.status(400).send('Nonautorizeuser');
   }
   //next middleware
   next();
}
export default jwtAuth;