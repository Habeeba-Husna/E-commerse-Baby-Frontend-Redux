import React, { useContext, useState,useEffect,useMemo } from 'react';
import { UserContext } from '../../Context/UserContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { MdClose } from 'react-icons/md';
import * as Yup from "yup";
import { Admincontext } from './AdminContext';
import { toast, ToastContainer } from 'react-toastify';
import AdminNavbar from './AdminNavbar';



const AdminProductPage = () => {
  const { products,setProducts } = useContext(UserContext);
  const { editFormData, DeleteProduct, addingData} = useContext(Admincontext);
  const [edit, setEdit] = useState(false);
  const [Filter, setFilter] = useState('All');
  const [addProduct , setAddProduct] = useState(null)
  // const [addProductModal, setAddProductModal] = useState(false);
  

  
  const initialValues = {
    
    name: "",
    price: "",
    quantity: "",
    description: "",
    category: "",
    url: "",
  };
  useEffect(() => {
    console.log("page reload");
  }, [products]);
  
  const validation = Yup.object({
    
    name: Yup.string().required("Required"),
    price: Yup.number().required("Required").positive("Price must be positive").typeError('Invalid price format'),
    quantity: Yup.number().required("Required").positive().integer('Must be an integer'),
    description: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    url: Yup.string().url("Invalid URL format").required("Required"),
  });

  const handlesubmit = (values, {resetForm}) => {
    // console.log(values);
    addingData(values)
    toast.success('Product added successfully!');
    // setAddProductModal(false);
    resetForm()
  }

  const onHandleEdit = (product) => {
    console.log("Editing product:", product);
    setEdit(product);
  };

  const editHandleSubmit = (values) => {
    console.log("Editing values:", values);
    editFormData(values);
    setEdit(null);
  };


// const handleDelete = (id) => {
//   console.log("Deleting product with id:", id);
//   DeleteProduct(id);
// };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  }

  // const filteredData = Filter === 'All' ? products : products.filter(item => item.category.toLowerCase() === Filter.toLowerCase())



  const filteredData = useMemo(() => {
    return Filter === 'All' 
      ? products 
      : products.filter(item => item.category.toLowerCase() === Filter.toLowerCase());
  }, [Filter, products]);

  // const filteredData = Filter === 'All' 
  //   ? products 
  //   : products.filter(item => item.category.toLowerCase() === Filter.toLowerCase());




  // useEffect(()=>{
  //   setFilterCatgory(['All',...category])  
  //   console.log(filterCategory)
  //   setFilterProducct(product)
  // },[product])
  // const [selectedCategory, setSelectedCategory] = useState('All');
  
  // const handleCategory = (e) => {
  //   const value = e.target.value;
  //   setSelectedCategory(value);
  //   if (value === 'All') {
  //     setFilterProducct(product);
  //   } else {
  //     setFilterProducct(product.filter((item) => item.category === value));
  //   }
  // };

  return (
    <div className="flex flex-col h-screen">
      {/* <h1 className="text-2xl text-center font-bold">Admin Product Management</h1> */}
    
      <div className="w-full flex justify-between items-center">
      
  <select 
    id="category" 
    value={Filter} 
    onChange={handleFilterChange} 
    className="p-2 border border-gray-300 rounded "
  >
    <option value="All">All</option>
    <option value="Footwear">Footwear</option>
    <option value="Girl Fashion">Girl Fashion</option>
    <option value="Boy Fashion">Boy Fashion</option>
    <option value="Toys">Toys</option>
    <option value="Health">Health</option>
    <option value="Feeding">Feeding</option>
    <option value="Bath">Bath</option>
    <option value="Nursery">Nursery</option>
  </select>

  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 "
  onClick={()=>setAddProduct(true)}>
    Add Product
  </button>
</div>

<div className="w-full mx-auto my-4 overflow-x-auto p-2">
      <table className="w-full text-sm text-gray-900 border-collapse border border-gray-300">
        <thead className="text-xs text-white bg-gray-700">
          <tr>
            <th className='p-4 text-center'>ID</th>
            <th className='p-4 text-center'>PRODUCT NAME</th>
            <th className='p-4 text-center'>PRICE</th>
            <th className='p-4 text-center'>QUANTITY</th>
            <th className='p-4 text-center'>DESCRIPTION</th>
            <th className='p-4 text-center'>CATEGORY</th>
            <th className='p-4 text-center'>IMAGE</th>
            <th className='p-4 text-center'>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
            
        {filteredData.map((product, index) => (
  <tr key={product.id || index} className="border-b text-lg hover:bg-gray-100">
              <td className='p-4 text-center text-blue-700'>{product.id}</td>
              <td className='p-4 text-center text-blue-700'>{product.name}</td>
              <td className='p-4 text-center text-blue-700'>{product.price}</td>
              <td className='p-4 text-center text-blue-700'>{product.quantity}</td>
              <td className='p-4 text-center text-blue-700'>{product.description}</td>
              <td className='p-4 text-center text-blue-700'>{product.category}</td>
              <td className='p-4 text-center'>
                <img src={product.url} alt={product.name} className='h-24 w-24 object-cover' />
              </td>
              <td className="p-4 text-center flex flex-col items-center space-y-2">
                <button onClick={() => onHandleEdit(product)} className="w-20 px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Edit
                </button>
                <button onClick={() => DeleteProduct(product.id)} className="w-20 px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {edit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 relative max-w-lg w-full h-3/4 overflow-y-auto">
            <MdClose
              className="absolute top-2 right-2 text-gray-600 cursor-pointer"
              onClick={() => setEdit(false)}
            />
            <Formik
              initialValues={{
                id: edit.id,
                name: edit.name,
                price: edit.price,
                quantity: edit.quantity,
                description: edit.description,
                category: edit.category,
                url: edit.url
              }}
              validationSchema={validation}
              onSubmit={editHandleSubmit}
            >
              <Form>
                <div className='p-2'>
                  <label htmlFor="name" className='text-gray-700'>Name:</label>
                  <Field name='name' type='text' placeholder='Enter the name' className='w-full rounded-md border-gray-300 p-2' />
                  <ErrorMessage name='name' component='div' className='text-red-500 text-sm' />
                </div>

                <div className='p-2'>
                  <label htmlFor="price" className='text-gray-700'>Price:</label>
                  <Field name='price' type='text' placeholder='Enter the price' className='w-full rounded-md border-gray-300 p-2' />
                  <ErrorMessage name='price' component='div' className='text-red-500 text-sm' />
                </div>

                <div className='p-2'>
                  <label htmlFor="quantity" className='text-gray-700'>Quantity:</label>
                  <Field name='quantity' type='text' placeholder='Enter the quantity' className='w-full rounded-md border-gray-300 p-2' />
                  <ErrorMessage name='quantity' component='div' className='text-red-500 text-sm' />
                </div>

                <div className='p-2'>
                  <label htmlFor="description" className='text-gray-700'>Description:</label>
                  <Field name='description' type='text' placeholder='Enter the description' className='w-full rounded-md border-gray-300 p-2' />
                  <ErrorMessage name='description' component='div' className='text-red-500 text-sm' />
                </div>

                <div className='p-2'>
                  <label htmlFor="category" className='text-gray-700'>Category:</label>
                  <Field name='category' type='text' placeholder='Enter the category' className='w-full rounded-md border-gray-300 p-2' />
                  <ErrorMessage name='category' component='div' className='text-red-500 text-sm' />
                </div>

                <div className='p-2'>
                  <label htmlFor="url" className='text-gray-700'>Image URL:</label>
                  <Field name='url' type='text' placeholder='Enter the image URL' className='w-full rounded-md border-gray-300 p-2' />
                  <ErrorMessage name='url' component='div' className='text-red-500 text-sm' />
                </div>
                
                <button type='submit' className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md  hover:bg-blue-600">
                  Submit
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      )}

      {addProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 relative max-w-lg w-full h-3/4 overflow-y-auto">
          <MdClose
              className="absolute top-2 right-2 text-gray-600 cursor-pointer"
              onClick={() => setAddProduct(false)}
            />
            <Formik
              initialValues = {initialValues}
              validationSchema = {validation}
              onSubmit ={handlesubmit}
              >
                <Form>
                
                <div className='p-2'>
                  <label htmlFor="name" className='text-gray-700 w-full'>Name:</label>
                  <Field name='name' type='text' placeholder='Enter the name' className='w-full rounded-md border-gray-300 p-2' />
                  <ErrorMessage name='name' component='div' className='text-red-500 text-sm' />
                </div>

                <div className='p-2'>
                  <label htmlFor="price" className='text-gray-700 w-full'>Price:</label>
                  <Field name='price' type='text' placeholder='Enter the price' className='w-full rounded-md border-gray-300 p-2' />
                  <ErrorMessage name='price' component='div' className='text-red-500 text-sm' />
                </div>

                <div className='p-2'>
                  <label htmlFor="quantity" className='text-gray-700 w-full'>Quantity:</label>
                  <Field name='quantity' type='text' placeholder='Enter the quantity' className='w-full rounded-md border-gray-300 p-2' />
                  <ErrorMessage name='quantity' component='div' className='text-red-500 text-sm' />
                </div>

                <div className='p-2'>
                  <label htmlFor="description" className='text-gray-700 w-full'>Description:</label>
                  <Field name='description' type='text' placeholder='Enter the description' className='w-full rounded-md border-gray-300 p-2' />
                  <ErrorMessage name='description' component='div' className='text-red-500 text-sm' />
                </div>

                <div className='p-2'>
                  <label htmlFor="category" className='text-gray-700 w-full'>Category:</label>
                  <Field name='category' type='text' placeholder='Enter the category' className='w-full rounded-md border-gray-300 p-2' />
                  <ErrorMessage name='category' component='div' className='text-red-500 text-sm' />
                </div>

                <div className='p-2'>
                  <label htmlFor="url" className='text-gray-700 w-full'>Image URL:</label>
                  <Field name='url' type='text' placeholder='Enter the image URL' className='w-full rounded-md border-gray-300 p-2' />
                  <ErrorMessage name='url' component='div' className='text-red-500 text-sm' />
                </div>
                
                <button type='submit' className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md shadow-md hover:bg-blue-600">
                  Submit
                </button> 
                </Form>
            </Formik>
          </div>
        </div>
      )}

    </div>
    <ToastContainer/>
    </div>
     
  );
};

