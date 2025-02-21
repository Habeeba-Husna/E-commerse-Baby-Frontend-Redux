import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import endPoints from "../api/endPoints";

//fetch products
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (
    { category = null, page = 1, search = null },
    { rejectWithValue }
  ) => {
    try {
      // console.log('Requesting products with:', { categories, page, search });
      const response = await axiosInstance.get(
        endPoints.PRODUCTS.GET_PRODUCTS,
        { params: { category, page, search } }
      );
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "error fetching products"
      );
    }
  }
);

//add products

export const addproduct = createAsyncThunk(
  "products/addproduct",
  async (newProduct, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(endPoints.PRODUCTS.ADD_PRODUCTS, newProduct, {
        headers: { "Content-Type": "multipart/form-data" }, // Ensure correct header for file uploads
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || "Error adding product");
    }
  }
);



//delete Product
export const deleteProduct=createAsyncThunk("products/deleteProduct",async(productId,{rejectWithValue})=>{
    try{
        await axiosInstance.delete(endPoints.PRODUCTS.DELETE_PRODUCT(productId))
        return productId
    }
    catch(error){
        return rejectWithValue(error.response?.data?.message ||error.message || "Error deleting product")
    }
})


//edit Product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (data, { rejectWithValue }) => {
    console.log(data)
    try {
      const response = await axiosInstance.patch(endPoints.PRODUCTS.EDIT_PRODUCT, data, {
        headers: { "Content-Type": "multipart/form-data" }, // Ensure correct header
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || "Error updating product");
    }
  }
);


const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    pagination: {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
    },
    category:[],
    loading: false,
    error: null,
  },
  reducers:{
    setCategory: (state, action) => {
        state.category = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      //fetch products
      .addCase(getAllProducts.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        // console.log('API Response:', action.payload);
        (state.loading = false),
        state.products = action.payload?.product || []; // Ensure `product` is not undefined
        state.pagination = action.payload?.pagination || {};
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      //add product
      .addCase(addproduct.pending,(state)=>{
        state.loading=true
        state.error=null
      })
      .addCase(addproduct.fulfilled,(state,action)=>{
        state.loading=false
        state.products.push(action.payload)
      })
      .addCase(addproduct.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
      })
      //delete
      .addCase(deleteProduct.pending,(state)=>{
        state.loading=true
        state.error=null
      })
      .addCase(deleteProduct.fulfilled,(state,action)=>{
        state.loading=false
        state.products=state.products.filter((product)=>product._id!==action.payload)
      })
      .addCase(deleteProduct.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
      })
      //update
      .addCase(updateProduct.pending,(state)=>{
        state.loading=true
        state.error=null
      })
      .addCase(updateProduct.fulfilled,(state,action)=>{
        state.loading=false
        state.products=state.products.map((product)=>product._id=== action.payload._id ? action.payload : product)
      })
      .addCase(updateProduct.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
      })
  },
});
export const { setCategory } = productSlice.actions;
export default productSlice.reducer;






// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '../api/axiosInstance';
// import endPoints from '../api/endPoints';

// // Fetch all products
// export const fetchProducts = createAsyncThunk(
//   'product/fetchProducts',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get(endPoints.PRODUCTS.GET_PRODUCTS);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Fetch single product
// export const fetchSingleProduct = createAsyncThunk(
//   'product/fetchSingleProduct',
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get(endPoints.PRODUCTS.GET_SINGLE_PRODUCT(id));
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Add new product (Admin)
// export const addProduct = createAsyncThunk(
//   'product/addProduct',
//   async (productData, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post(endPoints.PRODUCTS.ADD_PRODUCTS, productData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Edit product (Admin)
// export const editProduct = createAsyncThunk(
//   'product/editProduct',
//   async ({ id, productData }, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.put(endPoints.PRODUCTS.EDIT_PRODUCT, {
//         id,
//         ...productData,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Delete product (Admin)
// export const deleteProduct = createAsyncThunk(
//   'product/deleteProduct',
//   async (id, { rejectWithValue }) => {
//     try {
//       await axiosInstance.delete(endPoints.PRODUCTS.DELETE_PRODUCT(id));
//       return id; // Return deleted product ID
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// const productSlice = createSlice({
//   name: 'product',

//   initialState: {
//     products: [],
//     product: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch all products
//       .addCase(fetchProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         console.log("API Response:", action.payload); // Debugging log
//         state.products = Array.isArray(action.payload.products) ? action.payload.products : []; 
//         state.loading = false;
//       })
      

//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Fetch single product
//       .addCase(fetchSingleProduct.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchSingleProduct.fulfilled, (state, action) => {
//         state.product = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchSingleProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Add new product
//       .addCase(addProduct.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addProduct.fulfilled, (state, action) => {
//         state.products.push(action.payload);
//         state.loading = false;
//       })
//       .addCase(addProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Edit product
//       .addCase(editProduct.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(editProduct.fulfilled, (state, action) => {
//         const index = state.products.findIndex((p) => p.id === action.payload.id);
//         if (index !== -1) {
//           state.products[index] = action.payload;
//         }
//         state.loading = false;
//       })
//       .addCase(editProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Delete product
//       .addCase(deleteProduct.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteProduct.fulfilled, (state, action) => {
//         state.products = state.products.filter((p) => p.id !== action.payload);
//         state.loading = false;
//       })
//       .addCase(deleteProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default productSlice.reducer;






