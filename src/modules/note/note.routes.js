import { Router } from "express";
import { createNote, deleteNote, updateNote,allNotes,userNotes } from "./note.controller.js";
import { isAuthenticated } from "../../middleware/auth.middleware.js";
import jwt from "jsonwebtoken"
const noteRouter = Router()
export default noteRouter

//create note
noteRouter.post("/",isAuthenticated,createNote)
//update note
noteRouter.patch("/:id",isAuthenticated,updateNote)
//delete note
noteRouter.delete("/:id",isAuthenticated,deleteNote)
//get all notes 
noteRouter.get("/",isAuthenticated,allNotes)
//get user notes 
noteRouter.get("/user/:id",isAuthenticated,userNotes)
