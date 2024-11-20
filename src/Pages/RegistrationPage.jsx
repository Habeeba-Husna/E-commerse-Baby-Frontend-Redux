import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';

const RegistrationPage = () => {
    const navigate = useNavigate();

    const validation = Yup.object({
        userName: Yup.string().required("Username is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().required("Password is required").min(8, "Password should be at least 8 characters long")
        .matches(/[a-z]/, "Password should contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password should contain at least one uppercase letter")
        .matches(/[0-9]/, "Password should contain at least one number")
        .matches(/[@$!%*?&#_]/, "Password should contain at least one special character"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), ''], 'Passwords must match')
            .required("Please confirm your password"),
        phone: Yup.string().required("Phone number is required")
    });

    const onSubmit = async (values) => {
        try {
            const { confirmPassword, ...newvalue } = values
            const response = await axios.get(`http://localhost:5000/users`);
            const existingUser = response.data.find(user => user.email === values.email || user.userName === values.userName || user.password === values.password);

            if (existingUser) {
                if (existingUser.email === values.email) {
                    toast.error("Email is already registered");
                } if (existingUser.userName === values.userName) {
                    toast.error("Username is already use");
                } if (existingUser.password === values.password) {
                    toast.error("Password is already in use");
                }

            } else {
                // Proceed with registration
                await axios.post(`http://localhost:5000/users`, newvalue);
                toast.success("Registration successful!");
                navigate("/login");
            }
        } catch (error) {
            console.error("Error registering user:", error);
            toast.error("Registration failed. Please try again.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-5 text-center text-gray-700">Sign Up</h1>
            <Formik
                initialValues={{
                    userName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    phone: "",
                    cart: [],
                    order: [],
                    wishlist: []

                }}
                validationSchema={validation}
                onSubmit={onSubmit}
            >
                <Form className="space-y-4">
                    <div className="flex items-center border border-gray-300 p-3 rounded-lg bg-gray-100">
                        <FaUser className="text-gray-500 text-xl" />
                        <Field
                            type="text"
                            placeholder="UserName"
                            name="userName"
                            className="border-none outline-none flex-1 pl-2 bg-transparent"
                        />
                    </div>
                    <ErrorMessage name="userName" component="div" className="text-red-500 text-sm" />

                    <div className="flex items-center border border-gray-300 p-3 rounded-lg bg-gray-100">
                        <FaEnvelope className="text-gray-500 text-xl" />
                        <Field
                            type="email"
                            placeholder="Email"
                            name="email"
                            className="border-none outline-none flex-1 pl-2 bg-transparent"
                        />
                    </div>
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

                    <div className="flex items-center border border-gray-300 p-3 rounded-lg bg-gray-100">
                        <FaLock className="text-gray-500 text-xl" />
                        <Field
                            type="password"
                            placeholder="Password"
                            name="password"
                            className="border-none outline-none flex-1 pl-2 bg-transparent"
                        />
                    </div>
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

                    <div className="flex items-center border border-gray-300 p-3 rounded-lg bg-gray-100">
                        <FaLock className="text-gray-500 text-xl" />
                        <Field
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            className="border-none outline-none flex-1 pl-2 bg-transparent"
                        />
                    </div>
                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />

                    <div className="flex items-center border border-gray-300 p-3 rounded-lg bg-gray-100">
                        <FaPhone className="text-gray-500 text-xl" />
                        <Field
                            type="text"
                            placeholder="Phone"
                            name="phone"
                            className="border-none outline-none flex-1 pl-2 bg-transparent"
                        />
                    </div>
                    <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                    >
                        Sign Up
                    </button>
                </Form>
            </Formik>
            <ToastContainer />
        </div>
    );
};

export default RegistrationPage;

