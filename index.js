import express from 'express'
import { connectDB } from './DB/connection.js'
import userRouter from './src/modules/user/user.routes.js'
import noteRouter from './src/modules/note/note.routes.js'
const app = express()
const port = 3000
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
await connectDB()
app.listen(port, () => console.log(` App listening on port ${port}!`))