// import React, { useContext } from 'react';
// import { UserContext } from '../../Context/UserContext';
// import { useNavigate } from 'react-router-dom';

// const Wishlist = () => {
//     const { wishlist, removeFromWishlist } = useContext(UserContext);
//     const navigate = useNavigate();

//     return (
//         <div className="wishlist-container">
//             <h1>Your Wishlist</h1>
//             {wishlist.length === 0 ? (
//                 <p>Your wishlist is empty.</p>
//             ) : (
//                 <div className="wishlist-items">
//                     {wishlist.map((product) => (
//                         <div key={product.id} className="wishlist-item">
//                             <img src={product.url} alt={product.name} />
//                             <h2>{product.name}</h2>
//                             <p>₹ {product.price}</p>
//                             <button onClick={() => removeFromWishlist(product.id)}>Remove</button>
//                         </div>
//                     ))}
//                 </div>
//             )}
//             <button onClick={() => navigate('/productList')} className="shop-button">Shop Now</button>
//         </div>
//     );
// };

// export default Wishlist;
