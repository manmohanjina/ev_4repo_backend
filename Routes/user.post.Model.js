const express = require("express");

const { PostModel } = require("../Model/userPost.Model");
const userPost = express.Router();

userPost.post("/add", async (req, res) => {
  let payload = req.body;

  try {
    let newPost = await new PostModel(payload);
    newPost.save();
    res.send({ succ: "new post have been added" });
  } catch (err) {
    console.log(err);
    res.send({ err: "cannot post right now" });
  }
});

userPost.get("/", async (req, res) => {

    try{
const data=await PostModel.find({})
res.send({"data":data})
    }
    catch(err){
        console.log(err)
        res.send({"err":"error while fetching"})
    }
});

module.exports = {
  userPost,
};


userPost.patch("/update/:id",async(req,res)=>{

    const id=req.params.id
    const payload=req.body
     try{
const data=await PostModel.findByIdAndUpdate({_id:id},payload)
res.send({"update":data})
}
     catch(err){
        console.log(err)
        res.send({"err":"canot update"})
     }
})

userPost.delete("/delete/:id",async(req,res)=>{
     const id=req.params.id

    try{
        const data=await PostModel.findByIdAndDelete({_id:id})
        res.send({"succ":"deleted"})
    }
    catch(er){
        console.log(er)
        res.send({"err":"cannot del"})
    }

})
