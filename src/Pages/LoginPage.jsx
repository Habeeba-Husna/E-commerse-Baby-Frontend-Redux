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
      
      console.log("API Response:", response.data); // Debugging step
      
      const user = response.data.user || response.data; 
      if (!user) {
        throw new Error("User data not found.");
      }
  
      dispatch(setUser(user));
  
      // Check if the user is an admin
      const userRole = user.isAdmin ? "admin" : "user"; 
      console.log(`User Role: ${userRole}`);
  
      // Navigate based on role
      console.log("Navigating to:", userRole === "admin" ? "/admin" : "/");
      navigate(userRole === "admin" ? "/admin" : "/");
  
      resetForm();
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
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


// import { useDispatch } from "react-redux"; 
// import { setUser } from "../features/authSlice";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { Link,useNavigate } from "react-router-dom";
// import axiosInstance from "../api/axiosInstance";
// import endPoints from "../api/endPoints";
// import { toast, ToastContainer } from "react-toastify";

// const Login = () => {
//   const dispatch = useDispatch(); 
//   const navigate = useNavigate();

//   const initialValues = {
//     email: "",
//     password: "",
//   };

//   const validationSchema = Yup.object({
//     email: Yup.string().email("Invalid email format").required("Email is required"),
//     password: Yup.string()
//       .min(6, "Password must be at least 6 characters")
//       .required("Password is required"),
//   });

//   const onSubmit = async (values, { resetForm }) => {
//     try {
//       const response = await axiosInstance.post(endPoints.AUTH.LOGIN, values);

//        // Dispatch user data to Redux store after successful login
//        dispatch(setUser(response.data.user));
//       console.log(response.data, "Login Response");

//       const userRole = response.data.user.isAdmin ? "admin" : "user";
//       console.log(userRole);

//       // Navigate to the appropriate route based on user role
//       navigate(userRole === "admin" ? "/admin" : "/");

//       resetForm();
//       toast.success(response.data.message);
      
//     } catch (error) {
//       console.error(error);
//       const errorMessage =
//         error.response?.data?.message || "Something went wrong. Please try again.";
//       toast.error(errorMessage);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
//         <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">Log in</h1>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={onSubmit}
//         >
//           <Form>
//             {/* Email field */}
//             <div className="mb-4">
//               <Field
//                 type="email"
//                 id="email"
//                 name="email"
//                 placeholder="Email"
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <ErrorMessage
//                 name="email"
//                 component="div"
//                 className="text-red-500 text-sm mt-1"
//               />
//             </div>

//             {/* Password field */}
//             <div className="mb-4">
//               <Field
//                 type="password"
//                 id="password"
//                 name="password"
//                 placeholder="Password"
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <ErrorMessage
//                 name="password"
//                 component="div"
//                 className="text-red-500 text-sm mt-1"
//               />
//             </div>

//             {/* Submit button */}
//             <div className="mb-4">
//               <button
//                 type="submit"
//                 className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 Login
//               </button>
//             </div>

//             {/* Register link */}
//             <div className="text-center mt-3">
//               <p className="text-sm text-gray-500">
//                 Don't have an account?{" "}
//                 <Link to="/register" className="text-blue-500 hover:text-blue-700">
//                   Register
//                 </Link>
//               </p>
//             </div>
//           </Form>
//         </Formik>
//         <ToastContainer />
//       </div>
//     </div>
//   );
// };

// export default Login;
