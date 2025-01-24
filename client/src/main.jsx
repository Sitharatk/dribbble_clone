import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import AuthProvider from './Context/AuthContext.jsx'
import ShopProvider from './Context/ShotContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <BrowserRouter>
      <AuthProvider>
      <ShopProvider>
  
    <App />
 
    </ShopProvider>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
