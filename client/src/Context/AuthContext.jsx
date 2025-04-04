import { createContext, useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../utilities/axiosInstance';
import axios from 'axios';
import { toast } from 'react-toastify';
import axiosErrorManager from '../../utilities/axiosErrorManager';

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const [authData, setAuthData] = useState(() => {
    const storedData = localStorage.getItem('currentUser');
    return storedData ? JSON.parse(storedData) : null;
  });

  const updateAuthData = useCallback((data) => {
    if (data) {
      localStorage.setItem('currentUser', JSON.stringify(data));
      localStorage.setItem('token', data.token);
      setAuthData(data);
    } else {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      setAuthData(null);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      
      const { user, token } = response.data;
      updateAuthData({ ...user, token });
    } catch (error) {
      toast.error(axiosErrorManager(error));
      throw error;
    }
  };


  const register = async (name, username, email, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        { name, username, email, password },
        { withCredentials: true } 
      );
  
      const user = { id: response.data.id, name, email };
      const token = response.data.token;
  
      localStorage.setItem('currentUser', JSON.stringify({ ...user, token }));
      setAuthData({ ...user, token });
    } catch (error) {
      console.error("Registration error:", error.response?.data || error);
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
      const response = await axiosInstance.put(`/auth/user/${userId}/follow`);
      
      if (response.data.user) {
        // Make sure we're getting the updated user data from the response
        const updatedUser = response.data.user;
        
        // Update the local state with the new following list
        setAuthData(prev => ({
          ...prev,
          following: updatedUser.following || [...(prev?.following || []), userId]
        }));

        localStorage.setItem('currentUser', JSON.stringify({
          ...authData,
          following: updatedUser.following || [...(authData?.following || []), userId]
        }));
      }
      return response.data;
    } catch (error) {
      console.error('Error following user:', error);
      throw error;
    }
  };
  
  const unfollowUser = async (userId) => {
    try {
        const response = await axiosInstance.put(
            `/auth/user/${userId}/unfollow`
        );

        if (response.data.user) {
            const updatedUser = response.data.user;

            setAuthData(prev => ({
                ...prev,
                following: prev.following.filter(id => id !== userId)
            }));
        
            const currentStorage = JSON.parse(localStorage.getItem('currentUser'));
            const updatedStorage = {
                ...currentStorage,
                following: currentStorage.following.filter(id => id !== userId)
            };
            localStorage.setItem('currentUser', JSON.stringify(updatedStorage));
            
            return response.data;
        }
    } catch (error) {
        console.error('Error unfollowing user:', error);
        throw error;
    }
};
  
const blockUser = async (userId, shouldBlock) => {
  try {
    const response = await axiosInstance.put(`/auth/block/${userId}`, { block: shouldBlock });
    // Update authData or trigger a refresh of user data
    return response.data;
  } catch (error) {
    console.error('Error blocking/unblocking user:', error);
    throw error;
  }
};
  return (
    <AuthContext.Provider value={{ authData, login, register, logout ,setAuthData,followUser,unfollowUser,  isAuthenticated: !!authData,blockUser}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

