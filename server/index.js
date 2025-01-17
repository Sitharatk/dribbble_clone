import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRouter from './routes/authRouter.js'
import { connectCloudinary } from './config/cloudinary.js'
import errorHandler from './middleware/errorHandler.js'


dotenv.config();
connectDB();
connectCloudinary()

const app = express();

// Middleware
app.use(express.json());
app.use(cors())

// Routes
app.use('/auth',userRouter)
app.use(errorHandler)
// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
