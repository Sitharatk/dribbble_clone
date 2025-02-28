import express from 'express'
import { loginUser, refreshAccessToken, registerUser } from '../controllers/authController.js'
import { profileUpdate, updateExistingProfile, deleteAvatar, getUserByUsername} from '../controllers/userController.js'
import upload from '../middleware/multer.js'
import { deleteShot, getShots, uploadShot } from '../controllers/shotController.js'
import { verifyToken } from '../middleware/verifyToken.js'
import { follow, unfollow } from '../controllers/followController.js'


const userRouter=express.Router()
userRouter
.post('/signup',registerUser)
.post('/login',loginUser)
.post ('/refreshToken',refreshAccessToken)
.post('/user/:id/avatar',upload.single('avatar'),profileUpdate)
.put('/user/:id/profile', upload.single('avatar'), updateExistingProfile)
.delete('/user/:id/avatar', deleteAvatar)
.post('/user/:id/shots', verifyToken,upload.single('image'), uploadShot)
.get('/shots',verifyToken, getShots)
.delete('/shots/:id', verifyToken, deleteShot)	
.put('/user/:id/follow', verifyToken, follow)
.put('/user/:id/unfollow', verifyToken, unfollow)
.get('/users/:username',verifyToken,getUserByUsername)


export default userRouter