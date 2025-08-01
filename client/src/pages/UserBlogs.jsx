import axios from 'axios'
import React,{useState,useEffect} from 'react'
import BlogCard from '../components/Blogcard'

const UserBlogs = () => {
    const [blogs,setBlogs]=useState([])

    const getUserBlogs=async()=>{
        try {
            const id=localStorage.getItem('userId')
            // console.log(id)
            const{data}=await axios.get(`/api/v1/blog/user-blog/${id}`)
            // const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
            // console.log(data)
            if(data?.success){
              //  console.log(data)
                setBlogs(data?.userBlog.blogs);
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
       getUserBlogs()
    },[])
    // console.log(blogs)
   return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={blog.createdAt}
          />
        ))
      ) : (
        <h1>You Havent Created a blog</h1>
      )}
    </div>
  );
};

export default UserBlogs
