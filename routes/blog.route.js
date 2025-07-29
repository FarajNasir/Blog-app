import { Router } from "express";
import { getSingleBlog,getAllBlogController,createBlogController,updateBlogController,deleteBlogController, userBlogController } from "../controller/blog.controller.js";

const router=Router()

// get single blog || GET 
router.route("/getsingle-blog/:id").get(getSingleBlog)

// get all blogs || GET
router.route("/all-blog").get(getAllBlogController)

// create blog || POST
router.route("/create_blog").post(createBlogController);

// update blog || PUT
router.route("/update-blog/:id").put(updateBlogController);

// delete blog || BLOG
router.route("/delete-blog/:id").delete(deleteBlogController);

// user bog || get
router.route("/user-blog/:id").get(userBlogController);


export default router