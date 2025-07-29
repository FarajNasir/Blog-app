import React from 'react'
import {Box,AppBar,Toolbar,Button,Typography} from '@mui/material'

const Header = () => {
  return (
   <>
    <AppBar position='sticky' color='secondry'>
        <Toolbar>
           <Typography variant='h4'>My Blog App</Typography>
           <Box display={'flex'} marginLeft="auto">
              <Button sx={{margin:1,color:'white'}}>login</Button>
              <Button sx={{margin:1,color:'white'}}>Register</Button>
              <Button sx={{margin:1,color:'white'}}>logout</Button>
           </Box>
        </Toolbar>
    </AppBar>
   </>
  )
}

export default Header
