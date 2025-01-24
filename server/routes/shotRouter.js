import express from 'express'
import { deleteShot, getAllShots, getShots, updateShot } from '../controllers/shotController.js'
import { verifyToken } from '../middleware/verifyToken.js'
import upload from '../middleware/multer.js'

const shotRouter=express.Router()
shotRouter
.get('/shots/:id',verifyToken, getShots)
.delete('/shots/:id', verifyToken, deleteShot)	
.put('/shots/:id', upload.single('image'), updateShot)
.get('/shots', getAllShots)

export default shotRouter