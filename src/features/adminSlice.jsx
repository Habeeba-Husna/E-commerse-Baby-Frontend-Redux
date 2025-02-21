import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import endPoints from "../api/endPoints";

//get all users
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async ({ page }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(endPoints.USER.GET_ALL_USER, {
        params: { page: page || 1 },
      });
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching all users"
      );
    }
  }
);

//fetch user by ID
export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        endPoints.USER.GET_SINGLE_USER(id)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error get single users"
      );
    }
  }
);

//Block or Unblock user

export const blockUser = createAsyncThunk(
  "users/blockUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(endPoints.USER.BLOCK_USER(id));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error blocking/unblocking user"
      );
    }
  }
);

export const getUserOrder = createAsyncThunk(
  "order/getUserOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        endPoints.USER.GET_SINGLE_USER_ORDER(id)
      );
      console.log(response.data);
      return response.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching cart"
      );
    }
  }
);

export const totalRevenue = createAsyncThunk(
  "users/totalRevenue",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(endPoints.ADMIN.SALE_PRICE);
      console.log(response.data, 'hello revenue');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching total revenue"
      );
    }
  }
);

const adminSlice = createSlice({
  name: "users",
  initialState: {
    // user: null,
    user: [],
    loading: false,
    error: null,
    totalUsers: 0,
    totalPages: 0,
    currentPage: 1,
    userOrder: [],
    totalRevenues: 0,
    allOrderList: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.users;
        state.totalUsers = action.payload.totalUsers;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage || 1;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(blockUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = state.user.map((u) =>
          u._id === action.payload._id
            ? { ...u, isBlock: action.payload.isBlock }
            : u
        );
        state.error = null;
      })

      .addCase(blockUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOrder.fulfilled, (state, action) => {
        state.userOrder = action.payload.orders;
        console.log(state.userOrder);
        state.loading = false;
        state.pagination = action.payload.pagination;
      })
      .addCase(getUserOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(totalRevenue.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.totalRevenues = action.payload.total;
        (state.totalRevenues)
        console.log(state.totalRevenues);
      })
  },
});
export default adminSlice.reducer;








// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Fetch products from server
// export const fetchProducts = createAsyncThunk('admin/fetchProducts', async () => {
//   const response = await axios.get('http://localhost:5000/products');
//   return response.data;
// });

// // Add a product
// export const addProduct = createAsyncThunk('admin/addProduct', async (newProduct) => {
//   const response = await axios.post('http://localhost:5000/products', newProduct);
//   return response.data;
// });
// // Edit a product
// export const editProduct = createAsyncThunk('admin/editProduct', async (updatedProduct) => {
//   const response = await axios.put(`http://localhost:5000/products/${updatedProduct.id}`, updatedProduct);
//   return response.data;
// });

// // Delete a product
// export const deleteProduct = createAsyncThunk('admin/deleteProduct', async (id) => {
//   await axios.delete(`http://localhost:5000/products/${id}`);
//   return id;
// });

// // Fetch users from server
// export const fetchUsers = createAsyncThunk('admin/fetchUsers', async () => {
//   const response = await axios.get('http://localhost:5000/users');
//   return response.data;
// });


// // Add a user
// export const addUser = createAsyncThunk(
//   'admin/addUser',
//   async (newUser) => {
//     const response = await axios.post('http://localhost:5000/users', newUser);
//     return response.data;
//   }
// );

// /// Block/Unblock user
// export const blockUser = createAsyncThunk('admin/blockUser', async ({ userId, status }) => {
//   const response = await axios.patch(`http://localhost:5000/users/${userId}`, { status: !status });
//   return response.data;
// });


// const adminSlice = createSlice({
//   name: 'admin',
//   initialState: {
//     products: [],
//     users: [],
//     // ratings: {}, 
//     status: 'idle',  // idle, loading, succeeded, failed
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Products cases
//       .addCase(fetchProducts.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.products = action.payload;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(addProduct.fulfilled, (state, action) => {
//         state.products.push(action.payload);
//       })
//       .addCase(editProduct.fulfilled, (state, action) => {
//         const index = state.products.findIndex((product) => product.id === action.payload.id);
//         if (index !== -1) {
//           state.products[index] = action.payload; // Update the product in the state
//         }
//       })
//       .addCase(deleteProduct.fulfilled, (state, action) => {
//         state.products = state.products.filter((product) => product.id !== action.payload);
//       })
      
//       // Users cases
//       .addCase(fetchUsers.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         console.log(action.payload);
//         state.status = 'succeeded';
//         state.users = action.payload;
//       })

      
//       .addCase(fetchUsers.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(addUser.fulfilled, (state, action) => {
//         state.users.push(action.payload);
//       })
//       .addCase(blockUser.fulfilled, (state, action) => {
//         console.log('Updated user:', action.payload);
//         const index = state.users.findIndex((user) => user.id === action.payload.id);
//         if (index !== -1) {
//           state.users[index] = action.payload; // Update the user status in the state
//         }
//       })
     
//   },
// });

// export default adminSlice.reducer;


