
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../Config/cloudinary.js'
import multer from 'multer';



const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'dribbble',
        allowed_formats:["jpg","png","jpeg"]
    }
})

const upload=multer({storage,  limits: { fileSize: 5 * 1024 * 1024 } })
export default upload