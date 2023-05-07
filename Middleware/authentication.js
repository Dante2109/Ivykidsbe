const jwt=require("jsonwebtoken")
const authenticate=(req,res,next)=>{
    let token = req.headers.authorization;
    let body=req.body
    if(token){
        jwt.verify(token,"ivy",(err,decoded)=>{
            if(decoded){
                body.user=decoded.userId;
                next()
            }else{
                res.status(401).send({error:"Please Login"})
            }
        })
    }else{
        res.status(401).send({error:"Please Login"})
    }
}
module.exports={
    authenticate
}