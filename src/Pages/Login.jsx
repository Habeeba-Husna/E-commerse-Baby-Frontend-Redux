import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
// import { MdEmail } from "react-icons/md";
// import { RiLockPasswordFill } from "react-icons/ri";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const registrationInitialValues = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
};

const registrationValidationSchema = Yup.object({
    userName: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),

    confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords must match').required("Please confirm your password"),
    phone: Yup.string().required("Required")
});

const registrationSubmit = async (values, { resetForm }) => {
    try {
        await axios.post('http://localhost:5000/users', values);
        toast.success("Registration successful");
        resetForm(); // Resets the form after successful registration
    } catch (error) {
        toast.error("An error occurred during registration");
        console.error(error.message);
    }
};

const loginInitialValues = {
    email: '',
    password: ''
};

const loginValidationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required')
});

const loginSubmit = async (values) => {
    try {
        const response = await axios.get('http://localhost:5000/users');
        const user = response.data.find(user => user.email === values.email);
        if (user) {
            if (user.password === values.password) {
                toast.success("Login successful");
            } else {
                toast.error("Invalid password");
            }
        } else {
            toast.error("User not found");
        }
    } catch (error) {
        console.error(error.message);
        toast.error("An error occurred during login");
    }
};

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">{isLogin ? 'Login' : 'Registration'}</h2>

                <div className="flex justify-center mb-6 space-x-4">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`py-2 px-4 rounded ${isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`py-2 px-4 rounded ${!isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                    >
                        Registration
                    </button>
                </div>

                {isLogin ? (
                    <Formik
                        initialValues={loginInitialValues}
                        validationSchema={loginValidationSchema}
                        onSubmit={loginSubmit}
                    >
                        <Form className="space-y-4">
                            <div className="form-control">
                                <label htmlFor='email' className="text-gray-600">E-mail</label>
                                <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
                                    <FaEnvelope className="text-gray-500 mr-2" />
                                    <Field type='email' id='email' name='email' className="flex-1 bg-transparent outline-none" />
                                </div>
                                <ErrorMessage name='email' component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="form-control">
                                <label htmlFor='password' className="text-gray-600">Password</label>
                                <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
                                    <FaLock className="text-gray-500 mr-2" />
                                    <Field type='password' id='password' name='password' className="flex-1 bg-transparent outline-none" />
                                </div>
                                <ErrorMessage name='password' component="div" className="text-red-500 text-sm" />
                            </div>

                            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Login</button>
                        </Form>
                    </Formik>
                ) : (
                    <Formik
                        initialValues={registrationInitialValues}
                        validationSchema={registrationValidationSchema}
                        onSubmit={registrationSubmit}
                    >
                        <Form className="space-y-4">
                            <div className="form-control">
                                <label htmlFor='userName' className="text-gray-600">Username</label>
                                <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
                                    <FaUser className="text-gray-500 mr-2" />
                                    <Field type='text' id='userName' name='userName' className="flex-1 bg-transparent outline-none" />
                                </div>
                                <ErrorMessage name='userName' component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="form-control">
                                <label htmlFor='email' className="text-gray-600">E-mail</label>
                                <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
                                    <FaEnvelope className="text-gray-500 mr-2" />
                                    <Field type='email' id='email' name='email' className="flex-1 bg-transparent outline-none" />
                                </div>
                                <ErrorMessage name='email' component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="form-control">
                                <label htmlFor='password' className="text-gray-600">Password</label>
                                <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
                                    <FaLock className="text-gray-500 mr-2" />
                                    <Field type='password' id='password' name='password' className="flex-1 bg-transparent outline-none" />
                                </div>
                                <ErrorMessage name='password' component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="form-control">
                                <label htmlFor='confirmPassword' className="text-gray-600">Confirm Password</label>
                                <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
                                    <FaLock className="text-gray-500 mr-2" />
                                    <Field type='password' id='confirmPassword' name='confirmPassword' className="flex-1 bg-transparent outline-none" />
                                </div>
                                <ErrorMessage name='confirmPassword' component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="form-control">
                                <label htmlFor='phone' className="text-gray-600">Phone Number</label>
                                <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
                                    <FaPhone className="text-gray-500 mr-2" />
                                    <Field type='text' id='phone' name='phone' className="flex-1 bg-transparent outline-none" />
                                </div>
                                <ErrorMessage name='phone' component="div" className="text-red-500 text-sm" />
                            </div>

                            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Register</button>
                        </Form>
                    </Formik>
                )}

                <ToastContainer />
            </div>
        </div>
    );
};

export default Login;
