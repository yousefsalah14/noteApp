import express from 'express'
import { connectDB } from './DB/connection.js'
import userRouter from './src/modules/user/user.routes.js'
import noteRouter from './src/modules/note/note.routes.js'
import dotenv from "dotenv"
dotenv.config()
const app = express()
const port = process.env.PORT
app.use(express.json())

//  Apis
//note
app.use("/note",noteRouter)
//user 
app.use("/user",userRouter)
// page not found handler 
app.all("*",(req,res)=>{
    return res.json({success :false ,message : "page not found and error in endpoint "})
})
//global error handler
app.use((error ,req,res,next)=>{
    return res.json({
        success:false,
        message: error.message,
        stack: error.stack
    })
})
await connectDB()
app.listen(port, () => console.log(`App listening on port ${port}!`))