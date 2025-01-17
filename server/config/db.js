import mongoose from "mongoose";

const connectDB=async ()=>{
    mongoose.connection.on('connected',()=>{
        console.log("DB connected")
    })
 try{
    await mongoose.connect(`${process.env.MONGODB_URI}/dribbble`)
 }catch(error){
    console.log(error)
 }
}
export default connectDB
