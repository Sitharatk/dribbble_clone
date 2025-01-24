
import Navbar from '../Component/Navbar'
import Footer from '../Component/Footer'
import { Outlet, useLocation } from 'react-router-dom'

function MainLayout() {
    const location=useLocation()
const hide=location.pathname==='/login' || location.pathname === '/signup' || location.pathname === '/get_started'|| location.pathname === '/welcomedesigner' || location.pathname ==='/uploads'  ||  location.pathname.startsWith('/shots/') || location.pathname.startsWith('/editshot/');
  return (
    <>
   {!hide &&  <Navbar/>}
    <Outlet/>
   {!hide &&  <Footer/>}
    </>
  )
}

export default MainLayout