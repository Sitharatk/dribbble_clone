import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

// eslint-disable-next-line react-refresh/only-export-components
export const ShotContext = createContext();

// eslint-disable-next-line react/prop-types
function ShotProvider({ children }) {
  const [shots, setShots] = useState([]);
    const [loading, setLoading] = useState(true);
    const { authData } = useContext(AuthContext);

    useEffect(() => {
        const fetchShots = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/post/shots`, {
              headers: {
                Authorization: `Bearer ${authData?.token}`,
              },
            });
       
            setShots(response.data.shots);
           
          } catch (error) {
            console.error("Error fetching shots:", error);
          } finally {
            setLoading(false);
          }
        };

        if (authData?.token) {
          fetchShots();
        } else {
          setLoading(false);
        }
      }, [authData]);

      const deleteShot = async (id) => {
        try {
          const response = await axios.delete(`http://localhost:3000/post/shots/${id}`, {
            headers: {
              Authorization: `Bearer ${authData?.token}`,
            },
          });
          
          if (response.status === 200) {
            setShots((prevShots) => prevShots.filter((shot) => shot._id !== id));
          } else {
            // Handle non-200 status
            console.error('Delete failed');
          }
        } catch (error) {
          console.error('Error deleting shot:', error);
          // Optionally show an error message to the user
        }
      };
      const updateShot = async (id, updatedData) => {
        try {
          const response = await axios.put(
            `http://localhost:3000/post/shots/${id}`, 
            updatedData, 
            {
              headers: {
                Authorization: `Bearer ${authData?.token}`,
                'Content-Type': 'multipart/form-data'
              },
            }
          );
      
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

    return (
        <ShotContext.Provider value={{ shots,loading,deleteShot,updateShot}}>
          {children}
        </ShotContext.Provider>
      );
    };

 export default ShotProvider