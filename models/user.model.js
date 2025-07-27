import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:[true,"username is required"]
    },
     email:{
        type:String,
        require:[true,"email is required"]
    },
     password:{
        type:String,
        require:[true,"password is required"]
    }
},{timestamps:true})

export const User=mongoose.model('User',userSchema)

