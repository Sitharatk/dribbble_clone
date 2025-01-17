import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css'
import AppRouters from './router/AppRouters'

function App() {

  return (
    <>
   <ToastContainer/>
    <AppRouters/>
    </>
  )
}

export default App
