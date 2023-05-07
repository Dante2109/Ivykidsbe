const express=require('express')
const userRouter = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {UserModel}=require("../Models/userSchema")


userRouter.get(`/all`,async(req,res)=>{
    try {
        let data=await UserModel.find();
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

userRouter.post('/register', async(req,res)=>{
   const {username,password} = req.body
   let count=await UserModel.count({username});
   if(!count){
    try {
        bcrypt.hash(password, 5, async(err, hash)=>{
            if(err){
                console.log(err.message)
                res.send("Error")
            }
            else{
                const user = new UserModel({username,password:hash})
                await user.save()
                res.send("successfully registered")
            }
        });
        
    } catch (error) {
        console.log(error)
        res.send("Error")
    }}else{
        res.send("User already registered")
    }
})



userRouter.post("/login", async(req,res)=>{
    try {
        const {username,password} = req.body
        const user=await UserModel.find({username})
        if(user.length>0){
            bcrypt.compare(password, user[0].password,(err, result)=>{
                if(result){
                    const token = jwt.sign({userId:user[0]._id}, "ivy")
                     res.send({token,name:user[0].name})
                }
                else{
                    res.status(401).send("wrong password")
                    console.log(err)
                }
            });
            
        }
        else{
            res.status(401).send("Wrong Credentials")
        }
        
    } catch (error) {
        res.send("Wrong Credentials")
        console.log(error)   
    }
})
module.exports={userRouter}