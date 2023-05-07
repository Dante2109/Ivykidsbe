const mongoose=require("mongoose")
const contactSchema=mongoose.Schema({
    name:{type:String,required:true},
    number:{type:Number,required:true},
    user:{type:mongoose.Schema.Types.ObjectId}
})

const ContactModel=mongoose.model("contact",contactSchema)
module.exports={
    ContactModel
}