// import React from 'react'
// import { Formik, Form , Field, ErrorMessage } from 'formik'
// import * as Yup from 'Yup'
// import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
// import axios from 'axios';


// const initialValues={
//     userName:'',
//     email:'',
//     password:'',
//     confirmPassword:'',
//     phone:''
// }
// const onSubmit=async(values)=>{
//   try{
//     await axios.post('http://localhost:5000/users',values)
//     alert('success');
//   }
//  catch(error){
//   console.log(error.message);
  
//  }
//     console.log('form data',values); 

// }
// const validationSchema=Yup.object({

//     userName:Yup.string().required("Username is required"),
//     email:Yup.string().email("Invalid email format").required("Email is required"),
//     password:Yup.string().required("Password is required"),
//     confirmPassword:Yup.string().oneOf([Yup.ref('password'),''],'Password must match').required("Please confirm your password"),
//     phone:Yup.string().required("Required")
// });


// const RegistrationForm=() =>{

//   return (
//     <Formik 
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={onSubmit} 
//     >
//         <Form >
//           <div className='form-control'>
//             <label htmlFor='userName'>Username</label>
//             <div className="input-container">
//               <FaUser className="icon" />
//               <Field type='text' id='userName' name='userName' />
//             </div>
//             <ErrorMessage name='userName' component="div" className='error' />
//           </div>
            
//           <div className='form-control'>
//             <label htmlFor='email'>E-mail</label>
//             <div className="input-container">
//               <FaEnvelope className="icon" />
//               <Field type='email' id='email' name='email' />
//             </div>
//             <ErrorMessage name='email' component="div" className='error' />
//           </div>
             
//           <div className='form-control'>
//             <label htmlFor='password'>Password</label>
//             <div className="input-container">
//               <FaLock className="icon" />
//               <Field type='password' id='password' name='password' />
//             </div>
//             <ErrorMessage name='password' component="div" className='error' />
//           </div>

//           <div className='form-control'>
//             <label htmlFor='confirmPassword'>Confirm Password</label>
//             <div className="input-container">
//               <FaLock className="icon" />
//               <Field type='password' id='confirmPassword' name='confirmPassword' />
//             </div>
//             <ErrorMessage name='confirmPassword' component="div" className='error' />
//           </div>

//         <div className='form-control'>
//           <label htmlFor='phone'>Phone Number</label>
//           <div className="input-container">
//             <FaPhone className="icon" />
//             <Field type='text' id='phone' name='phone' />
//           </div>
//           <ErrorMessage name='phone' component="div" className='error' />
//         </div>   

//             <button type='submit'>Submit</button>
//         </Form>
//     </Formik>
//   )
// }

// export default RegistrationForm;