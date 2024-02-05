import jwt  from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../../DB/models/user.model.js";

export const isAuthenticated =asyncHandler(async(req,res,next)=>{
    const {token} = req.headers
    //check token exist 
    if(!token) return next( new Error("token missed!"))
    // verify token
    const payload = jwt.verify(token,process.env.SECERT_KEY)
            //check user 
            const isUser = await User.findById(payload.id)
            if(!isUser) return next( new Error("user not found"))
    //pass user to next middleware
    req.user =isUser
    //call next controller
     return next()
})
