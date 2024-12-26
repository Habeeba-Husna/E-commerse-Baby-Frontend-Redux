import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch products from server
export const fetchProducts = createAsyncThunk('admin/fetchProducts', async () => {
  const response = await axios.get('http://localhost:5000/products');
  return response.data;
});

// Add a product
export const addProduct = createAsyncThunk('admin/addProduct', async (newProduct) => {
  const response = await axios.post('http://localhost:5000/products', newProduct);
  return response.data;
});
// Edit a product
export const editProduct = createAsyncThunk('admin/editProduct', async (updatedProduct) => {
  const response = await axios.put(`http://localhost:5000/products/${updatedProduct.id}`, updatedProduct);
  return response.data;
});

// Delete a product
export const deleteProduct = createAsyncThunk('admin/deleteProduct', async (id) => {
  await axios.delete(`http://localhost:5000/products/${id}`);
  return id;
});

// Fetch users from server
export const fetchUsers = createAsyncThunk('admin/fetchUsers', async () => {
  const response = await axios.get('http://localhost:5000/users');
  return response.data;
});


// Add a user
export const addUser = createAsyncThunk(
  'admin/addUser',
  async (newUser) => {
    const response = await axios.post('http://localhost:5000/users', newUser);
    return response.data;
  }
);

/// Block/Unblock user
export const blockUser = createAsyncThunk('admin/blockUser', async ({ userId, status }) => {
  const response = await axios.patch(`http://localhost:5000/users/${userId}`, { status: !status });
  return response.data;
});


const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    products: [],
    users: [],
    // ratings: {}, 
    status: 'idle',  // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Products cases
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload; // Update the product in the state
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
      })
      
      // Users cases
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = 'succeeded';
        state.users = action.payload;
      })

      
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        console.log('Updated user:', action.payload);
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload; // Update the user status in the state
        }
      })
     
  },
});

export default adminSlice.reducer;


