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
const [allShots, setAllShots] = useState([]);


    useEffect(() => {
      const fetchShots = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/post/shots/${authData?.id}`, {
            headers: {
              Authorization: `Bearer ${authData?.token}`, // Send token for authorization
            },
          });
          setShots(response.data.shots); // Store the fetched posts
        } catch (error) {
          console.error("Error fetching shots:", error);
        } finally {
          setLoading(false);
        }
      };
    
      if (authData?.id) {
        fetchShots(); // Fetch posts for the specific user
      } else {
        setLoading(false);
      }
    }, [authData]); // Re-run when authData changes
    
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

      useEffect(() => {
        const fetchAllShots = async () => {
          try {
            const response = await axios.get('http://localhost:3000/post/shots');
            setAllShots(response.data.shots);
            console.log('Fetched all shots:', response.data);
          } catch (error) {
            console.error('Error fetching all shots:', error);
          }
        };
    
        fetchAllShots();
      }, []);

    return (
        <ShotContext.Provider value={{ shots,loading,deleteShot,updateShot,allShots}}>
          {children}
        </ShotContext.Provider>
      );
    };

 export default ShotProvider