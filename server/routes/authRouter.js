import express from 'express'
import { loginUser, registerUser } from '../controllers/authController.js'
import { profileUpdate} from '../controllers/userController.js'
import upload from '../middleware/multer.js'


const userRouter=express.Router()
userRouter
.post('/signup',registerUser)
.post('/login',loginUser)
.post('/user/:id/avatar',upload.single('avatar'),profileUpdate)



export default userRouter