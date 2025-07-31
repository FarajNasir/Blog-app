import React, { useState } from 'react'
import {Box,Typography,TextField,Button} from '@mui/material'
import {useNavigate} from "react-router-dom"
import axios from 'axios'

const Register = () => {
  const navigate=useNavigate()
  const [input,setInput]=useState({
    name:'',
    email:'',
    password:'',

  })

  // handle input change
  const handlechange=(e)=>{
    setInput(prevState=>({
      ...prevState,
      [e.target.name]:e.target.value
   } ))
  }

  // handle submit
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const {data}=await axios.post('/api/v1/user/register',{username:input.name,email:input.email,password:input.password})
      if(data){
        alert("user register successfully")
        navigate("/login")
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <>
    <form onSubmit={handleSubmit}>
      <Box 
      maxWidth={450} 
      display="flex" 
      flexDirection="column" 
      alignItems="center"
      justifyContent='center'
      margin="auto"
      marginTop={5}
      boxShadow="10px 10px 20px #ccc"
      padding={3}
      borderRadius={5}
      >
        <Typography 
        variant='h4'
        padding={3}
        textAlign={'center'}
        >Register
        </Typography>

        <TextField 
        placeholder='Name'
        name='name'
        value={input.name}
        margin='normal'
        type='text'
        required
        onChange={handlechange}
        />

        <TextField 
        placeholder='Email'
        name='email'
        value={input.email}
        margin='normal'
        type='email'
        required
        onChange={handlechange}
        />
        
        <TextField 
        placeholder='Password'
        name='password'
        value={input.password}
        margin='normal'
        type='password'
        required
        onChange={handlechange}
        />
       
        <Button 
        type='submit'
        variant='contained'
        color='primary'
        sx={{marginTop:3,borderRadius:3}}
        >Submit
        </Button>
        <Button onClick={()=>navigate('/login')}
        sx={{marginTop:3,borderRadius:3}}
        >Already Registered ? Please Login</Button>
      </Box>
      </form>
    </>
  )
}

export default Register
