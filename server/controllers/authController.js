import jwt from 'jsonwebtoken'; 
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import CustomError from '../utils/CustomError.js';
import joiUserSchema  from '../models/validation.js';


const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET, { expiresIn: '45m' })
 }
 const createRefreshToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_REFRESH_TOKEN, { expiresIn: '7d' });
 };
 

 export const registerUser = async (req, res, next) => {
    
    try {
      const { error } = joiUserSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      const { name, username, email, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, username, email, password: hashedPassword });
  
      const token = createToken(user._id);
      const refreshToken = createRefreshToken(user._id);
  
      res.status(201).json({ token, refreshToken ,id:user._id,profilePicture:user.profilePicture });
    } catch (error) {
      next(error);
    }
  };
  

  export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return next(new CustomError('Email and password are required', 400));
    }
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return next(new CustomError('Invalid credentials', 401));
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return next(new CustomError('Invalid credentials', 401));
      }
  
      const token = createToken(user._id);
      const refreshToken = createRefreshToken(user._id);
  
      res.status(200).json({
        token,
        refreshToken,
        user: { id: user._id, name: user.name, email: user.email,  profilePicture: user.profilePicture ,location:user.location
        },
      });
    } catch (error) {
      console.error('Error in loginUser:', error.message, error.stack);
      next(error);
    }
  };
  

  export const logout = async (req, res, next) => {
    res.status(200).json({ message: 'Logout successful' });
  };  
  
//   export const refreshAccessToken = async (req, res, next) => {
//     const { refreshToken } = req.body;
  
//     if (!refreshToken) {
//       return next(new CustomError('Refresh token is required', 400));
//     }
  
//     try {
//       const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);
  
//       const newToken = createToken(decoded.id);
  
//       res.status(200).json({ token: newToken });
//     } catch (error) {
//       console.error('Error in refreshAccessToken:', error.message, error.stack);
//       next(new CustomError('Invalid or expired refresh token', 401));
//     }
//   };
  