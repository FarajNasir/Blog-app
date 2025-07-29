import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";
import { User } from "../models/user.model.js";

//get single blog
const getSingleBlog=async(req,res)=>{
    try {
        const {id}=req.params
        const blog=await Blog.findById(id)

        if(!blog){
               return res.status(401).send({
            success:false,
            message:"No blogs found of this id",
            
        })
        }

        return res.status(200).send({
            success:true,
            message:"fetched single blogs",
            blog,
        })
    } catch (error) {
         console.log(error)
        return res.status(500).send({
            success:false,
            message:"error while getting single blog",
            error
        })
    }
}

// getall blog
const getAllBlogController=async(req,res)=>{
    try {
        const blogs=await Blog.find({})

        if (!blogs) {
            return res.status(401).send({
            success:false,
            message:"No blogs  found",
            
        })
        }
            return res.status(200).send({
            success:true,
            message:"All blogs blogs  found",
            blogs,
            BlogCount:blogs.length
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error while getting blogs",
            error
        })
    }
}

// create blog container
const createBlogController=async(req,res)=>{
    try {
        const {title,description,image,user}=req.body

        // vallidation 
        if (!title || !description || !image || !user) {
            return res.status(400).send({
            success:false,
            message:"please provide all field",
            
        })
        }

        const existUser=await User.findById(user)
       if(!existUser){
         return res.status(400).send({
            success:false,
            message:"user not found",
            error
        })
       }
        //method 1
        const newBlog=new Blog({title,description,image,user})
        const session=await mongoose.startSession()
        session.startTransaction()
        await newBlog.save({session})
        existUser.blogs.push(newBlog)
        await existUser.save({session})
        await session.commitTransaction();

        await newBlog.save()

        // //method 2

        //    const newblog = await Blog.create({
        //     title,
        //     description,
        //     image
        // })
         return res.status(200).send({
            success:true,
            message:"blog created",
            newBlog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"error while creating blog",
            error
        })
    }
}

// update blog
const updateBlogController=async(req,res)=>{
    try {
        const {id}=req.params
        const {title,description,image}=req.body
        const updateBlog=await Blog.findByIdAndUpdate(id,{
            title,
            description,
            image
        },
        {new:true}
    )

    return res.status(200).send({
            success:true,
            message:"blog updated",
            updateBlog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"error while updating blog",
            error
        })
    }
}

//Delete blog
const deleteBlogController=async(req,res)=>{
    try {
      const blog = await Blog
      // .findOneAndDelete(req.params.id)
      .findByIdAndDelete(req.params.id?.trim())
      .populate("user");
   if (blog.user && blog.user.blogs) {
  blog.user.blogs.pull(blog._id); // use blog._id, not blog object
  await blog.user.save();
}
    return res.status(200).send({
      success: true,
      message: "Blog Deleted!",
    });
  }catch (error) {
         console.log(error)
        return res.status(400).send({
            success:false,
            message:"error while deleting blogs",
            error
        })
    }
}

// get user blog

const userBlogController=async(req,res)=>{
  try {
    const userBlog=await User.findById(req.params.id).populate("blogs")
    if (!userBlog) {
        return res.status(404).send({
            success:false,
            message:"no block in found with this id"
        })
    }
     return res.status(200).send({
      success: true,
      message: "Blog found",
      userBlog
    });
  } catch (error) {
     console.log(error)
        return res.status(400).send({
            success:false,
            message:"error in user blogs",
            error
        });
  }
}

export {getSingleBlog,getAllBlogController,createBlogController,updateBlogController,deleteBlogController,userBlogController}