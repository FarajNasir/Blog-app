import express from 'express'
import { Router } from 'express'
import { getAlluser, loginController, registerController } from '../controller/user.controller.js'

const router=Router()

// get all user || get
router.route('/getalluser').get(getAlluser)

// create user || POST
router.route('/register').post(registerController)

// login || POST
router.route('/login').post(loginController)

export default router