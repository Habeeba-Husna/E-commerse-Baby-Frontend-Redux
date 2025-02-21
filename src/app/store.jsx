import { configureStore } from '@reduxjs/toolkit';
import productSlice from '../features/productSlice';
import adminSlice from '../features/adminSlice';
import cartSlice from '../features/cartSlice';
import favouriteSlice from '../features/favouriteSlice';
import orderSlice from '../features/orderSlice';
import authSlice from '../features/authSlice';

export default configureStore({
  reducer: {
    auth: authSlice, 
    product: productSlice,
    user: adminSlice,
    cart: cartSlice, 
    favourite:favouriteSlice,
    order:orderSlice,
  },
});



















// import { configureStore } from "@reduxjs/toolkit";
// import productSlice from '../features/productSlice'
// // import cartSlice from '../features/cartSlice'
// // import favouriteSlice from '../features/favouriteSlice'
// // import orderSlice from "../features/orderSlice"
// import adminSlice from "../features/adminSlice"
// import authSlice from '../features/authSlice';

// export default configureStore({
//     reducer:{
//         product:productSlice,
//         // cart: cartSlice,
//         // favorite:favouriteSlice,
//         // order:orderSlice,
//         user:adminSlice,
//         auth:authSlice
//     }
// })



// // import { configureStore } from '@reduxjs/toolkit';
// // import userReducer from './userSlice';
// // import productReducer from './productSlice';
// // import adminReducer from './adminSlice'

// // const store = configureStore({
// //   reducer: {
// //     user: userReducer,
// //     product: productReducer,
// //     admin: adminReducer,
// //   },
// // });

// // export default store;