export default AdminProductPage;












// import React, { useContext, useState, useEffect, useMemo } from 'react';
// import { UserContext } from '../../Context/UserContext';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { MdClose } from 'react-icons/md';
// import * as Yup from 'yup';
// import { Admincontext } from './AdminContext';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Modal from './Modal';  // Adjust the path according to the location of your Modal component


// const AdminProductPage = () => {
//   const { products, setProducts } = useContext(UserContext);
//   const { editFormData, DeleteProduct, addingData } = useContext(Admincontext);
//   const [edit, setEdit] = useState(null);
//   const [filter, setFilter] = useState('All');
//   const [addProductModal, setAddProductModal] = useState(false);

//   const initialValues = {
//     name: '',
//     price: '',
//     quantity: '',
//     description: '',
//     category: '',
//     url: '',
//   };

//   const validationSchema = Yup.object({
//     name: Yup.string().required('Required'),
//     price: Yup.number()
//       .required('Required')
//       .positive('Price must be positive')
//       .typeError('Invalid price format'),
//     quantity: Yup.number()
//       .required('Required')
//       .positive()
//       .integer('Must be an integer'),
//     description: Yup.string().required('Required'),
//     category: Yup.string().required('Required'),
//     url: Yup.string().url('Invalid URL format').required('Required'),
//   });

