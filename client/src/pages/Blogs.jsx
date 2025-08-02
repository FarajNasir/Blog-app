import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import BlogCard from '../components/Blogcard'
import { nanoid } from 'nanoid'

const Blogs = () => {
  const[blogs,setBlogs]=useState([])
  
  // get all blocks
  const getAllBlogs=async()=>{
     try {
      const {data}=await axios.get('/api/v1/blog/all-blog')
      
      // console.log(blogs)
      if (data?.success) {
        setBlogs(data.blogs)
      }
     } catch (error) {
      console.log(error)
     }
  }

  // console.log(blogs);
  

  useEffect(()=>{
    getAllBlogs()
  },[])


  return (
    <div>
      {blogs &&
        blogs.map((blog) => (
          <BlogCard
            
            id={blog._id}
            isUser={localStorage.getItem('userId') === blog?.user[0]._id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.user[0]?.username}
            time={blog.createdAt}
          />
        ))}
    </div>
  );
};

export default Blogs
