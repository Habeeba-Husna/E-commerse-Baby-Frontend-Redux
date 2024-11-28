import React, { useContext, useMemo } from "react";
import { UserContext } from "../../Context/UserContext";
import { Admincontext } from "./AdminContext";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);


const Dashboard = () => {
  const { products } = useContext(UserContext) || {};
  const { users } = useContext(Admincontext) || {};

  const totalUsers = users.length;
  const totalProducts = products.length;

  const productStats = useMemo(
    () => ({
      totalProducts: products?.length || 0,
      categoryCounts: products?.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      }, {}),
      totalEmptyProducts:
        products?.filter((item) => Number(item.quantity) === 0)?.length || 0,
      lessProducts: products?.filter((item) => item.quantity < 20) || [],
    }),
    [products]
  );

 // true  means blocked
const blockCount = useMemo(() => 
  (users || []).filter((user) => user.status).length,
  [users]
);

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

  const pieData = {
    labels: Object.keys(productStats.categoryCounts || {}),  //category names
    datasets: [
      {
        label: "Product Categories",
        data: Object.values(productStats.categoryCounts || {}),  //category counts
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-2">
      <h1 className="font-bold text-4xl text-rose-500 mb-10">
        Dashboard Overview
      </h1>
        {/* Summary Section for Users and Products */}
        <div className="flex gap-6 mb-10 w-[90%] max-w-screen-lg justify-center">
        <div className="p-4 bg-gray-400 text-white rounded-lg shadow flex flex-col items-center space-y-2 w-64 font-bold hover:shadow-xl transition-shadow">
          <p> Users: {totalUsers} </p>
        </div>
        <div className="p-4 bg-gray-400 text-white rounded-lg shadow flex flex-col items-center space-y-2 w-64 font-bold hover:shadow-xl transition-shadow">
          <p> Products: {totalProducts} </p>
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
    // </div>
    // </div>
  );
};

export default Dashboard;




// import React, { useContext ,useMemo} from 'react';
// import { UserContext } from '../../Context/UserContext';
// import { Admincontext } from './AdminContext';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// // Register Chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend);

// const Dashboard = () => {
//   const { products } = useContext(UserContext) || {}; // Handle undefined context
//   const { users } = useContext(Admincontext) || {}; // Handle undefined context
//   // const id = localStorage.getItem("id");



//   // // Safely access length and filter products
//   // const totalProducts = products?.length || 0;
//   // const totalFootwearProducts = products?.filter(item => item.category === 'Footwear')?.length || 0;
//   // const totalToysProducts = products?.filter(item => item.category === 'Toys')?.length || 0;
//   // const totalGirlFashionProducts = products?.filter(item => item.category === 'Girl Fashion')?.length || 0;
//   // const totalBoyFashionProducts = products?.filter(item => item.category === 'Boy Fashion')?.length || 0;
//   // const totalHealthProducts = products?.filter(item => item.category === 'Health')?.length || 0;
//   // const totalNurseryProducts = products?.filter(item => item.category === 'Nursery')?.length || 0;
//   // const totalFeedingProducts = products?.filter(item => item.category === 'Feeding')?.length || 0;
//   // const totalBathProducts = products?.filter(item => item.category === 'Bath')?.length || 0;



//  const productStats = useMemo(() => ({
//     totalProducts: products?.length || 0,
//     categoryCounts: products?.reduce((acc, product) => {
//       acc[product.category] = (acc[product.category] || 0) + 1;
//       return acc;
//     }, {}),
//     totalEmptyProducts: products?.filter(item => Number(item.quantity) === 0)?.length || 0,
//     lessProducts: products?.filter(item => item.quantity < 10) || [],
//   }), [products]);

//   const salePrice = useMemo(() => (
//     users?.reduce((acc, user) => acc + (user.order?.reduce((sum, order) => sum + order.total, 0) || 0), 0) || 0
//   ), [users]);
 
//   // const totalOrder = users?.flatMap(user => user.order) || [];
//   // const categoryCounts = totalOrder.reduce((acc, order) => {
//   //   order.items.forEach((item) => {
//   //     if (acc[item.category]) {
//   //       acc[item.category] += item.quantity;
//   //     } else {
//   //       acc[item.category] = item.quantity;
//   //     }
//   //   });
//   //   return acc;
//   // }, {});

  
  
//   const pieData = {
//     labels: Object.keys(productStats.categoryCounts || {}),
//     datasets: [
//       {
//         label: "Product Categories",
//         data: Object.values(productStats.categoryCounts || {}),
//         backgroundColor: [
//           "#FF6384", "#36A2EB", "#FFCE56", "#8A2BE2", "#00FA9A", "#FF7F50", "#6495ED"
//         ],
//         hoverBackgroundColor: [
//           "#FF6384", "#36A2EB", "#FFCE56", "#8A2BE2", "#00FA9A", "#FF7F50", "#6495ED"
//         ],
//       },
//     ],
//   };

//   const pieOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: 'right' },
//       tooltip: { enabled: true },
//     },
//   };
//   return (
//     <div className="container mx-auto px-4 py-6">
//       <h1 className="text-center font-bold text-3xl text-rose-400">Full Details</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
//         {Object.keys(productStats.categoryCounts || {}).map(category => (
//           <div key={category} className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-4">
//             <p className="text-lg font-semibold">{category}: {productStats.categoryCounts[category]}</p>
//           </div>
//         ))}
//         <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-4">
//           <p className="text-lg font-semibold">Empty Products: {productStats.totalEmptyProducts}</p>
//         </div>
//         <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-4">
//           <p className="text-lg font-semibold">Sale Price: ${salePrice.toFixed(2)}</p>
//         </div>
//       </div>

//       <div className="flex flex-col lg:flex-row mt-10 gap-6">
//         <div className="lg:w-1/2 w-full">
//           <h3 className="text-center font-bold text-xl text-blue-600">Stock Out</h3>
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border px-4 py-2">Product</th>
//                 <th className="border px-4 py-2">Quantity</th>
//               </tr>
//             </thead>
//             <tbody>
//               {productStats.lessProducts.map(product => (
//                 <tr key={product.id} className={`${product.quantity === 0 ? 'bg-red-100' : ''} hover:bg-gray-100`}>
//                   <td className="border px-4 py-2">{product.name}</td>
//                   <td className="border px-4 py-2">{product.quantity}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="lg:w-1/2 w-full">
//           <h3 className="text-center font-bold text-xl text-blue-600">Orders Data</h3>
//           <div className="mt-5">
//             <Pie data={pieData} options={pieOptions} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );


//   // return (
//   //   <div className="container mx-auto px-4 py-6">
//   //     <h1 className="text-center font-bold mt-2 text-rose-400 text-3xl">Full Details</h1>
      
//   //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
//   //       <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-4">
//   //         <p className="text-lg font-semibold">Users: {totalUsers}</p>
//   //       </div>

//   //       <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-4">
//   //         <p className="text-lg font-semibold">Products: {totalProducts}</p>
//   //       </div>

//   //       <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-4">
//   //         <p className="text-lg font-semibold">Footwear: {totalFootwearProducts}</p>
//   //       </div>

//   //       <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-4">
//   //         <p className="text-lg font-semibold">Toys: {totalToysProducts}</p>
//   //       </div>

//   //       <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-4">
//   //         <p className="text-lg font-semibold">Girl Fashion: {totalGirlFashionProducts}</p>
//   //       </div>

//   //       <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-4">
//   //         <p className="text-lg font-semibold">Boy Fashion: {totalBoyFashionProducts}</p>
//   //       </div>

//   //       <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-4">
//   //         <p className="text-lg font-semibold">Health: {totalHealthProducts}</p>
//   //       </div>

//   //       <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-4">
//   //         <p className="text-lg font-semibold">Nursery: {totalNurseryProducts}</p>
//   //       </div>

//   //       <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-4">
//   //         <p className="text-lg font-semibold">Feeding: {totalFeedingProducts}</p>
//   //       </div>

//   //       <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-4">
//   //         <p className="text-lg font-semibold">Bath: {totalBathProducts}</p>
//   //       </div>

//   //       <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-4">
//   //         <p className="text-lg font-semibold">Empty Products: {totalEmptyProducts}</p>
//   //       </div>

//   //       <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-4">
//   //         <p className="text-lg font-semibold">Sale Price: ${salePrice.toFixed(2)}</p>
//   //       </div>
//   //     </div>

//   //     <div className="flex flex-col lg:flex-row mt-10 gap-6">
//   //       <div className="lg:w-1/2 w-full">
//   //         <h3 className="text-center font-bold text-xl text-blue-600">Stock Out</h3>
//   // <table className="mt-5 w-full border-collapse border border-gray-300 text-left text-sm">
//   // <thead>
//   //   <tr className="bg-gray-200">
//   //     <th className="px-4 py-2 text-left">Name</th>
//   //     <th className="px-4 py-2 text-left">Category</th>
//   //     <th className="px-4 py-2 text-left">Quantity</th>
//   //   </tr>
//   // </thead>
//   // <tbody>
//   //   {lessProducts.map((product) => (
//   //     <tr key={product.id} className="hover:bg-gray-100">
//   //       <td className="px-4 py-2">{product.name}</td>
//   //       <td className="px-4 py-2">{product.category}</td>
//   //       <td className="px-4 py-2">{product.quantity}</td>
//   //     </tr>
//   //   ))}
//   // </tbody>
//   // </table> 
      

//   //       </div>

//   //       <div className="lg:w-1/2 w-full">
//   //         <h3 className="text-center font-bold text-xl text-blue-600">Orders Data</h3>
//   //         <div className="mt-5">
//   //           <Pie data={pieData} options={pieOptions} />
//   //         </div>
//   //       </div>
//   //     </div>
//   //   </div>
//   // );
// };

// export default Dashboard;
