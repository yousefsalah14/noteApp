import { Note } from "../../../DB/models/note.model.js"
import { User } from "../../../DB/models/user.model.js"
//create note
export const createNote =async(req,res)=>{
    try {
        const {content,user}=req.body
        //check user 
        const isUser = await User.findById(user)
        if(!isUser) return res.json({success:false ,message:"you can't add note!!!"})

        //create note
        await Note.create({content , user})
        //send res
        res.json({success:true , message:"note added successfully"})

    } catch (error) {
        return res.json({success:false, message :"here in catch", error})
    }
}

// update note 
export const updateNote = async(req,res)=>{
    try {
        const {id}=req.params
        const {user,isCompleted}=req.body
        // check user 
        const isUser = await User.findById(user)
        if(!isUser) return res.json({success:false ,message:"you can't update note!!!"})
        // check note 
    const note = await Note.findById(id)
    console.log(note);
    if(!note)res.json({sucess:false ,message : "note not found "})
    //check owner
    if(note.user.toString()!==user.toString()) 
        return res.json({sucess:false ,message : "your not the owner "})
        //update note
        note.isCompleted =isCompleted
        await note.save()
        res.json({success:true , message:"note updated successfully"})
    } catch (error) {
        return res.json({success:false, message :"here in catch", error})
    }
}

export const deleteNote= async(req,res)=>{
    try {
        const {id}=req.params
        const {user}=req.body
        // check user 
        const isUser = await User.findById(user)
        if(!isUser) return res.json({success:false ,message:"you can't delete note!!!"})
        // check note 
    const note = await Note.findById(id)
    console.log(note);
    if(!note)res.json({sucess:false ,message : "note not found "})
    //check owner
    if(note.user.toString()!==user.toString()) 
    return res.json({sucess:false ,message : "your not the owner "})
    //delete note
    await note.deleteOne()
    res.json({success:true , message:"note deleted successfully"})

} catch (error) {
    return res.json({success:false, message :"here in catch", error})
}
}
export const allNotes =async(req,res)=>{
    try {
         const notes = await Note.find().populate("user")
         return res.json({success:true , results :{notes}})
} 
catch (error) {
    return res.json({success:false, message :"here in catch", error})
}
}
export const userNotes = async(req,res)=>{
try {
const {id} = req.params
        // check user 
        const isUser = await User.findById(id)
        if(!isUser) return res.json({success:false ,message:"you can't delete note!!!"})
        const notes = await Note.find({user:id})
        return res.json({success:true , results:{notes}})
} catch (error) {
    return res.json({success:false, message :"here in catch", error})
}
}
