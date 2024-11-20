// import React, { useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const [isLogin, setIsLogin] = useState(true); // Tracks whether on login or registration page
//     const navigate = useNavigate();

//     const loginInitialValues = { 
//         email: '',
//         password: '' };

//     const registrationInitialValues = { 
//         userName: '', 
//         email: '', 
//         password: '', 
//         confirmPassword: '', 
//         phone: '', 
//         cart:[], 
//         order:[] };

//     const loginValidationSchema = Yup.object({
//         email: Yup.string().email('Invalid email format').required('Required'),
//         password: Yup.string().required('Required')
//     });

//     const registrationValidationSchema = Yup.object({
//         userName: Yup.string().required("Username is required"),
//         email: Yup.string().email("Invalid email format").required("Email is required"),
//         password: Yup.string().required("Password is required"),
//         confirmPassword: Yup.string()
//             .oneOf([Yup.ref('password'), ''], 'Passwords must match')
//             .required("Please confirm your password"),
//         phone: Yup.string().required("Required")
//     });

//     const handleFormSubmit = async (values, { resetForm }) => {
//         if (isLogin) {
//             // Login logic
//             try {
//                 const response = await axios.get('http://localhost:5000/users');
//                 const user = response.data.find(user => user.email === values.email);
//                 if (user && user.password === values.password) {
//                     toast.success("Login successful");
//                     localStorage.setItem("id", user.id);
//                     resetForm();
//                     navigate('/');
//                     localStorage.setItem("id",user.id)
//                     localStorage.setItem("name",user.userName)
//                 }
                
//                 else {
//                     toast.error("Invalid email or password");
//                 }
//             } catch (error) {
//                 console.error(error.message);
//                 toast.error("An error occurred during login. Please try again.");
//             }
//         } else {
//             // Registration logic
//             try {
//                 await axios.post('http://localhost:5000/users', values);
//                 toast.success("Registration successful");
//                 resetForm();
//                 setIsLogin(true);
//             } catch (error) {
//                 console.error(error.message);
//                 toast.error("Registration failed. Please try again.");
//             }
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//             <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
//                 <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
//                     {isLogin ? 'Login' : 'Registration'}
//                 </h2>

//                 <div className="flex justify-center mb-6 space-x-4">
//                     <button
//                         onClick={() => setIsLogin(true)}
//                         className={`py-2 px-4 rounded ${isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
//                     >
//                         Login
//                     </button>
//                     <button
//                         onClick={() => setIsLogin(false)}
//                         className={`py-2 px-4 rounded ${!isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
//                     >
//                         Registration
//                     </button>
//                 </div>

//                 <Formik
//                     initialValues={isLogin ? loginInitialValues : registrationInitialValues}
//                     validationSchema={isLogin ? loginValidationSchema : registrationValidationSchema}
//                     onSubmit={handleFormSubmit}
//                     enableReinitialize // Allows reinitializing form on isLogin change resets the form when isLogin changes.
//                 >
//                     <Form className="space-y-4">
//                         {!isLogin && (
//                             <div className="form-control">
//                                 <label htmlFor="userName" className="text-gray-600">Username</label>
//                                 <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
//                                     <FaUser className="text-gray-500 mr-2" />
//                                     <Field type="text" id="userName" name="userName" className="flex-1 bg-transparent outline-none" />
//                                 </div>
//                                 <ErrorMessage name="userName" component="div" className="text-red-500 text-sm" />
//                             </div>
//                         )}

//                         <div className="form-control">
//                             <label htmlFor="email" className="text-gray-600">E-mail</label>
//                             <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
//                                 <FaEnvelope className="text-gray-500 mr-2" />
//                                 <Field type="email" id="email" name="email" className="flex-1 bg-transparent outline-none" />
//                             </div>
//                             <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
//                         </div>

//                         <div className="form-control">
//                             <label htmlFor="password" className="text-gray-600">Password</label>
//                             <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
//                                 <FaLock className="text-gray-500 mr-2" />
//                                 <Field type="password" id="password" name="password" className="flex-1 bg-transparent outline-none" />
//                             </div>
//                             <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
//                         </div>

//                         {!isLogin && (
//                             <>
//                                 <div className="form-control">
//                                     <label htmlFor="confirmPassword" className="text-gray-600">Confirm Password</label>
//                                     <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
//                                         <FaLock className="text-gray-500 mr-2" />
//                                         <Field type="password" id="confirmPassword" name="confirmPassword" className="flex-1 bg-transparent outline-none" />
//                                     </div>
//                                     <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
//                                 </div>

