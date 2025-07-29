import mongoose from "mongoose";

const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`connected to database ${mongoose.connection.host}`)
    } catch (error) {
        console.log("MONGO connect error :: ",error)
    }
}

export default connectDb