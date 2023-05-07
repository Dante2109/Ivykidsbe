const express=require("express")
require('dotenv').config()
const cors=require('cors')  
const { connection } = require("./Configs/db")
const { userRouter } = require("./Routes/userRoutes")
const { contactRouter } = require("./Routes/contactRoutes")
const { authenticate } = require("./Middleware/authentication")
const app = express()
app.use(cors())
app.use(express.json())
app.get('/', (req, res)=>{
    res.send("Welcome to IvyKids Backend.")
})
app.use("/users",userRouter)
app.use(authenticate)
app.use("/contact",contactRouter)

app.listen(5000,async()=>{
    try {
        await connection
        console.log(`Database has been connected`)
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is online at ${process.env.PORT}`)
})