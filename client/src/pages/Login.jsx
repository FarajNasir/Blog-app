import React, { useState } from 'react'
import {Box,Typography,TextField,Button} from '@mui/material'
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { authAction } from '../redux/store'

const Login = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [input,setInput]=useState({
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
      const {data}=await axios.post('/api/v1/user/login',{email:input.email,password:input.password})
      if(data.success){
        localStorage.setItem('userId',data?.user._id)
        dispatch(authAction.login())
        alert("user login successfully")
        navigate("/")
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
        >Login
        </Typography>

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
        <Button onClick={()=>navigate('/register')}
        sx={{marginTop:3,borderRadius:3}}
        >Not a user ? Please register</Button>
      </Box>
      </form>
    </>
  )
}

export default Login
