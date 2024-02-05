import { Note } from "../../../DB/models/note.model.js"
import { User } from "../../../DB/models/user.model.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
//create note
export const createNote = asyncHandler(async(req,res,next)=>{
   
    const user = req.user._id
        const {content}=req.body


        //create note
        await Note.create({content , user})
        //send res
        res.json({success:true , message:"note added successfully"})

})

// update note 
export const updateNote = asyncHandler(async(req,res,next)=>{
   
        const {id}=req.params
        const user = req.user._id
        const {isCompleted}=req.body
        
        // check note 
    const note = await Note.findById(id)
    console.log(note);
    if(!note) return next( new Error("note not found"))
    //check owner
    if(note.user.toString()!==user.toString()) 
        return next( new Error("you are not the owner"))
        //update note
        note.isCompleted =isCompleted
        await note.save()
        res.json({success:true , message:"note updated successfully"})

})

export const deleteNote=  asyncHandler(async(req,res,next)=>{

        const {id}=req.params
        const user = req.user._id

        // check note 
    const note = await Note.findById(id)
    console.log(note);
    if(!note) return next( new Error("note not found"))
    //check owner
    if(note.user.toString()!==user.toString()) 
    return next( new Error("you are not the owner"))
    //delete note
    await note.deleteOne()
    res.json({success:true , message:"note deleted successfully"})


})
export const allNotes = asyncHandler(async(req,res)=>{
   
         const notes = await Note.find().populate("user")
         return res.json({success:true , results :{notes}})
})
export const userNotes = asyncHandler(async(req,res)=>{
const {id} = req.params
        // check user 
        const isUser = await User.findById(id)
        if(!isUser) return next( new Error("you are not a user "))
        const notes = await Note.find({user:id})
        return res.json({success:true , results:{notes}})
})
