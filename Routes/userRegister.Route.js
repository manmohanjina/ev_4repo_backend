const express = require("express");
const userRoute = express.Router();
userRoute.use(express.json());
const jwt=require('jsonwebtoken')
const {UserModel}=require('../Model/UserRegistration')
const bcrypt=require("bcrypt")



userRoute.post("/register", async(req,res)=>{

    const {name,email,password,gender}=req.body


    try{
bcrypt.hash(password, +process.env.salt, async(err,hash_pass)=>{
    const newUser= await new UserModel({
        name,
        email,
        password:hash_pass,
        gender
    })
    await newUser.save()
    res.send({"succ":"new User added"})
})
    }
    catch(err){
        console.log(err)
        res.send('error while  creating new user')
    }
});

userRoute.post('/login',async(req,res)=>{
    
    const {email,password}=req.body;

    const isUserPresent=await UserModel.find({email})
    if(isUserPresent.length==0){
        res.send({"msg":"No active user found with this email"})
    }
    if(isUserPresent.length>0){
        bcrypt.compare(password, isUserPresent[0].password,(err,result)=>{
if(result){
    const token=jwt.sign({userId:isUserPresent[0]._id},"masai")
    res.send({"succ":"login success", token:token})
}
else{
    res.send({"err":"wrong email  Password"})
}

        })
    }
})

module.exports={
    userRoute
}