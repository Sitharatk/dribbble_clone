import express from 'express'
import { loginUser, registerUser } from '../controllers/authController.js'
import { profileUpdate, updateExistingProfile, deleteAvatar} from '../controllers/userController.js'
import upload from '../middleware/multer.js'
import { uploadShot } from '../controllers/shotController.js'


const userRouter=express.Router()
userRouter
.post('/signup',registerUser)
.post('/login',loginUser)
.post('/user/:id/avatar',upload.single('avatar'),profileUpdate)
.put('/user/:id/profile', upload.single('avatar'), updateExistingProfile)
.delete('/user/:id/avatar', deleteAvatar)
.post('/user/:id/shots', upload.single('image'), uploadShot)



export default userRouter