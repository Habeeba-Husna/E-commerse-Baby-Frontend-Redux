import React from 'react'
import { Formik, Form , Field, ErrorMessage } from 'formik'
import * as Yup from 'Yup'
import { FaUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

function LoginForm() {
    const initialValues = {
        email:'',
        password:''
    }
    const validationSchema = Yup.object({
        email:Yup.string().email('Invalid email format').required('Required'),
        password:Yup.string().required('Required')
    })
    const onSubmit = values => {
        console.log('Form data',values); 
    }

  return (
   <Formik 
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit} >
        <Form >
            <div className='form-control'>
            <label htmlFor='email'>E-mail</label>
            <Field type='email'id='email'name='email'/>
            <ErrorMessage name='email'>
                {errorMsg=> <div className='error'>{errorMsg}</div>}
              </ErrorMessage>
              </div> 

            <div className='form-control'>
            <label htmlFor='password'>Password</label>
            <Field className='input-field' type='password'id='password'name='password'/>
            <ErrorMessage name='password'>
                {errorMsg=> <div className='error'>{errorMsg}</div>}
              </ErrorMessage>
               </div>
               <button type='submit'>Submit</button>
        </Form>
   </Formik>
  )
}

export default LoginForm
