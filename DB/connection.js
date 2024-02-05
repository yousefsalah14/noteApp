import mongoose from "mongoose"
export const connectDB = async ()=>{
    return mongoose.connect(process.env.CONNECTION_URL).then(()=>console.log("DB connected"))
    .catch((error)=>console.log("errorr!!!!!"))
}