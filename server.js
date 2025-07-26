import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from'dotenv'
import connectDb from './config/db.js'


//env config
dotenv.config()

//mongodb connection
connectDb();

// rest object
const app=express()

// middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


import userRoutes from './routes/user.route.js'

//router
app.use('/api/v1/user',userRoutes)




const PORT=process.env.PORT || 3001
//listen
app.listen(PORT,()=>{
    console.log(`Server running on port number ${PORT}`)
})