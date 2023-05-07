const express=require("express");
const { ContactModel } = require("../Models/contactSchema");
const contactRouter=express.Router()
contactRouter.get("/",async(req,res)=>{
    let user=req.body.user;
    try {
        let data=await ContactModel.find({user})
        res.send(data)
    } catch (error) {
        res.send({Error:"Error"})
    }
})

contactRouter.post("/",async(req,res)=>{
    let body=req.body;
    try {
        let contact=new ContactModel(body)
        await contact.save()
        res.send({Msg:"Contact saved successfully"})
    } catch (error) {
        res.send({Error:"Error"})
    }
})

contactRouter.patch("/:id",async(req,res)=>{
    let id=req.params.id
    let body=req.body
    console.log(body)
    try {
        let data=await ContactModel.findByIdAndUpdate(id,body)
        res.send({Msg:"Data has been updated Successfully"})   
    } catch (error) {
        res.send({Error:"Error"})
    }
})
contactRouter.delete("/:id",async(req,res)=>{
    let id=req.params.id
    try {
        let data=await ContactModel.findByIdAndDelete(id)
        res.send({Msg:"Data has been deleted Successfully"})   
    } catch (error) {
        res.send({Error:"Error"})
    }
})
module.exports={
    contactRouter
}