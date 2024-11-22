// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik'; // Add this import
// import * as Yup from 'yup'; // Optional, if you're using Yup for validation

// const Modal = ({ title, onClose, onSubmit, initialValues, validationSchema }) => {
//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>{title}</h2>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={onSubmit}
//         >
//           <Form>
//             <Field name="name" placeholder="Product Name" />
//             <ErrorMessage name="name" component="div" />
//             <Field name="price" placeholder="Price" />
//             <ErrorMessage name="price" component="div" />
//             <Field name="quantity" placeholder="Quantity" />
//             <ErrorMessage name="quantity" component="div" />
//             <Field name="description" placeholder="Description" />
//             <ErrorMessage name="description" component="div" />
//             <Field name="category" placeholder="Category" />
//             <ErrorMessage name="category" component="div" />
//             <Field name="url" placeholder="Image URL" />
//             <ErrorMessage name="url" component="div" />
//             <button type="submit">Submit</button>
//           </Form>
//         </Formik>
//         <button onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// };

// export default Modal;
