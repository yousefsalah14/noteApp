import { User } from "../../../DB/models/user.model.js"

export const signup=async(req,res)=>{
    try{
         const {email ,password,confirmPassword,age}=req.body
         //check password
         if(password!== confirmPassword) return res.json({success:false , message :"password must match"})
         //check email 
        const isUser = await User.findOne({email})
        if(isUser) return res.json({success:false , message: "email already exist" })
        //create user
         await User.create({email,password,age})
        return res.json({success:true , message :"user created successfully"})

}catch(error){
    return res.json({success :false , message :"error!!",error})
}
}
export const login=async(req,res)=>{
    try {
        const {email ,password}=req.body
        //check email 
        const isUser = await User.findOne(({email}))
        if(!isUser) return res.json({success:false , message :"incorrect email!!"})
        //check password 
        // const Password = await User.findOne(({password})) // instead to check db twice
        if(isUser.password !==password) return res.json({success:false , message :"incorrect password!!"})
        return res.json({scuccess :true ,message:"you are logged in"})
    } catch (error) {
        return res.json({success:false,message:"heree!!",error})
    }
}