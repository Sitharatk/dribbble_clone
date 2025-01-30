import { Routes,Route } from 'react-router-dom'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import SIgnUP from '../Pages/SIgnUP'
import MainLayout from '../layout/mainLayout'
import Welcome from '../Pages/Welcome'
import WelcomeHIring from '../Pages/WelcomeHIring'
import Shots from '../Pages/Shots'  
import UserDetails from '../Pages/UserDetails'
import UserAbout from '../Pages/UserAbout'
import UserWork from '../Pages/UserWork'
import EditProfile from '../Pages/EditProfile'
import Submitbrief from '../Pages/Submitbrief'
import PostJob from '../Pages/PostJob'
import Upload from '../Pages/Upload'
import Services from '../Pages/Services'
import Hiring from '../Pages/Hiring'
import EditShot from '../Pages/EditShot'
import Likes from '../Pages/Likes'
import Others from '../Pages/Others'
import Tags from '../Pages/Tags'
import Collections from '../Pages/Collections'
import Blog from '../Pages/Blog'

function AppRouters() {
  return (
    <>
  
    <Routes>
        <Route element={  <MainLayout/>}>
        <Route path="/" element={<Home/>}/>
      
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SIgnUP/>}/>
        <Route path='/get_started' element={<Welcome/>}/>
        <Route path='/welcomedesigner' element={<WelcomeHIring/>}/>
       <Route path='/userdetails' element={<UserDetails/>}/>
        <Route path='/userabout' element={<UserAbout/>}/>
        <Route path='/userwork' element={<UserWork/>}/>
        <Route path='/editprofile' element={<EditProfile/>}/> 
        <Route path='/submitbrief' element={<Submitbrief/>}/>
        <Route path='/postjob' element={<PostJob/>}/>
        <Route path='/uploads' element={<Upload/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/hiring' element={<Hiring/>}/>
        <Route path='/shots/:id' element={<Shots/>}/>
        <Route path ='/editshot/:id' element={<EditShot/>}/>
        <Route path='/likes' element={<Likes/>}/>
        <Route path='/:username' element={<Others/>}/>
      <Route path='/posts/:tags' element={<Tags/>}/>
       <Route path='/collections'element={<Collections/>}/>
       <Route path='/blog' element={<Blog/>}/>
        </Route>
    </Routes>

    </>
  )
}

export default AppRouters