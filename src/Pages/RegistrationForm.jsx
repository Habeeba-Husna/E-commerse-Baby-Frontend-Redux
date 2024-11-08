import React from 'react'
import { Formik, Form , Field, ErrorMessage } from 'formik'
import * as Yup from 'Yup'

const initialValues={
    // name:'',
    userName:'',
    email:'',
    password:'',
    confirmPassword:'',
    phone:''
}
const onSubmit=values=>{
    console.log('form data',values); 
}
const validationSchema=Yup.object({

    // name:Yup.string().required("Please provide a Name"),
    userName:Yup.string().required("Username is required"),
    email:Yup.string().email("Invalid email format").required("Email is required"),
    password:Yup.string().required("Password is required"),
    confirmPassword:Yup.string().oneOf([Yup.ref('password'),''],'Password must match').required("Please confirm your password"),
    phone:Yup.string().required("Required")
});

const RegistrationForm=() =>{
  return (
    <Formik 
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit} >
        <Form >
            {/* <div className='form-control'>
            <label htmlFor='name'>Name</label>
            <Field type='text'id='name'name='name'/>
            <ErrorMessage name='name'>
                {errorMsg=> <div className='error'>{errorMsg}</div>}
              </ErrorMessage>
            </div> */}
   
            <div className='form-control'>
            <label htmlFor='userName'>UserName</label>
            <Field type='text'id='userName'name='userName'/>
            <ErrorMessage name='userName'>
                {errorMsg=> <div className='error'>{errorMsg}</div>}
              </ErrorMessage>
            </div>

            <div className='form-control'>
            <label htmlFor='email'>E-mail</label>
            <Field type='email'id='email'name='email'/>
            <ErrorMessage name='email'>
                {errorMsg=> <div className='error'>{errorMsg}</div>}
              </ErrorMessage>
              </div> 
              {/* <ErrorMessage name='name' component={}/> */}
             
            <div className='form-control'>
            <label htmlFor='password'>Password</label>
            <Field className='input-field' type='password'id='password'name='password'/>
            <ErrorMessage name='password'>
                {errorMsg=> <div className='error'>{errorMsg}</div>}
              </ErrorMessage>
               </div>

            <div className='form-control'>
            <label htmlFor='confirmPassword'>confirmPassword</label>
            <Field className='input-field' type='password'id='confirmPassword'name='confirmPassword'/>
            <ErrorMessage name='confirmPassword'>
                {errorMsg=> <div className='error'>{errorMsg}</div>}
              </ErrorMessage>
               </div>

            <div className='form-control'>
            <label htmlFor='phone'>Phone Number</label>
            <Field type='text'id='phone'name='phone'/>
            <ErrorMessage name='phone'>
                {errorMsg=> <div className='error'>{errorMsg}</div>}
              </ErrorMessage>
               </div>   

            <button type='submit'>Submit</button>
        </Form>
    </Formik>
  )
}

export default RegistrationForm;
