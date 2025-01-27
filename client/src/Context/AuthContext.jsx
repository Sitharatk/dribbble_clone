import { createContext, useState, useEffect } from 'react';
import axios from 'axios';



// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const [authData, setAuthData] = useState(() => {
    const storedData = localStorage.getItem('currentUser');
    return storedData ? JSON.parse(storedData) : null;
  });
  

  const login = async (email, password) => {
    const response = await axios.post('http://localhost:3000/auth/login', { email, password });
    const user = response.data.user;
    const token = response.data.token;
  
    localStorage.setItem('currentUser', JSON.stringify({ ...user, token }));
    setAuthData({ ...user, token });
  };
  
  

  const register = async (name, username, email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/signup', { name, username, email, password });
  const user = { id: response.data.id, name, email };
  const token = response.data.token;

  localStorage.setItem('currentUser', JSON.stringify({ ...user, token }));
  setAuthData({ ...user, token });
      console.log(user);
    } catch (error) {
   
      throw error.response || error;
    }
  };
  
 
  const logout = (navigate) => {
    setAuthData(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem("token");
    if (navigate) {
      navigate('/');
    }
  };
  useEffect(() => {
 
    const storedData = localStorage.getItem('authData');
    if (storedData) {
      setAuthData(JSON.parse(storedData));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authData, login, register, logout ,setAuthData}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

