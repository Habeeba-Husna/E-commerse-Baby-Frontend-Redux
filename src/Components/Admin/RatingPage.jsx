// import React, { useState, useContext } from 'react';
// import { Admincontext } from './AdminContext';
// import AdminNavbar from './AdminNavbar';

// function RatingPage() {
//     const { products } = useContext(Admincontext);
//     // Initialize state with an empty object to store ratings for each product by its ID
//     const [ratings, setRatings] = useState({});

//     const productRating = (productId, index) => {
//         setRatings((prevRatings) => ({
//             ...prevRatings,
//             [productId]: index, // Update the rating for the specific product
//         }));
//     };

//     return (
//         <div className="flex h-screen">
//           {/* Left Navbar */}
//           <div className="w-1/5 bg-gray-800 text-white h-full">
//             <AdminNavbar/>
//           </div>
    
//           {/* Right Content */}
//           <div className="w-4/5 p-8 bg-gray-100 overflow-y-auto">
//             <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">
//               Product Ratings
//             </h1>
    
//             {/* Ratings Section */}
//             {products.map((item) => (
//               <div
//                 key={item.id}
//                 className="bg-white p-6 rounded-lg shadow-lg mb-6 hover:shadow-xl transition-shadow"
//               >
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
//                   {/* Product Image */}
//                   <img
//                     src={item.url}
//                     alt={item.name}
//                     className="w-40 h-40 object-cover rounded-lg mx-auto mb-4 md:mb-0"
//                   />
    
//                   {/* Product Info */}
//                   <div className="col-span-2 text-center md:text-left">
//                     <p className="text-xl font-semibold text-gray-800">
//                       {item.name}
//                     </p>
//                     <p className="text-lg text-gray-600">${item.price}</p>
//                   </div>
    
//                   {/* Rating Section */}
//                   <div className="flex justify-center gap-2 mt-4 md:mt-0">
//                     {[1, 2, 3, 4, 5].map((rating) => (
//                       <div
//                         key={rating}
//                         onClick={() => productRating(item.id, rating)}
//                         className={`${
//                           ratings[item.id] >= rating
//                             ? "bg-yellow-400"
//                             : "bg-gray-300"
//                         } py-2 px-4 rounded-full cursor-pointer transition-all hover:bg-yellow-500`}
//                       >
//                         {rating}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       );
//     }
    
//     export default RatingPage;






import React, { useState, useContext } from 'react';
import { Admincontext } from './AdminContext';

function RatingPage() {
    const { products } = useContext(Admincontext);
    const [ratings, setRatings] = useState({});

    const productRating = (productId, index) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [productId]: index,
        }));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 pt-2">
            <h1 className="text-4xl font-bold text-center text-rose-500 mb-4">
                Product Ratings
            </h1>
            <div className="w-full mx-auto my-4 overflow-x-auto p-2 max-h-[calc(100vh-150px)] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                        {/* Product Image */}
                        <img
                            src={item.url}
                            alt={item.name}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />

                        {/* Product Info */}
                        <div className="text-center">
                            <p className="text-xl font-semibold text-gray-700">
                                {item.name}
                            </p>
                            <p className="text-lg text-gray-500 mb-4">
                                ${item.price}
                            </p>
                        </div>

                        {/* Rating Section */}
                        <div className="flex justify-center gap-2">
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <div
                                    key={rating}
                                    onClick={() => productRating(item.id, rating)}
                                    className={`${
                                        ratings[item.id] >= rating
                                            ? 'bg-yellow-400'
                                            : 'bg-gray-300'
                                    } w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-colors hover:bg-yellow-500`}
                                >
                                    {rating}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}

export default RatingPage;
