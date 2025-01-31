import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import axiosInstance from '../../utilities/axiosInstance';
// eslint-disable-next-line react-refresh/only-export-components
export const ShotContext = createContext();

// eslint-disable-next-line react/prop-types
function ShotProvider({ children }) {
  const [shots, setShots] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authData } = useContext(AuthContext);
const [allShots, setAllShots] = useState([]);


    useEffect(() => {
      const fetchShots = async () => {
        try {
          const response = await axiosInstance.get(`/post/shots/${authData?.id}`);
          setShots(response.data.shots);
        } catch (error) {
          console.error("Error fetching shots:", error);
        } finally {
          setLoading(false);
        }
      };
    
      if (authData?.id) {
        fetchShots();
      } else {
        setLoading(false);
      }
    }, [authData]); 
    
      const deleteShot = async (id) => {
        try {
          const response = await axiosInstance.delete(`/post/shots/${id}`);
          
          if (response.status === 200) {
            setShots((prevShots) => prevShots.filter((shot) => shot._id !== id));
          } else {
          
            console.error('Delete failed');
          }
        } catch (error) {
          console.error('Error deleting shot:', error);
          
        }
      };
      const updateShot = async (id, updatedData) => {
        try {
          const response = await axiosInstance.put( `/post/shots/${id}`, updatedData,  );
      
          console.log('Backend update response:', response.data);
      
          if (response.status === 200) {
            setShots((prevShots) => {
              const updatedShots = prevShots.map((shot) =>
                shot._id === id ? response.data.shot : shot
              );
              console.log('Updated shots:', updatedShots);
              return updatedShots;
            });
            
          } else {
            console.error('Update failed');
          }
        } catch (error) {
          console.error('Error updating shot:', error.response?.data || error.message);
          throw error;
        }
      };

      useEffect(() => {
        let isMounted = true;
        
        const fetchAllShots = async () => {
          try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/post/shots`);
            if (isMounted) {
              setAllShots(response.data.shots);
            }
          } catch (error) {
            if (isMounted) {
              console.error('Error fetching all shots:', error);
            }
          }
        };
      
        fetchAllShots();
      
        return () => {
          isMounted = false;
        };
      }, []);
 const likeShot = async (shotId) => {
   
        try {
            const response = await axiosInstance.post(  `/post/shots/${shotId}/like`,   {},  );
    
            setShots(prevShots => 
                prevShots.map(shot => 
                    shot._id === shotId 
                        ? { ...shot, likes: [...shot.likes, authData.id] } 
                        : shot
                )
            );
    
            setAllShots(prevShots => 
                prevShots.map(shot => 
                    shot._id === shotId 
                        ? { ...shot, likes: [...shot.likes, authData.id] } 
                        : shot
                )
            );
    
            return response.data;
        } catch (error) {
            console.error('Error liking shot:', error);
            throw error;
        }
    };
    
    const unlikeShot = async (shotId) => {
      
  
      try {
          const response = await axiosInstance.delete( `/post/shots/${shotId}/like`,   );
  
          setShots(prevShots => 
              prevShots.map(shot => 
                  shot._id === shotId 
                      ? { ...shot, likes: shot.likes.filter(id => id !== authData.id) } 
                      : shot
              )
          );
  
          setAllShots(prevShots => 
              prevShots.map(shot => 
                  shot._id === shotId 
                      ? { ...shot, likes: shot.likes.filter(id => id !== authData.id) } 
                      : shot
              )
          );
  
          return response.data;
      } catch (error) {
          console.error('Error unliking shot:', error);
          throw error;
      }
  };
  
  const shotViews = async (shotId) => {
    try {
        const response = await axiosInstance.post(
            `/post/shots/${shotId}/views`, 
            {},  );
        return response.data;
    } catch (error) {
        console.error('Error updating shot views:', error);
        throw error;
    }
  }
    return (
        <ShotContext.Provider value={{ shots,loading,deleteShot,updateShot,allShots,likeShot,unlikeShot,shotViews}}>
          {children}
        </ShotContext.Provider>
      );
    };

 export default ShotProvider