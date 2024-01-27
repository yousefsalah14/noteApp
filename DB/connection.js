import mongoose from "mongoose"
export const connectDB = async ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/noteApp").then(()=>console.log("DB connected"))
    .catch((error)=>console.log("errorr!!!!!"))
}