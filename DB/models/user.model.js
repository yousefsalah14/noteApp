import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email:{type: String , required:true},
    password:{type: String , required:true},
    age: {type : Number , min:18 , max:60 }
},
    {timestamps:false})

export const User = model("user",userSchema)