//                                 <div className="form-control">
//                                     <label htmlFor="phone" className="text-gray-600">Phone Number</label>
//                                     <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
//                                         <FaPhone className="text-gray-500 mr-2" />
//                                         <Field type="text" id="phone" name="phone" className="flex-1 bg-transparent outline-none" />
//                                     </div>
//                                     <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
//                                 </div>
//                             </>
//                         )}

//                         <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//                             {isLogin ? 'Login' : 'Register'}
//                         </button>
//                     </Form>
//                 </Formik>

//                 <ToastContainer />
//             </div>
//         </div>
//     );
// };

// export default Login;




// import React, { useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
// // import { MdEmail } from "react-icons/md";
// // import { RiLockPasswordFill } from "react-icons/ri";
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const [isLogin, setIsLogin] = useState(true);
//     const navigate=useNavigate();
//     const loginInitialValues = {
//         email: '',
//         password: ''
//     };

//     const loginValidationSchema = Yup.object({
//         email: Yup.string().email('Invalid email format').required('Required'),
//         password: Yup.string().required('Required')
//     });

//     const registrationInitialValues = {
//         userName: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//         phone: '',
//         // cart:[],
//         // order:[]
//     };

//     const registrationValidationSchema = Yup.object({
//         userName: Yup.string().required("Username is required"),
//         email: Yup.string().email("Invalid email format").required("Email is required"),
//         password: Yup.string()
//             .required("Password is required"),
//             // .min(8, "Password must be at least 8 characters")
//             // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
//             // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
//             // .matches(/[0-9]/, "Password must contain at least one number")
//             // .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
    
//         confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords must match').required("Please confirm your password"),
//         phone: Yup.string().required("Required")
//     });

//     const loginSubmit = async (values,{resetForm}) => {
//         try {
//             const response = await axios.get('http://localhost:5000/users');
//             const user = response.data.find(user => user.email === values.email);
//             if (user) {
//                 if (user.password === values.password) {
//                     toast.success("Login successful");
//                     localStorage.setItem("id",user.id)
//                     resetForm();
//                     navigate('/productList'); // Redirect to product list
//                 } else {
//                     toast.error("Invalid password");
//                 }
//             } else {
//                 toast.error("User not found");
//             }
//         } catch (error) {
//             console.error(error.message);
//             toast.error("An error occurred during login.Please try again.");
//         }
//     };

//     const registrationSubmit = async (values, { resetForm }) => {
//         try {
//             await axios.post('http://localhost:5000/users', values);
//             toast.success("Registration successful");
//             resetForm(); // Resets the form after successful registration
//             setIsLogin(true); // Switch back to login mode
//         } catch (error) {
//             toast.error("Registration failed. Please try again.");
//             console.error(error.message);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//             <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
//                 <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">{isLogin ? 'Login' : 'Registration'}</h2>

//                 <div className="flex justify-center mb-6 space-x-4">
//                     <button
//                         onClick={() => setIsLogin(true)}
//                         className={`py-2 px-4 rounded ${isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
//                     >
//                         Login
//                     </button>
//                     <button
//                         onClick={() => setIsLogin(false)}
//                         className={`py-2 px-4 rounded ${!isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
//                     >
//                         Registration
//                     </button>
//                 </div>

//                 {isLogin ? (
//                     <Formik
//                         initialValues={loginInitialValues}
//                         validationSchema={loginValidationSchema}
//                         onSubmit={loginSubmit}
//                     >
//                         <Form className="space-y-4">
//                             <div className="form-control">
//                                 <label htmlFor='email' className="text-gray-600">E-mail</label>
//                                 <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
//                                     <FaEnvelope className="text-gray-500 mr-2" />
//                                     <Field type='email' id='email' name='email' className="flex-1 bg-transparent outline-none" />
//                                 </div>
//                                 <ErrorMessage name='email' component="div" className="text-red-500 text-sm" />
//                             </div>

//                             <div className="form-control">
//                                 <label htmlFor='password' className="text-gray-600">Password</label>
//                                 <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
//                                     <FaLock className="text-gray-500 mr-2" />
//                                     <Field type='password' id='password' name='password' className="flex-1 bg-transparent outline-none" />
//                                 </div>
//                                 <ErrorMessage name='password' component="div" className="text-red-500 text-sm" />
//                             </div>

