import { useDispatch } from "react-redux"; 
import { setUser } from "../features/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link,useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import endPoints from "../api/endPoints";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await axiosInstance.post(endPoints.AUTH.LOGIN, values);

       // Dispatch user data to Redux store after successful login
       dispatch(setUser(response.data.user));
      console.log(response.data, "Login Response");

      const userRole = response.data.user.isAdmin ? "admin" : "user";
      console.log(userRole);

      // Navigate to the appropriate route based on user role
      navigate(userRole === "admin" ? "/admin" : "/");

      resetForm();
      toast.success(response.data.message);
      
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">Log in</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            {/* Email field */}
            <div className="mb-4">
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Password field */}
            <div className="mb-4">
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit button */}
            <div className="mb-4">
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Login
              </button>
            </div>

            {/* Register link */}
            <div className="text-center mt-3">
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-500 hover:text-blue-700">
                  Register
                </Link>
              </p>
            </div>
          </Form>
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;





// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import { FaEnvelope, FaLock } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import { useDispatch } from "react-redux";
// import axiosInstance from "../api/axiosInstance";
// import endPoints from "../api/endPoints";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const initialValues = {
//     email: "",
//     password: "",
//   };

//   const validationSchema = Yup.object({
//     email: Yup.string().email("Invalid email format").required("Email is required"),
//     password: Yup.string()
//       .required("Password is required")
//       .min(6, "Password must be at least 6 characters long"),
//   });

//   const handleLogin = async (values, { resetForm }) => {
//     try {
//       // Make an API request using axiosInstance and the LOGIN endpoint from endPoints
//       const response = await axiosInstance.post(endPoints.AUTH.LOGIN, {
//         email: values.email,
//         password: values.password,
//       });

//       const { token, user } = response.data;

//       if (!token) {
//         toast.error("Login failed. Token is missing.");
//         return;
//       }

//       // Save token and user data in axios instance or state, not localStorage
//       axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
//       dispatch({ type: "SET_USER", payload: user });  // Assuming you have a Redux action to set user details

//       toast.success("Login successful!");

//       // Fetch user details after login using the ME endpoint from endPoints
//       const userResponse = await axiosInstance.get(endPoints.AUTH.ME);

//       if (userResponse.status === 200) {
//         const currentUser = userResponse.data;
//         console.log("Current User:", currentUser);

//         // Redirect based on user role
//         const userRole = currentUser.isAdmin ? "admin" : "user";
//         navigate(userRole === "admin" ? "/admin" : "/");

//         resetForm();
//       } else {
//         toast.error("Failed to fetch user details.");
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//       toast.error("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
//       <h1 className="text-2xl font-bold mb-5 text-center text-gray-700">Login</h1>
//       <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
//         <Form className="space-y-4">
//           <div className="flex items-center border border-gray-300 p-3 rounded-lg bg-gray-100">
//             <FaEnvelope className="text-gray-500 text-xl" />
//             <Field
//               type="email"
//               placeholder="Email"
//               name="email"
//               className="border-none outline-none flex-1 pl-2 bg-transparent"
//             />
//           </div>
//           <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

//           <div className="flex items-center border border-gray-300 p-3 rounded-lg bg-gray-100">
//             <FaLock className="text-gray-500 text-xl" />
//             <Field
//               type="password"
//               placeholder="Password"
//               name="password"
//               className="border-none outline-none flex-1 pl-2 bg-transparent"
//             />
//           </div>
//           <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

//           <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
//             Login
//           </button>
//         </Form>
//       </Formik>

//       <div className="mt-4 text-center">
//         <p className="text-sm text-gray-500">
//           Don't have an account?{" "}
//           <button
//             onClick={() => navigate("/registration")}
//             className="text-blue-500 hover:text-blue-700">
//             Sign up
//           </button>
//         </p>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default LoginPage;





// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import { FaEnvelope, FaLock } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import { useDispatch } from "react-redux"; 
// import { loginUser,fetchUserDetails } from "../features/authSlice";
// import { setUser } from "../../features/authSlice";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const initialValues = {
//     email: "",
//     password: "",
//   };

//   const validationSchema = Yup.object({
//     email: Yup.string().email("Invalid email format").required("Email is required"),
//     password: Yup.string()
//       .required("Password is required")
//       .min(6, "Password must be at least 6 characters long"),
//   });

  
//   const handleLogin = async (values, { resetForm }) => {
//     try {
//       const result = await dispatch(loginUser(values));
//       console.log("🟢 Full Login Response:", JSON.stringify(result, null, 2));
  
//       if (loginUser.fulfilled.match(result)) {
//         const { token, user } = result.payload;
  
//         if (!token) {
//           toast.error("Token is missing. Login failed!");
//           return;
//         }
  
//         localStorage.setItem("token", token);
//         localStorage.setItem("user", JSON.stringify(user));
  
//         toast.success("Login successful!");
  
//         const userResponse = await dispatch(getCurrentUser());
//         console.log("🔍 Current User Response:", userResponse);
  
//         if (getCurrentUser.fulfilled.match(userResponse)) {
//           console.log("👤 User Data:", userResponse.payload);
//         } else {
//           console.error("⚠️ Fetching user failed:", userResponse);
//           toast.error("Failed to fetch user details.");
//           return;
//         }
  
//         const userRole = user.isAdmin ? "admin" : "user";
//         navigate(userRole === "admin" ? "/admin" : "/");
  
//         resetForm();
//       } else {
//         console.error("❌ Redux Rejected Login Response:", result);
//         toast.error(result.payload || "Login failed!");
//       }
//     } catch (error) {
//       console.error("🔥 Critical Login Error:", error);
//       toast.error("Something went wrong. Please try again.");
//     }
//   };
  
  
  
  
  

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
//       <h1 className="text-2xl font-bold mb-5 text-center text-gray-700">Login</h1>
//       <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
//         <Form className="space-y-4">
//           <div className="flex items-center border border-gray-300 p-3 rounded-lg bg-gray-100">
//             <FaEnvelope className="text-gray-500 text-xl" />
//             <Field
//               type="email"
//               placeholder="Email"
//               name="email"
//               className="border-none outline-none flex-1 pl-2 bg-transparent"
//             />
//           </div>
//           <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

//           <div className="flex items-center border border-gray-300 p-3 rounded-lg bg-gray-100">
//             <FaLock className="text-gray-500 text-xl" />
//             <Field
//               type="password"
//               placeholder="Password"
//               name="password"
//               className="border-none outline-none flex-1 pl-2 bg-transparent"
//             />
//           </div>
//           <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

//           <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
//             Login
//           </button>
//         </Form>
//       </Formik>
      
//       <div className="mt-4 text-center">
//         <p className="text-sm text-gray-500">
//           Don't have an account?{" "}
//           <button 
//             onClick={() => navigate("/registration")} 
//             className="text-blue-500 hover:text-blue-700">
//             Sign up
//           </button>
//         </p>
//       </div>
      
//       <ToastContainer />
//     </div>
//   );
// };

// export default LoginPage;







