import { Schema, Types, model } from "mongoose";

const noteSchema= new Schema({
    content:{type:String, required : true},
    isCompleted :{type: Boolean , default : false},
    user : {type:Types.ObjectId, ref:"user"}

},{timestamps:false})

export const Note = model("note",noteSchema)