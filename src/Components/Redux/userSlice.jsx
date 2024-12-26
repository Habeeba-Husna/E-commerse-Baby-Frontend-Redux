import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

export const fetchUserCart = createAsyncThunk(
  'user/fetchUserCart',
  async (userId, { rejectWithValue }) => {
try {
  const response = await axios.get(`http://localhost:5000/users/${userId}`);
  return response.data;
} catch (error) {
  if (error.response?.status === 404) {
    toast.error('User not found. Please log in again.');
  } else {
    toast.error('Error fetching cart.');
  }
  return rejectWithValue(error.message);
}
}
);

// Add item to wishlist
export const addToWishlist = createAsyncThunk(
  'user/addToWishlist',
  async ({ userId, product }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/users/${userId}`);
      const updatedWishlist = data.wishlist ? [...data.wishlist, product] : [product];

      await axios.patch(`http://localhost:5000/users/${userId}`, { wishlist: updatedWishlist });
      return updatedWishlist;
    } catch (error) {
      toast.error('Error adding item to wishlist.');
      return rejectWithValue(error.message);
    }
  }
);

// Remove item from wishlist
export const removeFromWishlist = createAsyncThunk(
  'user/removeFromWishlist',
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/users/${userId}`);
      const updatedWishlist = data.wishlist.filter(item => item.id !== productId);

      await axios.patch(`http://localhost:5000/users/${userId}`, { wishlist: updatedWishlist });
      return updatedWishlist;
    } catch (error) {
      toast.error('Error removing item from wishlist.');
      return rejectWithValue(error.message);
    }
  }
);
// Increment item quantity (compatible with json-server)
export const incrementQuantity = createAsyncThunk(
  'user/incrementQuantity',
  async ({ userId, cartItemId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/users/${userId}`);
      const cartItem = data.cart.find((item) => item.id === cartItemId);

      if (!cartItem) {
        throw new Error('Item not found in cart');
      }

      const updatedCartItem = { ...cartItem, quantity: cartItem.quantity + 1 };
      const updatedCart = data.cart.map((item) =>
        item.id === cartItemId ? updatedCartItem : item
      );

      await axios.patch(`http://localhost:5000/users/${userId}`, { cart: updatedCart });
      return updatedCart;
    } catch (error) {
      toast.error('Error incrementing quantity.');
      return rejectWithValue(error.message);
    }
  }
);

// Decrement item quantity (compatible with json-server)
export const decrementQuantity = createAsyncThunk(
  'user/decrementQuantity',
  async ({ userId, cartItemId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/users/${userId}`);
      const cartItem = data.cart.find((item) => item.id === cartItemId);

      if (!cartItem || cartItem.quantity <= 1) {
        throw new Error('Cannot decrement quantity below 1');
      }

      const updatedCartItem = { ...cartItem, quantity: cartItem.quantity - 1 };
      const updatedCart = data.cart.map((item) =>
        item.id === cartItemId ? updatedCartItem : item
      );

      await axios.patch(`http://localhost:5000/users/${userId}`, { cart: updatedCart });
      return updatedCart;
    } catch (error) {
      toast.error('Error decrementing quantity.');
      return rejectWithValue(error.message);
    }
  }
);

// Add item to cart
export const addToCart = createAsyncThunk(
  'user/addToCart',
  async ({ userId, newItem }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/users/${userId}`);
      console.log(data);
      
      const cartItem = data.cart.find((item) => item.id === newItem.id);

      let updatedCart;
      if (cartItem) {
        updatedCart = data.cart.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...data.cart, { ...newItem, quantity: 1 }];
      }

      await axios.patch(`http://localhost:5000/users/${userId}`, { cart: updatedCart });
      return updatedCart;
    } catch (error) {
      toast.error('Error adding item to cart.');
      return rejectWithValue(error.message);
    }
  }
);

// Remove item from cart
export const removeFromCart = createAsyncThunk(
  'user/removeFromCart',
  async ({ userId, cartItemId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/users/${userId}`);
      const updatedCart = data.cart.filter((item) => item.id !== cartItemId);

      await axios.patch(`http://localhost:5000/users/${userId}`, { cart: updatedCart });
      return updatedCart;
    } catch (error) {
      toast.error('Error removing item from cart.');
      return rejectWithValue(error.message);
    }
  }
);

