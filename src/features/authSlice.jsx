import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../api/axiosInstance';
import endPoints from "../api/endPoints";

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  loading: false,
  error: null,
  user: null,
};

// Logout User
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post(endPoints.AUTH.LOGOUT);
      return;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);

// Login User
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post(
//         endPoints.AUTH.LOGIN,
//         userData,
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Error in login");
//     }
//   }
// );

// Logined User Details
export const fetchUserDetails = createAsyncThunk(
  "auth/fetchUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(endPoints.AUTH.ME);
      console.log("API Response:", response.data);
      return response.data.user;
    } catch (error) {
      console.error("Fetch User Error:", error.response?.data);
      if (error.response?.status === 401) {
        return rejectWithValue("Please login with your credentials");
      }
      return rejectWithValue(
        error.response?.data?.message || "Error in logged-in person"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state,action)=>{
      state.user=action.payload;
    },
    resetAuthState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Logout User
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.isAdmin = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch User Details
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = !!action.payload.role; // Check for any role
          state.isAdmin = action.payload.role === "admin";
        } else {
          state.isAuthenticated = false;
          state.isAdmin = false;
        }
      })
      
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
        state.isAdmin = false;
      });
  },
});

export const { resetAuthState,setUser } = authSlice.actions;

export default authSlice.reducer;










// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../api/axiosInstance";
// import endPoints from "../api/endPoints";

// // Load user from localStorage
// const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
// const storedToken = localStorage.getItem("token") || null;

// export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.post(endPoints.AUTH.LOGIN, userData);
//     const { token, user } = response.data;

//     if (!token) {
//       return rejectWithValue("Token is missing from response");
//     }

//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(user));

//     return { token, user };
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || "Login failed");
//   }
// });

// export const getCurrentUser = createAsyncThunk("auth/getCurrentUser", async (_, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.get(endPoints.AUTH.ME);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || "Failed to fetch user");
//   }
// });

// export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
//   try {
//     await axiosInstance.post(endPoints.AUTH.LOGOUT);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     return null;
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || "Logout failed");
//   }
// });

// const authSlice = createSlice({
//   name: "auth",
//   initialState: { user: storedUser, token: storedToken, isAuthenticated: !!storedUser },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.isAuthenticated = true;
//       })
//       .addCase(getCurrentUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.isAuthenticated = true;
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.user = null;
//         state.token = null;
//         state.isAuthenticated = false;
//       });
//   },
// });

// export default authSlice.reducer;










// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from '../api/axiosInstance';
// import endPoints from "../api/endPoints";
// import axios from "axios"; 


// // Load user from localStorage
// const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
// const storedToken = localStorage.getItem("token") || null;


// export const loginUser = createAsyncThunk("auth/loginUser",async (userData, { rejectWithValue }) => {
//     try {
//       // const response = await axios.post(endPoints.AUTH.LOGIN, userData);
//       const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

//       const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
//       console.log("API BASE URL:", API_BASE_URL);

      
//       console.log("🔍 Full Backend Response:", response); // Debugging step

//       const { token, user } = response.data;

//       if (!token) {
//         return rejectWithValue("Token is missing from response");
//       }

//       return { token, user }; // ✅ Return both token and user
//     } catch (error) {
//       console.log("❌ Login error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data?.message || "Login failed");
//     }
//   }
// );



// export const getCurrentUser = createAsyncThunk(
//   "auth/getCurrentUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) return rejectWithValue("No token found");

//       const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch user");
//     }
//   }
// );




// export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
//   try {
//       const token = localStorage.getItem("token"); // Get token from localStorage
//       if (!token) throw new Error("No token found"); // Handle case when no token is present

//       // Send request with Authorization header
//       await axiosInstance.post(endPoints.AUTH.LOGOUT, {}, {
//           headers: { Authorization: `Bearer ${token}` }
//       });

//       console.log("Logout successful");

//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//       return null;
//   } catch (error) {
//       console.error("Logout error:", error);
//       return rejectWithValue(error.response?.data?.message || "Logout failed");
//   }
// });



// // Auth Slice
// const authSlice = createSlice({
//   name: "auth",
//   // initialState: { user: storedUser, token: storedToken, isAuthenticated: !!storedUser },
//   initialState: { user: null, token: null, isAuthenticated: false },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // .addCase(loginUser.fulfilled, (state, action) => {
//       //   state.user = action.payload;
//       //   state.token = localStorage.getItem("token");
//       //   state.isAuthenticated = true;
//       // })

//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.token = action.payload.token;  // ✅ Fix: Store token from payload
//         state.isAuthenticated = true;
//         localStorage.setItem("token", action.payload.token); // ✅ Ensure token is saved
//       })
      
//       .addCase(getCurrentUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.isAuthenticated = true;
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.user = null;
//         state.token = null;
//         state.isAuthenticated = false;
//       });
//   },
// });

// export default authSlice.reducer;









