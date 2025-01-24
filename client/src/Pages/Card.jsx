// import React from 'react'

// // eslint-disable-next-line react/prop-types
// function Card({shot}) {
//   return (
//     <div><div className="flex flex-col">
//     {/* Image Container */}
//     <div className="group relative bg-white rounded-lg shadow-md overflow-hidden">
//       <div className="relative">
//         <img
//           // eslint-disable-next-line react/prop-types
//           src={shot.image}
//           // eslint-disable-next-line react/prop-types
//           alt={shot.title}
//           className="w-full h-64 object-cover"
//         />

//         {/* Hover overlay with name and like */}
//         <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
//           <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//             {/* Title */}
//             <h3 className="text-lg font-semibold text-white">{shot.title}</h3>

//             {/* Like button */}
//             <button className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors duration-200">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 text-white"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Stats Container */}
//     <div className="flex items-center justify-between bg-white rounded-lg p-3">
//       <div className="flex items-center ml-72 space-x-2 text-gray-500">
//         <div className="flex items-center space-x-1">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//           >
//             <path
//               fillRule="evenodd"
//               d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
//               clipRule="evenodd"
//             />
//           </svg>
//           <span>{shot.comments?.length || 0}</span>
//         </div>
//         <div className="flex items-center space-x-1">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//           >
//             <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//             <path
//               fillRule="evenodd"
//               d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
//               clipRule="evenodd"
//             />
//           </svg>
//           <span>{shot.views}</span>
//         </div>
//       </div>

//       {/* Tags */}
//       {shot.tags && shot.tags.length > 0 && (
//         <div className="flex flex-wrap gap-2">
//           {shot.tags.map((tag, index) => (
//             <span
//               key={index}
//               className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
//             >
//               {tag}
//             </span>
//           ))}
//         </div>
//       )}
//     </div>
//   </div></div>
//   )
// }

// export default Card
