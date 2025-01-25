import express from 'express'
import { deleteLike, deleteShot, getAllShots, getShots, likeShot, updateShot } from '../controllers/shotController.js'
import { verifyToken } from '../middleware/verifyToken.js'
import upload from '../middleware/multer.js'

const shotRouter=express.Router()
shotRouter
.get('/shots/:id',verifyToken, getShots)
.delete('/shots/:id', verifyToken, deleteShot)	
.put('/shots/:id', upload.single('image'), updateShot)
.get('/shots', getAllShots)
.delete('/shots/:/like', verifyToken, deleteLike)
.post('/shots/:id/like', verifyToken,likeShot)   
export default shotRouter