//                             <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Login</button>
//                         </Form>
//                     </Formik>
//                 ) : (
//                     <Formik
//                         initialValues={registrationInitialValues}
//                         validationSchema={registrationValidationSchema}
//                         onSubmit={registrationSubmit}
//                     >
//                         <Form className="space-y-4">
//                             <div className="form-control">
//                                 <label htmlFor='userName' className="text-gray-600">Username</label>
//                                 <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
//                                     <FaUser className="text-gray-500 mr-2" />
//                                     <Field type='text' id='userName' name='userName' className="flex-1 bg-transparent outline-none" />
//                                 </div>
//                                 <ErrorMessage name='userName' component="div" className="text-red-500 text-sm" />
//                             </div>

//                             <div className="form-control">
//                                 <label htmlFor='email' className="text-gray-600">E-mail</label>
//                                 <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
//                                     <FaEnvelope className="text-gray-500 mr-2" />
//                                     <Field type='email' id='email' name='email' className="flex-1 bg-transparent outline-none" />
//                                 </div>
//                                 <ErrorMessage name='email' component="div" className="text-red-500 text-sm" />
//                             </div>

//                             <div className="form-control">
//                                 <label htmlFor='password' className="text-gray-600">Password</label>
//                                 <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
//                                     <FaLock className="text-gray-500 mr-2" />
//                                     <Field type='password' id='password' name='password' className="flex-1 bg-transparent outline-none" />
//                                 </div>
//                                 <ErrorMessage name='password' component="div" className="text-red-500 text-sm" />
//                             </div>

//                             <div className="form-control">
//                                 <label htmlFor='confirmPassword' className="text-gray-600">Confirm Password</label>
//                                 <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
//                                     <FaLock className="text-gray-500 mr-2" />
//                                     <Field type='password' id='confirmPassword' name='confirmPassword' className="flex-1 bg-transparent outline-none" />
//                                 </div>
//                                 <ErrorMessage name='confirmPassword' component="div" className="text-red-500 text-sm" />
//                             </div>

//                             <div className="form-control">
//                                 <label htmlFor='phone' className="text-gray-600">Phone Number</label>
//                                 <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
//                                     <FaPhone className="text-gray-500 mr-2" />
//                                     <Field type='text' id='phone' name='phone' className="flex-1 bg-transparent outline-none" />
//                                 </div>
//                                 <ErrorMessage name='phone' component="div" className="text-red-500 text-sm" />
//                             </div>

//                             <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Register</button>
//                         </Form>
//                     </Formik>
//                 )}

//                 <ToastContainer />
//             </div>
//         </div>
//     );
// };

// export default Login;































import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdPersonOutline } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { RxLockClosed } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegistrationPage = () => {
  const navigate = useNavigate();

  const validation = Yup.object({
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("required"),
    password: Yup.string().min(8, "password too short").required("Required"),
  });

  const onSubmit = (values) => {
    console.log("Registration form Data :", values);
    axios
      .post(`http://localhost:3001/user`, values)
      .then(() => navigate("/login"))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-5 text-center">SignUp Here!</h1>

      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          cart: [],
          order: [],
          status: true,
        }}
        validationSchema={validation}
        onSubmit={onSubmit}
      >
        <Form className="space-y-4">
          <div className="flex items-center border border-gray-300 p-3 rounded bg-gray-100">
            <MdPersonOutline className="text-gray-500 text-xl" />
            <Field
              type="text"
              placeholder="Username"
              name="username"
              className="border-none outline-none flex-1 pl-2 bg-transparent"
            />
          </div>
          <ErrorMessage
            name="username"
            component="div"
            className="text-red-500"
            
          />

          <div className="flex items-center border border-gray-300 p-3 rounded bg-gray-100">
            <MdOutlineMail className="text-gray-500 text-xl" />
            <Field
              type="email"
              placeholder="Email"
              name="email"
              className="border-none outline-none flex-1 pl-2 bg-transparent"
            />
          </div>
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-500"
            
          />

          <div className="flex items-center border border-gray-300 p-3 rounded bg-gray-100">
            <RxLockClosed className="text-gray-500 text-xl" />
            <Field
              type="password"
              placeholder="Password"
              name="password"
              className="border-none outline-none flex-1 pl-2 bg-transparent"
            />
          </div>
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500"
            
          />

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-3xl hover:bg-blue-600"
          >
            Sign UP
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationPage;