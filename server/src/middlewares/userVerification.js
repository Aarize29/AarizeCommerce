import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const verifyUser=(req,res,next)=>{
    try {
        const token = req.headers.authorization;  

        if(!token || !token.startsWith('Bearer ') ){
            return res.status(401).json({error:"unauthorized access. Beared token is missing or invalid"})
        }

        const extractedToken=token.split(' ')[1]

        const decoded=jwt.decode(extractedToken,proccess.env.JWT_SECTER)
        req.user=decoded
        next()
    } catch (error) {
        console.log(error)
    }
}

export {
    verifyUser
}