import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Use the BASE_URL from .env
  withCredentials: true,
  timeout: 30000,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Handle 401 errors for expired tokens
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await axiosInstance.post("/refreshtoken");

                // Retry the original request after refreshing the token
                isRefreshing = false;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                isRefreshing = false;
                processQueue(refreshError, null);

                // Redirect to login if refresh fails
                if (refreshError.response?.status === 401) {
                    window.location.href = "/login";
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;



// import axios from "axios";

// console.log("VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL); 

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   timeout: 5000,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true, 
// });


// // Automatically set the token if available
// const token = localStorage.getItem("token");
// console.log('Token:', token);

// if (token) {
//   axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// } else {
//     console.error("No token found in localStorage");

// }


// // Handle token refresh
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//     failedQueue.forEach((prom) => {
//         if (error) {
//             prom.reject(error);
//         } else {
//             prom.resolve(token);
//         }
//     });
//     failedQueue = [];
// };


// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const originalRequest = error.config;
  
//       // If token is expired or invalid, and retry hasn't been attempted yet
//       if (error.response?.status === 401 && !originalRequest._retry) {
//         if (isRefreshing) {
//           return new Promise((resolve, reject) => {
//             failedQueue.push({ resolve, reject });
//           });
//         }
  
//         originalRequest._retry = true;
//         isRefreshing = true;
  
//         try {
//           // Attempt to refresh the token using the refresh token
//           const refreshToken = localStorage.getItem("refreshToken");
//           if (refreshToken) {
//             const refreshResponse = await axiosInstance.post(endPoints.AUTH.REFRESH, {
//               refreshToken,
//             });
  
//             const newToken = refreshResponse.data.token;
//             localStorage.setItem("token", newToken); // Store the new access token
  
//             axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
  
//             // Process queued requests with the new token
//             processQueue(null, newToken);
//             isRefreshing = false;
  
//             // Retry the original request with the new token
//             originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
//             return axiosInstance(originalRequest);
//           }
//         } catch (refreshError) {
//           isRefreshing = false;
//           processQueue(refreshError, null);
  
//           // If token refresh fails, remove the token and log the user out
//           if (refreshError.response?.status === 401 || refreshError.response?.status === 403) {
//             localStorage.removeItem("token");
//             localStorage.removeItem("user");
//             window.location.href = "/login"; // Redirect to login
//           }
  
//           return Promise.reject(refreshError);
//         }
//       }
  
//       return Promise.reject(error);
//     }
//   );
  
//   export default axiosInstance;




  // axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         // Handle 401 errors for expired tokens
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             if (isRefreshing) {
//                 return new Promise((resolve, reject) => {
//                     failedQueue.push({ resolve, reject });
//                 });
//             }

//             originalRequest._retry = true;
//             isRefreshing = true;

//             try {
//                 await axiosInstance.post("/auth/refresh-token");

//                 // Retry the original request after refreshing the token
//                 isRefreshing = false;
//                 return axiosInstance(originalRequest);
//             } catch (refreshError) {
//                 isRefreshing = false;
//                 processQueue(refreshError, null);

//                 // Redirect to login if refresh fails
//                 if (refreshError.response?.status === 401) {
//                     window.location.href = "/login";
//                 }
//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;