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
 
    const storedData = localStorage.getItem('currentUser');
    if (storedData) {
      setAuthData(JSON.parse(storedData));
    }
  }, []);

  const followUser = async (userId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/auth/user/${userId}/follow`, 
        {}, // Empty body
        {
          headers: { Authorization: `Bearer ${authData?.token}` }
        }
      );
  
      const updatedUser = response.data.user;
      setAuthData((prev) => ({
        ...prev,
        following: updatedUser.following,
      }));
      localStorage.setItem('currentUser', JSON.stringify({ ...authData, following: updatedUser.following }));
    } catch (error) {
      console.error('Error following user:', error.response?.data || error);
    }
  };
  
  const unfollowUser = async (userId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/auth/user/${userId}/unfollow`, 
        {}, // Empty body
        {
          headers: { Authorization: `Bearer ${authData?.token}` }
        }
      );
  
      const updatedUser = response.data.user;
      setAuthData((prev) => ({
        ...prev,
        following: updatedUser.following,
      }));
      localStorage.setItem('currentUser', JSON.stringify({ ...authData, following: updatedUser.following }));
    } catch (error) {
      console.error('Error unfollowing user:', error.response?.data || error);
    }
  };
  
  return (
    <AuthContext.Provider value={{ authData, login, register, logout ,setAuthData,followUser,unfollowUser}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

