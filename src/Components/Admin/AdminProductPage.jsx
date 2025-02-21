import { useEffect, useState } from "react";
import { HiFolderAdd } from "react-icons/hi";
import * as Yup from "yup";
import { IoMdClose } from "react-icons/io";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, updateProduct, addproduct, deleteProduct } from "../../features/productSlice";


const AdminProduct = () => {
  const dispatch = useDispatch();
  const { products, pagination, category } = useSelector((state) => state.product);

  const [addProduct, setAddproduct] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedcategory] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllProducts({ category: selectedCategory || "", page, search }));
  }, [dispatch, page, search, selectedCategory]);


  //handle page
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPage(newPage);
    }
  };

  //new product adding form

  const initialValues = {
    _id: "",
    name: "",
    price: "",
    quantity: "",
    category: "",
    description: "",
    file: null,// For image upload
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    price: Yup.number().required("Price is required"),
    quantity: Yup.number().required("quantity is required"),
    category: Yup.string().required("category is required"),
    description: Yup.string().required("category is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("quantity", values.quantity);
    formData.append("category", values.category);
    formData.append("description", values.description);

    if (values.file) {
      formData.append("url", values.file);  // Attach the selected file
    }

    try {
      await dispatch(addproduct(formData)).unwrap();
      dispatch(getAllProducts({}));
      resetForm();
      setAddproduct(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };


  const editSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("_id", values._id);
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("quantity", values.quantity);
    formData.append("category", Array.isArray(values.category) ? values.category[0] : values.category.trim());
    formData.append("description", values.description);

    if (values.file) {
      formData.append("url", values.file); // Attach the new selected file
    }

    //  to log FormData contents
    console.log("Edit FormData:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      await dispatch(updateProduct(formData)).unwrap();
      dispatch(getAllProducts({}));
      resetForm();
      setEditProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };


  const handleCategory = (e) => {
    const selectedValue = e.target.value;
    // console.log("Selected Category:", selectedValue);
    setSelectedcategory(selectedValue);

    if (selectedValue === "All") {
      setSelectedcategory("");
      dispatch(getAllProducts({ page, search }));
    } else {
      dispatch(getAllProducts({ category: selectedValue, page, search }));
    }
  };



  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <select
          onChange={handleCategory}
          value={selectedCategory}
          className="p-2 rounded"
        >
          <option value="All">All</option>
          <option value="Footwear">Footwear</option>
          <option value="Girl Fashion">Girl Fashion</option>
          <option value="Toys">Toys</option>
          <option value="Health">Health</option>
          <option value="Boy Fashion">Boy Fashion</option>
          <option value="Feeding">Feeding</option>

          {category.length > 0 &&
            category.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
        </select>

        <input
          value={search}
          type="text"
          placeholder="Search product name"
          onChange={(e) => setSearch(e.target.value)}
          className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray px-2 py-1 focus:outline-none focus:border-1 focus:border-primary active:border-1 active:border-primary"
        />
        <HiFolderAdd
          className="text-4xl cursor-pointer"
          onClick={() => setAddproduct(true)}
        />
      </div>
      <table className="w-full border border-gray-200">
        <thead className="text-center bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-md">PRODUCT NAME</th>
            <th className="px-4 py-2 text-md">QUANTITY</th>
            <th className="px-4 py-2 text-md">PRICE</th>
            <th className="px-4 py-2 text-md">CATEGORY</th>
            <th className="px-4 py-2 text-md">DESCRIPTION</th>
            <th className="px-4 py-2 text-md">IMAGE</th>
            <th className="px-4 py-2 text-md">EDIT/DELETE</th>
          </tr>
        </thead>
        <tbody>
          {products
            .slice()
            .reverse()
            .map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-300">
                <td className="px-3 py-2 text-md text-center ">
                  {product.name}
                </td>
                <td className="px-3 py-2 text-md text-center">
                  {product.quantity}
                </td>
                <td className="px-3 py-2 text-md text-center">
                  ₹ {product.price}
                </td>
                <td className="px-3 py-2 text-md text-center">
                  {product.category}
                </td>
                <td className="px-3 py-2 text-md text-center">
                  {product.description}
                </td>
                <td className="px-3 py-2 text-md text-center">
                  <div className="flex justify-center">
                    <img
                      src={product.url}
                      alt={product.name}
                      className="w-20 h-20 md:w-32 md:h-32 object-cover rounded"
                    />
                  </div>
                </td>
                <td className="px-3 py-2 text-md text-center ">
                  <div className="space-y-4">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-2 rounded text-xs md:text-sm w-20"
                      onClick={() => setEditProduct(product)}
                    >
                      Edit
                    </button>
                    <br />
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded text-xs md:text-sm w-20"
                      onClick={() => dispatch(deleteProduct(product._id))}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* pagination */}
      <div className="flex justify-center items-center mt-10 space-x-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`py-2 px-4 rounded bg-gray-500 text-white ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
            }`}
        >
          Previous
        </button>
        {[...Array(pagination.totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`py-2 px-4 rounded ${page === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300 hover:bg-gray-400"
              }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === pagination.totalPages}
          className={`py-2 px-4 rounded bg-gray-500 text-white ${page === pagination.totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-600"
            }`}
        >
          Next
        </button>
      </div>

      {addProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className='bg-white rounded-lg p-6 relative max-w-lg w-full h-3/4 overflow-y-auto"'>
            <IoMdClose
              className="absolute top-2 right-2 cursor-pointer text-2xl"
              onClick={() => setAddproduct(false)}
            />
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ setFieldValue }) => (
                <Form className="space-y-4">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="font-semibold">
                      Name
                    </label>
                    <Field
                      name="name"
                      type="text"
                      placeholder="Enter the Name"
                      className="border border-gray-300 rounded p-2"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="price" className="font-semibold">
                      Price
                    </label>
                    <Field
                      name="price"
                      type="number"
                      placeholder="Enter the Price"
                      className="border border-gray-300 rounded p-2"
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="quantity" className="font-semibold">
                      Quantity
                    </label>
                    <Field
                      name="quantity"
                      type="number"
                      placeholder="Enter the Quantity"
                      className="border border-gray-300 rounded p-2"
                    />
                    <ErrorMessage
                      name="quantity"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="category" className="font-semibold">
                      Category
                    </label>
                    <Field
                      name="category"
                      type="text"
                      placeholder="Enter the category"
                      className="border border-gray-300 rounded p-2"
                    />
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="description" className="font-semibold">
                      Description
                    </label>
                    <Field
                      name="description"
                      type="text"
                      placeholder="Enter the category"
                      className="border border-gray-300 rounded p-2"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="file" className="font-semibold">
                      Product Image
                    </label>
                    <input
                      name="file"
                      type="file"
                      accept="image/*"
                      onChange={(event) => setFieldValue("file", event.currentTarget.files[0])}
                      className="border border-gray-300 rounded p-2"
                    />

                  </div>

                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Submit
                  </button>

                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
      {editProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className='bg-white rounded-lg p-6 relative max-w-lg w-full h-3/4 overflow-y-auto'>
            <IoMdClose
              className="absolute top-2 right-2 cursor-pointer text-2xl"
              onClick={() => setEditProduct(null)}
            />
            <Formik
              initialValues={editProduct}  // Set the initial values to the product being edited
              validationSchema={validationSchema}
              onSubmit={editSubmit}
            >
              {({ setFieldValue, resetForm }) => (
                <Form className="space-y-4">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="font-semibold">Name</label>
                    <Field
                      name="name"
                      type="text"
                      placeholder="Enter the Name"
                      className="border border-gray-300 rounded p-2"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="price" className="font-semibold">Price</label>
                    <Field
                      name="price"
                      type="number"
                      placeholder="Enter the Price"
                      className="border border-gray-300 rounded p-2"
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="quantity" className="font-semibold">Quantity</label>
                    <Field
                      name="quantity"
                      type="number"
                      placeholder="Enter the Quantity"
                      className="border border-gray-300 rounded p-2"
                    />
                    <ErrorMessage
                      name="quantity"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="category" className="font-semibold">Category</label>
                    <Field
                      name="category"
                      type="text"
                      placeholder="Enter the Category"
                      className="border border-gray-300 rounded p-2"
                    />
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="description" className="font-semibold">Description</label>
                    <Field
                      name="description"
                      type="text"
                      placeholder="Enter the Description"
                      className="border border-gray-300 rounded p-2"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="file" className="font-semibold">Image</label>
                    <input
                      name="file"
                      type="file"
                      onChange={(event) => setFieldValue("file", event.currentTarget.files[0])}
                      className="border border-gray-300 rounded p-2"
                    />
                  </div>
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Update Product
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProduct;


