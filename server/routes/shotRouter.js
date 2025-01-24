import express from 'express'
import { deleteShot, getShots, updateShot } from '../controllers/shotController.js'
import { verifyToken } from '../middleware/verifyToken.js'
import upload from '../middleware/multer.js'

const shotRouter=express.Router()
shotRouter
.get('/shots',verifyToken, getShots)
.delete('/shots/:id', verifyToken, deleteShot)	
.put('/shots/:id', upload.single('image'), updateShot);


export default shotRouter