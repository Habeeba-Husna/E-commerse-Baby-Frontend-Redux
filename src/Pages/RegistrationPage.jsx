import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
import endPoints from "../api/endPoints";

const RegistrationPage = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z ]+$/, "Name can only contain letters and spaces")
      .required("Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Please confirm your password"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const { confirmpassword, ...payload } = values;
      console.log("Payload:", payload);
      const response = await axiosInstance.post(endPoints.AUTH.REGISTER, payload);

      toast.success(response.data.message);
      resetForm();
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-5 text-center text-gray-700">Sign Up</h1>
      <Formik
        initialValues={{
          name: "",
          username: "",
          email: "",
          password: "",
          confirmpassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="space-y-4">
          <div className="flex items-center border border-gray-300 p-3 rounded-lg bg-gray-100">
            <FaUser className="text-gray-500 text-xl" />
            <Field
              type="text"
              placeholder="Full Name"
              name="name"
              className="border-none outline-none flex-1 pl-2 bg-transparent"
            />
          </div>
          <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />

          <div className="flex items-center border border-gray-300 p-3 rounded-lg bg-gray-100">
            <FaUser className="text-gray-500 text-xl" />
            <Field
              type="text"
              placeholder="Username"
              name="username"
              className="border-none outline-none flex-1 pl-2 bg-transparent"
            />
          </div>
          <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />

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
              placeholder="Confirm password"
              name="confirmpassword"
              className="border-none outline-none flex-1 pl-2 bg-transparent"
            />
          </div>
          <ErrorMessage name="confirmpassword" component="div" className="text-red-500 text-sm" />

          <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
            Sign Up
          </button>
        </Form>
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default RegistrationPage;

