// import { createContext, useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from './AuthContext';

// // eslint-disable-next-line react-refresh/only-export-components
// export const ShotContext = createContext();

// function ShotProvider({ children }) {
//     // const { authData } = useContext(AuthContext);
    
//     // const [shots, setShots] = useState([]);
//     // const [loading, setLoading] = useState(true);

//     // useEffect(() => {
//     //     const fetchShots = async () => {
//     //       try {
//     //         const response = await axios.get(`http://localhost:3000/auth/shots`, {
//     //           headers: {
//     //             Authorization: `Bearer ${authData?.token}`,
//     //           },
//     //         });
//     //         setShots(response.data.shots);
//     //       } catch (error) {
//     //         console.error("Error fetching shots:", error);
//     //       } finally {
//     //         setLoading(false);
//     //       }
//     //     };
    
//     //     if (authData?.token) {
//     //       fetchShots();
//     //     } else {
//     //       setLoading(false);
//     //     }
//     //   }, [authData]);
//     return (
//         <ShotContext.Provider value={{ }}>
//           {children}
//         </ShotContext.Provider>
//       );
//     };

//  export default ShotProvider