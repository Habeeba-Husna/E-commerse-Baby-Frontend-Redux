import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../Context/UserContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const { setIsLoggedIn } = useContext(UserContext);
    const [users, setUsers] = useState();

    const validation = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().required("Password is required").min(8, "Password should be at least 8 characters long")
        .matches(/[a-z]/, "Password should contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password should contain at least one uppercase letter")
        .matches(/[0-9]/, "Password should contain at least one number")
        .matches(/[@$!%*?&#_]/, "Password should contain at least one special character"),
        
    });

    const onSubmit = async (values) => {
        try {
            const response = await axios.get(`http://localhost:5000/users`);
            setUsers(response.data);


            // Admin login check
    if (values.email === 'admin@gmail.com' && values.password === 'Aadhu@2020') {
        toast.success('Admin logged in successfully');
        setIsLoggedIn(true);
        setTimeout(() => {
          navigate('/admin');
        }, 1000);
        return; // Exit early after admin login
      }


            // const admindata =  values.email === 'admin@gmail.com' && values.password === 'Aadhu@2020';
            // const foundUser = response.data.find(user =>
            //     user.email === values.email && user.password === values.password
            // );

            // if(admindata){
            //     // localStorage.setItem('id',"admin");
            //     toast.success('Admin logged in successfully')
                
            //     setIsloggedIn(true);
            //     setTimeout(() => {
            //       navigate('/admin')
            //     },1000)
                
            //   }

            // Handle errors for invalid user or incorrect password
            if (!foundUser) {
                toast.error('Email not found');
            // } else if (foundUser.password !== values.password) {
            //     toast.error('Incorrect password');
            } else {
                // User found and password matched
                localStorage.setItem('id', foundUser.id);
                // console.log(foundUser.userName);

                localStorage.setItem('name', foundUser.userName);
                toast.success('Login successful');
                setIsLoggedIn(true);
                navigate('/');
            }

        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error("An error occurred while logging in.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-5 text-center text-gray-700">LogIn</h1>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validation}
                onSubmit={onSubmit}
            >
                <Form className='space-y-4'>
                    <div className='flex items-center border border-gray-300 p-3 rounded-lg bg-gray-100'>
                        <FaEnvelope className='text-gray-500 text-xl' />
                        <Field type="email" placeholder='Email' name='email' className='border-none outline-none flex-1 pl-2 bg-transparent' />
                    </div>
                    <ErrorMessage name='email' component='div' className="text-red-500 text-sm" />

                    <div className="flex items-center border border-gray-300 p-3 rounded-lg bg-gray-100">
                        <FaLock className="text-gray-500 text-xl" />
                        <Field type="password" placeholder='Password' name='password' className="border-none outline-none flex-1 pl-2 bg-transparent" />
                    </div>
                    <ErrorMessage name='password' component='div' className="text-red-500 text-sm" />

                    <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                        Sign In
                    </button>

                    <div className="mt-4 text-gray-600 text-sm">
                        Don't have an account?
                        <button onClick={() => navigate('/registration')} className="text-blue-500 hover:text-blue-700 ml-1">
                            Sign Up
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default LoginPage;

