import UserModel from "../features/user/user.model.js";

const basicAuthorizer=(req,res,next)=>{
    //Authorizer header
    const authHeader=req.headers['authorization'];
    if(!authHeader)
    return res.status(401).send('unauthorize user');
    // 2. Extract credentials. [Basic qwertyusdfghj345678cvdfgh]
    console.log( authHeader);
    const  base64cred=authHeader.replace('Basic ','');
    console.log( base64cred);
     // 3. decode crdentials.
     const decodedCred=Buffer.from( base64cred,'base64').toString('utf8');
     console.log(decodedCred);//[email:password]
      const cred=decodedCred.split(':');

      const user=UserModel.getAll().find(u=>u.email==cred[0]&&u.password==cred[1]);
      if(user)
      next();
    else return res.status(401).send('incorrect credential');
    
      
}
export default basicAuthorizer;