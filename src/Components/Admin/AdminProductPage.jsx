import React, { useContext, useState,useEffect,useMemo } from 'react';
import { UserContext } from '../../Context/UserContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { MdClose } from 'react-icons/md';
import * as Yup from "yup";
import { Admincontext } from './AdminContext';
import { toast, ToastContainer } from 'react-toastify';
// import AdminNavbar from './AdminNavbar';


const AdminProductPage = () => {
  const { products,setProducts } = useContext(UserContext);
  const { editFormData, DeleteProduct, addingData} = useContext(Admincontext);
  const [edit, setEdit] = useState(false);
  const [Filter, setFilter] = useState('All');
  const [addProduct , setAddProduct] = useState(null)
  

  
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
    price: Yup.string().required("Required"),
    quantity: Yup.number().required("Required").positive().integer(),
    description: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    url: Yup.string().url("Invalid URL format").required("Required"),
  });




  const handlesubmit = (values, {resetForm}) => {
    // console.log(values);
    addingData(values)
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
    // <div>
    //   <AdminNavbar/>
    <div>
      <div className="flex justify-between items-center m-2">
  <select 
    id="category" 
    value={Filter} 
    onChange={handleFilterChange} 
    className="p-2 border border-gray-300 rounded mr-4 "
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

  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-4"
  onClick={()=>setAddProduct(true)}>
    Add Product
  </button>
</div>

<div className="w-11/12 mx-auto my-4 overflow-x-auto">
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
            <th className='p-4 text-center'>EDIT/DELETE</th>
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
    // {/* </div> */}
  );
};

export default AdminProductPage;





// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AdminProducts = () => {
//   const [products, setProducts] = useState([]);

//   // Fetch products from backend
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/products")
//       .then((response) => setProducts(response.data))
//       .catch((error) => console.error("Error fetching products:", error));
//   }, []);

//   // Delete a product
//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       axios
//         .delete(`http://localhost:5000/products/${id}`)
//         .then(() => setProducts(products.filter((product) => product.id !== id)))
//         .catch((error) => console.error("Error deleting product:", error));
//     }
//   };

//   // Edit a product (Redirect or open modal)
//   const handleEdit = (id) => {
//     alert(`Redirecting to edit page for product ID: ${id}`);
//     // Navigate to edit page (e.g., `/admin/edit-product/${id}`)
//   };

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6 text-center">Admin Products Page</h1>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
//           <thead>
//             <tr className="bg-gray-200 text-gray-700">
//               <th className="p-4 text-center border">Product Name</th>
//               <th className="p-4 text-center border">Price</th>
//               <th className="p-4 text-center border">Quantity</th>
//               <th className="p-4 text-center border">Description</th>
//               <th className="p-4 text-center border">Category</th>
//               <th className="p-4 text-center border">Image</th>
              
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product.id} className="text-center hover:bg-gray-100">
//                 <td className="p-4 border">{product.name}</td>
//                 <td className="p-4 border">${product.price}</td>
//                 <td className="p-4 border">{product.quantity}</td>
//                 <td className="p-4 border">{product.description}</td>
//                 <td className="p-4 border">{product.category}</td>
//                 <td className="p-4 border">
//                   <img
//                     src={product.url}
//                     alt={product.name}
//                     className="w-16 h-16 mx-auto rounded"
//                   />
//                 </td>
//                 <td className="p-4 border">
//                   <button
//                     onClick={() => handleEdit(product.id)}
//                     className="px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600 transition"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(product.id)}
//                     className="ml-2 px-4 py-2 bg-red-500 text-white font-semibold rounded shadow hover:bg-red-600 transition"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminProducts;

