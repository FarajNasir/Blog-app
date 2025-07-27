import mongoose  from "mongoose";

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        require:[true,"title is required"]
    },
    description:{
        type:String,
        require:[true,"description is required"]
    },
    image:{
        type:String,
        require:[true,"image is required"]
    }
},{timestamps:true})

export const Blog=mongoose.model("Blog",blogSchema)

