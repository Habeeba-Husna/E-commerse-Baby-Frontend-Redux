import React, { useState, useEffect, useMemo } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { MdClose } from 'react-icons/md';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { fetchProducts, addProduct, deleteProduct, editProduct } from '../Redux/adminSlice';
import { useNavigate } from 'react-router-dom';

const AdminProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, status, error } = useSelector((state) => state.admin);
 


  const [edit, setEdit] = useState(null); // Edit modal state
  const [addProducts, setAddProducts] = useState(false); // Add product modal state
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'failed') {
      toast.error(error || 'Failed to fetch products.');
    }
  }, [status, error]);

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isAdminLoggedIn) {
      toast.error('Please log in as admin to access this page.');
      navigate('/login');
    }
  }, [navigate]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    price: Yup.number().required("Required").positive("Price must be positive").typeError('Invalid price format'),
    quantity: Yup.number().required("Required").positive().integer('Must be an integer'),
    description: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    url: Yup.string().url("Invalid URL format").required("Required"),
  });

  const handleAddSubmit = (values, { resetForm }) => {
    dispatch(addProduct({ ...values, price: Number(values.price), quantity: Number(values.quantity) }));
    toast.success('Product added successfully!');
    setAddProducts(false);
    resetForm();
  };

  // const handleEditSubmit = (values) => {
  //   // dispatch(editProduct({ ...values, price: Number(values.price), quantity: Number(values.quantity) }));
  //   dispatch(editProduct({ ...values, id: edit.id }));
  //   toast.success('Product updated successfully!');
  //   setEdit(null);

  // };

  const handleEditSubmit = (values) => {
    dispatch(editProduct({ ...values, id: edit.id })).then(() => {
      console.log("Product updated successfully!", values);
    });
    toast.success('Product updated successfully!');
    setEdit(null);
  };
  


  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    toast.success('Product deleted successfully!');
  };

  const handleFilterChange = (e) => setFilter(e.target.value);

  const filteredProducts = useMemo(() => {
    return filter === 'All' ? products : products.filter((item) => item.category.toLowerCase() === filter.toLowerCase());
  }, [filter, products]);

  return (
    <div className="flex flex-col h-screen">
      <ToastContainer />
      <div className="w-full flex justify-between items-center">
        <select
          value={filter}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded"
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
        <button
          onClick={() => setAddProducts(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </div>

      <div className="w-full mx-auto my-4 overflow-x-auto p-2">
        <table className="w-full text-sm text-gray-900 border-collapse border border-gray-300">
          <thead className="text-xs text-white bg-gray-700">
            <tr>
              <th className="p-4 text-center">ID</th>
              <th className="p-4 text-center">PRODUCT NAME</th>
              <th className="p-4 text-center">PRICE</th>
              <th className="p-4 text-center">QUANTITY</th>
              <th className="p-4 text-center">DESCRIPTION</th>
              <th className="p-4 text-center">CATEGORY</th>
              <th className="p-4 text-center">IMAGE</th>
              <th className="p-4 text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b text-lg hover:bg-gray-100">
                <td className="p-4 text-center text-blue-700">{product.id}</td>
                <td className="p-4 text-center text-blue-700">{product.name}</td>
                <td className="p-4 text-center text-blue-700">{product.price}</td>
                <td className="p-4 text-center text-blue-700">{product.quantity}</td>
                <td className="p-4 text-center text-blue-700">{product.description}</td>
                <td className="p-4 text-center text-blue-700">{product.category}</td>
                <td className="p-4 text-center">
                  <img src={product.url} alt={product.name} className="h-24 w-24 object-cover" />
                </td>
                <td className="p-4 text-center flex flex-col items-center space-y-2">
                  <button
                    onClick={() => setEdit(product)}
                    className="w-20 px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="w-20 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {addProducts && (
        <Modal
          title="Add Product"
          onClose={() => setAddProducts(false)}
          initialValues={{
            name: '',
            price: '',
            quantity: '',
            description: '',
            category: '',
            url: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleAddSubmit}
        />
      )}

      {edit && (
        <Modal
          title="Edit Product"
          onClose={() => setEdit(null)}
          initialValues={edit}
          validationSchema={validationSchema}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
};

// Define a reusable modal component
const Modal = ({ title, onClose, initialValues, validationSchema, onSubmit }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg p-6 relative max-w-lg w-full h-3/4 overflow-y-auto">
      <MdClose
        className="absolute top-2 right-2 text-gray-600 cursor-pointer"
        onClick={onClose}
      />
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          {Object.keys(initialValues).map((key) => (
            <div className="p-2" key={key}>
              <label htmlFor={key} className="text-gray-700 capitalize">
                {key}:
              </label>
              <Field
                name={key}
                type="text"
                placeholder={`Enter the ${key}`}
                className="w-full rounded-md border-gray-300 p-2"
              />
              <ErrorMessage name={key} component="div" className="text-red-500 text-sm" />
            </div>
          ))}
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </Form>
      </Formik>
    </div>
  </div>
);

export default AdminProductPage;
