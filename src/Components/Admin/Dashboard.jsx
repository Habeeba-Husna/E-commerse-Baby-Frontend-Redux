import React, { useMemo,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts,fetchUsers } from "../Redux/adminSlice"; 
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";


// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const dispatch = useDispatch();

  // Get state from Redux store
  const { products, status } = useSelector((state) => state.admin);
  const users = useSelector((state) => state.admin.users);
 
  useEffect(() => {
    if (status === "idle") {
      console.log("Dispatching fetch actions...");
      dispatch(fetchProducts());
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const totalUsers = users?.length || 0;

  const totalProducts = products?.length || 0;

  const productStats = useMemo(() => {
    return {
      totalProducts: products?.length || 0,
      categoryCounts: products?.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      }, {}),
      totalEmptyProducts:
        products?.filter((item) => Number(item.quantity) === 0)?.length || 0,
      lessProducts: products?.filter((item) => item.quantity < 20) || [],
    };
  }, [products]);

  const blockCount = useMemo(() => (users || []).filter((user) => user.status === "blocked").length, [users]);

  const salePrice = useMemo(() => {
    if (!users || users.length === 0) {
      return 0;
    }
    return users.reduce((acc, user) => {
      const userTotal = user?.order?.reduce(
        (sum, order) => sum + (order?.total || 0),
        0
      );
      return acc + userTotal;
    }, 0);
  }, [users]);
  

  
  console.log("Sale Price:", salePrice);
  
  const pieData = {
    labels: Object.keys(productStats.categoryCounts || {}),
    datasets: [
      {
        label: "Product Categories",
        data: Object.values(productStats.categoryCounts || {}),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#8A2BE2",
          "#00FA9A",
          "#FF7F50",
          "#6495ED",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#8A2BE2",
          "#00FA9A",
          "#FF7F50",
          "#6495ED",
        ],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "right" },
      tooltip: { enabled: true },
    },
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error loading data.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-2">
      <h1 className="font-bold text-4xl text-rose-500 mb-10">
        Dashboard Overview
      </h1>
      {/* Summary Section */}
      <div className="flex gap-6 mb-10 w-[90%] max-w-screen-lg justify-center">
        <div className="p-4 bg-gray-400 text-white rounded-lg shadow flex flex-col items-center space-y-2 w-64 font-bold hover:shadow-xl transition-shadow">
          <p>Users: {totalUsers}</p>
        </div>
        <div className="p-4 bg-gray-400 text-white rounded-lg shadow flex flex-col items-center space-y-2 w-64 font-bold hover:shadow-xl transition-shadow">
          <p>Products: {totalProducts}</p>
        </div>
      </div>




      {/* Category Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[90%] max-w-screen-lg mb-10 ">
        {Object.keys(productStats.categoryCounts || {}).map((category) => (
          <div
            key={category}
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center"
          >
            <p className="text-xl font-medium text-gray-700">
              {category}:{" "}
              <span className="text-indigo-600 font-bold">
                {productStats.categoryCounts[category]}
              </span>
            </p>
          </div>
        ))}
        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center">
          <p className="text-lg font-medium text-gray-700">
            Empty Products:{" "}
            <span className="text-red-500 font-bold">
              {productStats.totalEmptyProducts}
            </span>
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-lg transition-shadow text-center">
          <p className="text-lg font-medium text-gray-700">
            Blocked Users:{" "}
            <span className="text-red-500 font-bold">{blockCount}</span>
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-lg transition-shadow text-center">
          <p className="text-lg font-medium text-gray-700">
            Sale Price:{" "}
            <span className="text-green-500 font-bold">
              ${salePrice.toFixed(2)}
            </span>
          </p>
        </div>
      </div>

      {/* Detailed Sections */}
      <div className="flex flex-col lg:flex-row gap-8 w-[90%] max-w-screen-lg">
        {/* Stock Details */}
        <div className="lg:w-1/2 w-full bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-center text-2xl font-bold text-blue-600 mb-6">
            Low Stock Products
          </h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 font-medium">Product</th>
                <th className="border px-4 py-2 font-medium">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {productStats.lessProducts.map((product) => (
                <tr
                  key={product.id}
                  className={`${
                    product.quantity === 0 ? "bg-red-100" : ""
                  } hover:bg-gray-100`}
                >
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Orders Data */}
        <div className="lg:w-1/2 w-full bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-center text-2xl font-bold text-blue-600 mb-6">
            Orders Data
          </h3>
          <div className="flex justify-center items-center">
            <div className="w-[90%] lg:w-[90%]">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;





