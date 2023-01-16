
const jwt=require('jsonwebtoken')

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        const decode=jwt.verify(token, "masai")

        if(decode){
           const userId=decode.userId
           req.body.userId=userId
           
           next()
        }
        else{
            res.send({"err":"plz login first"})
        }
    }
    else{
        res.send({"err":"please provide Token"})
    }
}


module.exports={
    authenticate
}