export const clearAllOrders = createAsyncThunk(
    'user/clearAllOrders',
    async (id) => {
      await axios.patch(`http://localhost:5000/users/${id}`, { order: [] });
      return [];
    }
  );

  export const removeOrder = createAsyncThunk(
    'user/removeOrder',
    async ({ id, orderIndex, orders }) => {
      const updatedOrders = orders.filter((_, index) => index !== orderIndex);
      await axios.patch(`http://localhost:5000/users/${id}`, { order: updatedOrders });
      return updatedOrders;
    }
  );


// Fetch user orders
export const fetchUserOrder = createAsyncThunk(
    'user/fetchUserOrder',
    async (userId, { rejectWithValue }) => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${userId}`);
        return response.data.order || [];
      } catch (error) {
        toast.error('Error fetching orders.');
        return rejectWithValue(error.message);
      }
    }
  );

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: localStorage.getItem('id') || null,
    userName: '',
    email: '',
    phone: '',
    cart: [],
    order: [],
    wishlist: [],
    status: false,
    isLoggedIn: false,
    ratings: {},
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    updateRating: (state, action) => {
      const { productId, rating } = action.payload;
      state.ratings[productId] = rating;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.cart = action.payload.cart || [];
        state.order = action.payload.order || [];
      })
      
      .addCase(fetchUserCart.rejected, (state, action) => {
        toast.error(`Failed to fetch cart: ${action.payload}`);
      })
      
      .addCase(fetchUserOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        toast.success('Orders fetched successfully.');
      })
      .addCase(fetchUserOrder.rejected, () => {
        toast.error('Error fetching orders.');
      })
      .addCase(incrementQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
        toast.success('Quantity incremented successfully');
      })
      .addCase(decrementQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
        toast.success('Quantity decremented successfully');
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        toast.success('Item added to cart');
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        toast.success('Item removed from cart');
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
        toast.success('Item added to wishlist');
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
        toast.success('Item removed from wishlist');
      })
      .addCase(addToWishlist.rejected, () => {
        toast.error('Failed to add item to wishlist.');
      })
      .addCase(removeFromWishlist.rejected, () => {
        toast.error('Failed to remove item from wishlist.');
      })
      .addCase(incrementQuantity.rejected, () => {
        toast.error('Failed to increment quantity.');
      })
      .addCase(decrementQuantity.rejected, () => {
        toast.error('Failed to decrement quantity.');
      })
      .addCase(addToCart.rejected, () => {
        toast.error('Failed to add item to cart.');
      })
      .addCase(removeFromCart.rejected, () => {
        toast.error('Failed to remove item from cart.');
      });
  },
});

export const { setIsLoggedIn, setCart, setOrder, updateRating } = userSlice.actions;

export default userSlice.reducer;



// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// export const fetchUserCart = createAsyncThunk(
//   'user/fetchUserCart',
//   async (userId, { rejectWithValue }) => {
// try {
//   const response = await axios.get(`http://localhost:5000/users/${userId}`);
//   return response.data;
// } catch (error) {
//   if (error.response?.status === 404) {
//     toast.error('User not found. Please log in again.');
//   } else {
//     toast.error('Error fetching cart.');
//   }
//   return rejectWithValue(error.message);
// }
// }
// );


// // Increment item quantity (compatible with json-server)
// export const incrementQuantity = createAsyncThunk(
//   'user/incrementQuantity',
//   async ({ userId, cartItemId }, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get(`http://localhost:5000/users/${userId}`);
//       const cartItem = data.cart.find((item) => item.id === cartItemId);

//       if (!cartItem) {
//         throw new Error('Item not found in cart');
//       }

//       const updatedCartItem = { ...cartItem, quantity: cartItem.quantity + 1 };
//       const updatedCart = data.cart.map((item) =>
//         item.id === cartItemId ? updatedCartItem : item
//       );

//       await axios.patch(`http://localhost:5000/users/${userId}`, { cart: updatedCart });
//       return updatedCart;
//     } catch (error) {
//       toast.error('Error incrementing quantity.');
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Decrement item quantity (compatible with json-server)
// export const decrementQuantity = createAsyncThunk(
//   'user/decrementQuantity',
//   async ({ userId, cartItemId }, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get(`http://localhost:5000/users/${userId}`);
//       const cartItem = data.cart.find((item) => item.id === cartItemId);

//       if (!cartItem || cartItem.quantity <= 1) {
//         throw new Error('Cannot decrement quantity below 1');
//       }

//       const updatedCartItem = { ...cartItem, quantity: cartItem.quantity - 1 };
//       const updatedCart = data.cart.map((item) =>
//         item.id === cartItemId ? updatedCartItem : item
//       );

//       await axios.patch(`http://localhost:5000/users/${userId}`, { cart: updatedCart });
//       return updatedCart;
//     } catch (error) {
//       toast.error('Error decrementing quantity.');
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Add item to cart
// export const addToCart = createAsyncThunk(
//   'user/addToCart',
//   async ({ userId, newItem }, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get(`http://localhost:5000/users/${userId}`);
//       console.log(data);
      
//       const cartItem = data.cart.find((item) => item.id === newItem.id);

//       let updatedCart;
//       if (cartItem) {
//         updatedCart = data.cart.map((item) =>
//           item.id === newItem.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         updatedCart = [...data.cart, { ...newItem, quantity: 1 }];
//       }

//       await axios.patch(`http://localhost:5000/users/${userId}`, { cart: updatedCart });
//       return updatedCart;
//     } catch (error) {
//       toast.error('Error adding item to cart.');
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Remove item from cart
// export const removeFromCart = createAsyncThunk(
//   'user/removeFromCart',
//   async ({ userId, cartItemId }, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get(`http://localhost:5000/users/${userId}`);
//       const updatedCart = data.cart.filter((item) => item.id !== cartItemId);

//       await axios.patch(`http://localhost:5000/users/${userId}`, { cart: updatedCart });
//       return updatedCart;
//     } catch (error) {
//       toast.error('Error removing item from cart.');
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const clearAllOrders = createAsyncThunk(
//     'user/clearAllOrders',
//     async (id) => {
//       await axios.patch(`http://localhost:5000/users/${id}`, { order: [] });
//       return [];
//     }
//   );

//   export const removeOrder = createAsyncThunk(
//     'user/removeOrder',
//     async ({ id, orderIndex, orders }) => {
//       const updatedOrders = orders.filter((_, index) => index !== orderIndex);
//       await axios.patch(`http://localhost:5000/users/${id}`, { order: updatedOrders });
//       return updatedOrders;
//     }
//   );


// // Fetch user orders
// export const fetchUserOrder = createAsyncThunk(
//     'user/fetchUserOrder',
//     async (userId, { rejectWithValue }) => {
//       try {
//         const response = await axios.get(`http://localhost:5000/users/${userId}`);
//         return response.data.order || [];
//       } catch (error) {
//         toast.error('Error fetching orders.');
//         return rejectWithValue(error.message);
//       }
//     }
//   );

// const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     id: localStorage.getItem('id') || null,
//     userName: '',
//     email: '',
//     phone: '',
//     cart: [],
//     order: [],
//     wishlist: [],
//     status: false,
//     isLoggedIn: false,
//     ratings: {},
//   },
//   reducers: {
//     setIsLoggedIn: (state, action) => {
//       state.isLoggedIn = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserCart.fulfilled, (state, action) => {
//         state.cart = action.payload.cart || [];
//         state.order = action.payload.order || [];
//       })
      
//       .addCase(fetchUserCart.rejected, (state, action) => {
//         toast.error(`Failed to fetch cart: ${action.payload}`);
//       })
      
//       .addCase(fetchUserOrder.fulfilled, (state, action) => {
//         state.order = action.payload;
//         toast.success('Orders fetched successfully.');
//       })
//       .addCase(fetchUserOrder.rejected, () => {
//         toast.error('Error fetching orders.');
//       })
//       .addCase(incrementQuantity.fulfilled, (state, action) => {
//         state.cart = action.payload;
//         toast.success('Quantity incremented successfully');
//       })
//       .addCase(decrementQuantity.fulfilled, (state, action) => {
//         state.cart = action.payload;
//         toast.success('Quantity decremented successfully');
//       })
//       .addCase(addToCart.fulfilled, (state, action) => {
//         state.cart = action.payload;
//         toast.success('Item added to cart');
//       })
//       .addCase(removeFromCart.fulfilled, (state, action) => {
//         state.cart = action.payload;
//         toast.success('Item removed from cart');
//       })
//       .addCase(incrementQuantity.rejected, () => {
//         toast.error('Failed to increment quantity.');
//       })
//       .addCase(decrementQuantity.rejected, () => {
//         toast.error('Failed to decrement quantity.');
//       })
//       .addCase(addToCart.rejected, () => {
//         toast.error('Failed to add item to cart.');
//       })
//       .addCase(removeFromCart.rejected, () => {
//         toast.error('Failed to remove item from cart.');
//       });
//   },
// });

// export const { setIsLoggedIn, setCart, setOrder } = userSlice.actions;

// export default userSlice.reducer;
