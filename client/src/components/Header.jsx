import React, { useState } from 'react'
import {Box,AppBar,Toolbar,Button,Typography,Tab,Tabs} from '@mui/material'
import { Link, Navigate,useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { authAction } from '../redux/store'

const Header = () => {
   //global state
   const navigate=useNavigate()
   const isLogin=useSelector(state=>state.isLogin)
   const handleLogout=()=>{
    try {
      dispatch(authAction.logout())
      alert("logout successfully")
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
   }
   const [value,setValue]=useState()

   const dispatch=useDispatch()
  return (
   <>
    <AppBar position='sticky' sx={{backgroundColor:"black",}}>
        <Toolbar>
           <Typography variant='h4'>My Blog App</Typography>
           {isLogin && (
            <Box sx={'flex' } marginLeft="auto" marginRight="auto">
            <Tabs textColor='inherit' value={value} onChange={(e,value)=>setValue(value)}> 
               <Tab label="Blogs" LinkComponent={Link} to="/blogs"/>
               <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs"/>
            </Tabs>
           </Box>
           )}
           <Box display={'flex'} marginLeft="auto">
           {!isLogin &&(<>
             <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>

                 <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
           </>)}

           {isLogin && (
            <Button onClick={handleLogout} sx={{ margin: 1, color: "white" }}>
                logout
            </Button>
           )}
             
           </Box>
        </Toolbar>
    </AppBar>
   </>
  )
}

export default Header
