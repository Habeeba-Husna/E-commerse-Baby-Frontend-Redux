import { useEffect, useState } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from '../features/productSlice';
import { addToCart } from "../features/cartSlice";
import { changeFavorite, getFavorite } from '../features/favouriteSlice';
import { fetchUserDetails } from "../features/authSlice";
import ProductDetails from '../User/ProductDetails';
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { favorite  } = useSelector((state) => state.favourite);
  const { products, pagination, loading, error,category } = useSelector(
    (state) => state.product
  );
  
  const { user } = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedCategory, setSelectedcategory] = useState("");
  const [search, setSearch] = useState("");

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPage(newPage);
    }
  };


  const handleCategory = (e) => {
    const selectedValue = e.target.value;
    console.log("Selected Category:", selectedValue);
    setSelectedcategory(selectedValue);
  
    if (selectedValue === "All") {
      setSelectedcategory("");
      dispatch(getAllProducts({ page, search }));
    } else {
      dispatch(getAllProducts({ category: selectedValue, page, search }));
    }
  };

  useEffect(() => {
    dispatch(getAllProducts({ page, categoryFilter }));
    dispatch(getFavorite());
    dispatch(fetchUserDetails());
  }, [dispatch, page, categoryFilter]);

  const handleAddToCart = (product) => {
    if (user) {
      dispatch(addToCart(product));
      toast.success("Added to cart successfully");
    } else {
      toast.error("Please login");
      navigate("/login");
    }
  };

  const handleFavorite = async (id) => {
    if (user) {
      dispatch(changeFavorite(id)).unwrap();
      toast.success("Updated Favorites");
    } else {
      toast.error("Please Login");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <div>
      <h1 className="font-bold text-3xl text-center mt-10 mb-10">Baby Products</h1>

      <div className="flex justify-end items-center mb-6">
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
      </div>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="border rounded-lg shadow-lg">
              <img
                src={product.url}
                alt={product.name}
                className="w-full h-60 rounded-t object-cover cursor-pointer"
                onClick={() => openModal(product)}
              />
              <h1 className="mt-2 text-lg font-semibold text-center">{product.name}</h1>
              <p className="mt-1 text-gray-700 text-center">₹ {product.price}</p>
              {product.quantity === 0 && (
                <span className="text-red-500 py-1 px-3">Out of Stock</span>
              )}
              <div className="flex items-center space-x-2 bg-gray-500">
                <button
                  className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleAddToCart(product._id);
                  }}
                >
                  Add to Cart
                </button>

                <button onClick={(e) => {
                  e.stopPropagation();
                  handleFavorite(product._id);
                }}>
                  {favorite.some((item) => item._id === product._id) ? (
                    <MdFavorite className="text-3xl text-red-500 hover:text-red-600 transition-colors duration-200" />
                  ) : (
                    <MdFavoriteBorder className="text-3xl text-red-700 hover:text-red-800 transition-colors duration-200" />
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center col-span-full">No products found.</div>
        )}
      </div>

      <ToastContainer autoClose={1000} />

      {/* Pagination */}
      <div className="flex justify-center items-center mt-10 space-x-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`py-2 px-4 rounded bg-gray-500 text-white ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"}`}
        >
          Previous
        </button>
        {[...Array(pagination.totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`py-2 px-4 rounded ${page === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300 hover:bg-gray-400"}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === pagination.totalPages}
          className={`py-2 px-4 rounded bg-gray-500 text-white ${page === pagination.totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"}`}
        >
          Next
        </button>
      </div>

      {/* ProductDetails Modal */}
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={closeModal}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default ProductList;

