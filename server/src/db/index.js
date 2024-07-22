import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const connectDB=async()=>{
    try {
         const connectionInstance=await mongoose.connect(`${process.env.MONGO_URI}`)
         console.log(`\n MongoDB connected || DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

export default connectDB