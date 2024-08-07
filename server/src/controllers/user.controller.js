import {User} from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { sendEmail } from '../utils/registerMail.js'

dotenv.config()

const registerUser=async(req, res)=>{
    try {
        console.log(req.body)
        const {name, email, password, address, contact}=req.body
        if (!email || !password || !name) {
            return res.json({ message: "missing info" });
        }
        const newUser=new User({
            name,email,password,address,contact
        })
        await newUser.save()
        await sendEmail(email)

       return  res.json({message :"Okay"})
    } catch (error) {
        console.log(error)
        return res.json({message:error})
    }
}

const loginUser=async(req,res)=>{
    try {
        const {email, password}=req.body
        if (!email || !password) {
            return res.json({ message: "Email or password is missing" });
        }
        const user= await User.findOne({email})
        //console.log(user)
        if(!user){
            return res.json({message:"No user found"})
        }

        if(password!==user.password){
            return res.json({message:"Wrong credentials"})
        }
        
        const token=jwt.sign({userId:user._id}, process.env.JWT_SECRET);
        return res.json({message:"ok", accesstoken:token})

    } catch (error) {
        return res.json({error:error})
    }
}


const getUser=async(req,res)=>{
    try {
        const user=req.user
        if(!user){
            return res.json({error:"Not authorized"})
        }
        const userinfo=await User.findById(user.userId)
        if(!userinfo){
            throw new Error("User not found")
        }
       // console.log(userinfo)

        res.json({message:"Got the user broo", userdetail:userinfo})
    } catch (error) {
        return res.json(error)
    }

}

const editUser=async(req,res)=>{
    try {
        const user=req.user
        if(!user){
            return res.json({error:"Not authorized"})
        }
        const {name,email,password,address,contact}=req.body

        await User.updateOne({_id:user.userId},{$set:{name,email,password,address,contact}})
        return res.json({status:"ok"})
    } catch (error) {
        return res.json({error:error})
    }
}
export  {
    registerUser,
    loginUser,
    getUser,
    editUser
}