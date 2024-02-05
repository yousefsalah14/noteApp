import { User } from "../../../DB/models/user.model.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import bcryptjs from "bcryptjs"
import jwt  from "jsonwebtoken"

export const signup= asyncHandler(async(req,res,next)=>{
         const {email ,password,confirmPassword,age}=req.body
         //check password
         if(password!== confirmPassword) next( new Error("password must match"))
         // hash password
           const hashPassword=bcryptjs.hashSync(
                password,
                parseInt(process.env.SALT_ROUND)
                )
         //check email 
        const isUser = await User.findOne({email})
        if(isUser) return next( new Error("email already exist"))
        //create user
         await User.create({email,password :hashPassword,age})
        return res.json({success:true , message :"user created successfully"})

})
export const login= asyncHandler (async(req,res,next)=>{
        const {email ,password}=req.body
        //check email 
        const isUser = await User.findOne(({email}))
        if(!isUser) return next( new Error("incorrect email"))
        //check password 
        // const Password = await User.findOne(({password})) // instead to check db twice
        // compare hashing password to real password (check password)
        const match = bcryptjs.compareSync(password,isUser.password)

        if(!match) return next( new Error("incorrect password"))
        // generate token
    const token = jwt.sign({id: isUser._id , email:isUser.email},process.env.SECERT_KEY)
        return res.json({scuccess :true ,token})
})