import { Router } from "express";
import { login, signup } from "./user.controller.js";
const userRouter = Router()
export default userRouter

userRouter.post("/signup",signup)
userRouter.post("/login",login)
