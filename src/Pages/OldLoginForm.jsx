// import React from 'react'
// import { Formik, Form , Field, ErrorMessage } from 'formik'
// // import * as Yup from 'Yup'
// import { MdEmail } from "react-icons/md"
// import { RiLockPasswordFill } from "react-icons/ri"
// import axios from 'axios';


// function LoginForm() {
//     const initialValues = {
//         email:'',
//         password:''
//     }
//     const validationSchema = Yup.object({
//         email:Yup.string().email('Invalid email format').required('Required'),
//         password:Yup.string().required('Required')
//     })
//     const onSubmit = values => {
//         console.log('Form data',values); 
//     }

//   return (
//    <Formik 
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={onSubmit} >
//         <Form >
//           <div className='form-control'>
//             <label htmlFor='email'>E-mail</label>
//             <div className="input-container">
//               <MdEmail className="icon" />
//               <Field type='email' id='email' name='email' />
//             </div>
//             <ErrorMessage name='email' component="div" className='error' />
//           </div> 

//           <div className='form-control'>
//             <label htmlFor='password'>Password</label>
//             <div className="input-container">
//               <RiLockPasswordFill className="icon" />
//               <Field type='password' id='password' name='password' />
//             </div>
//             <ErrorMessage name='password' component="div" className='error' />
//           </div>  
//                <button type='submit'>Submit</button>
//         </Form>
//    </Formik>
//   )
// }

// export default LoginForm