//   const handleAddSubmit = (values, { resetForm }) => {
//     addingData(values);
//     toast.success('Product added successfully!');
//     setAddProductModal(false);
//     resetForm();
//   };

//   const handleEditSubmit = (values) => {
//     editFormData(values);
//     toast.success('Product updated successfully!');
//     setEdit(null);
//   };

//   const handleFilterChange = (e) => {
//     setFilter(e.target.value);
//   };

//   const filteredData = useMemo(() => {
//     return filter === 'All'
//       ? products
//       : products.filter(
//           (item) => item.category.toLowerCase() === filter.toLowerCase()
//         );
//   }, [filter, products]);

//   return (
//     <div className="w-full flex flex-col items-center p-6 bg-gray-50">
//       <div className="w-full flex justify-between items-center mb-6">
//         <select
//           value={filter}
//           onChange={handleFilterChange}
//           className="p-3 border border-gray-300 rounded-lg shadow-md text-lg"
//         >
//           <option value="All">All</option>
//           <option value="Footwear">Footwear</option>
//           <option value="Girl Fashion">Girl Fashion</option>
//           <option value="Boy Fashion">Boy Fashion</option>
//           <option value="Toys">Toys</option>
//           <option value="Health">Health</option>
//           <option value="Feeding">Feeding</option>
//           <option value="Bath">Bath</option>
//           <option value="Nursery">Nursery</option>
//         </select>
//         <button
//           onClick={() => setAddProductModal(true)}
//           className="bg-teal-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-600 transition duration-200"
//         >
//           Add Product
//         </button>
//       </div>

//       <div className="overflow-x-auto w-full bg-white rounded-lg shadow-md">
//         <table className="min-w-full border-collapse">
//           <thead className="bg-teal-500 text-white">
//             <tr>
//               <th className="p-3">ID</th>
//               <th className="p-3">Product Name</th>
//               <th className="p-3">Price</th>
//               <th className="p-3">Quantity</th>
//               <th className="p-3">Description</th>
//               <th className="p-3">Category</th>
//               <th className="p-3">Image</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((product) => (
//               <tr key={product.id} className="hover:bg-gray-100">
//                 <td className="p-4">{product.id}</td>
//                 <td className="p-4">{product.name}</td>
//                 <td className="p-4">{product.price}</td>
//                 <td className="p-4">{product.quantity}</td>
//                 <td className="p-4">{product.description}</td>
//                 <td className="p-4">{product.category}</td>
//                 <td className="p-4">
//                   <img
//                     src={product.url}
//                     alt={product.name}
//                     className="p-4 flex space-x-4"
//                   />
//                 </td>
//                 <td className="p-3 flex justify-center space-x-2">
//                   <button
//                     onClick={() => setEdit(product)}
//                     className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => DeleteProduct(product.id)}
//                     className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {addProductModal && (
//         <Modal
//           title="Add Product"
//           onClose={() => setAddProductModal(false)}
//           onSubmit={handleAddSubmit}
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//         />
//       )}

//       {edit && (
//         <Modal
//           title="Edit Product"
//           onClose={() => setEdit(null)}
//           onSubmit={handleEditSubmit}
//           initialValues={edit}
//           validationSchema={validationSchema}
//         />
//       )}

//       <ToastContainer />
//     </div>
//   );
// };

// export default AdminProductPage;
