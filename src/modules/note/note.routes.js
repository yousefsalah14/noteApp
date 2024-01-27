import { Router } from "express";
import { createNote, deleteNote, updateNote,allNotes,userNotes } from "./note.controller.js";
const noteRouter = Router()
export default noteRouter

//create note
noteRouter.post("/",createNote)
//update note
noteRouter.patch("/:id",updateNote)
//delete note
noteRouter.delete("/:id",deleteNote)
//get all notes 
noteRouter.get("/",allNotes)
//get user notes 
noteRouter.get("/user/:id",userNotes)
