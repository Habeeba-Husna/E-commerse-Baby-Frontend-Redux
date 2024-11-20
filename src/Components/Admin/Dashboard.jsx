// import React, { useContext } from 'react'
// import { UserContext } from '../../Context/UserContext';
// import { Admincontext } from './AdminContext';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// // Register Chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend);


// const Dashboard = () => {

//   const { products } = useContext(UserContext) || {}; // Handle undefined context;
//   const { users } = useContext(Admincontext) || {}; // Handle undefined context;
//   const id = localStorage.getItem("id")


//   // Safely access length and filter products
//   const totalProducts = products?.length || 0; // Use optional chaining and default to 0 if undefined
//   const totalFootwearProducts = products?.filter(item => item.category === 'Footwear')?.length || 0;
//   const totalToysProducts = products?.filter(item => item.category === 'Toys')?.length || 0;
//   const totalGirlFashionProducts = products?.filter(item => item.category === 'Girl Fashion')?.length || 0;
//   const totalBoyFashioProducts = products?.filter(item => item.category === 'Boy Fashion')?.length || 0;
//   const totalHealthProducts = products?.filter(item => item.category === 'Health')?.length || 0;
//   const totalNurseryProducts = products?.filter(item => item.category === 'Nursery')?.length || 0;
//   const totalFeedingProducts = products?.filter(item => item.category === 'Feeding')?.length || 0;
//   const totalBathProducts = products?.filter(item => item.category === 'Bath')?.length || 0;

//   const totalUsers = users?.length || 0;
// //   const block =User.filter(blockitem => blockitem.status === false);
// //   const blockCount = block.length;

//  // Additional safe checks
//  const totalemptyProducts = products?.filter(emptyitem => Number(emptyitem.quantity) === 0 )?.length || 0;
//  const lessProducts = products?.filter(lessitem => lessitem.quantity < 5) || [];

//  // Calculate sale price
//  const salePrice = users?.reduce((acc, cur) => acc + cur.order.reduce((acc, order) => acc + order.total, 0), 0) || 0;

//     // const { user ,totalOrder} = useContext(UserDataContext);
//     // const block=user.filter((user)=>user.status===false)
//     // const blockCount=block.length

//     // const categoryCounts = totalOrder.reduce((acc, order) => {
//     //   order.items.forEach((item) => {
//     //     if (acc[item.category]) {
//     //       acc[item.category] += item.quantity;
//     //     } else {
//     //       acc[item.category] = item.quantity;
//     //     }
//     //   });
//     //   return acc;
//     // }, {});

  
//     const data = {
//         labels: ['Red', 'Blue', 'Yellow'],
//         datasets: [
//           {
//             label: '# of Votes',
//             data: [12, 19, 3],
//             backgroundColor: ['#FF0000', '#0000FF', '#FFFF00'],
//             borderColor: ['#FF0000', '#0000FF', '#FFFF00'],
//             borderWidth: 1,
//           },
//         ],
//       };
    
//       const options = {
//         responsive: true,
//         plugins: {
//           legend: {
//             position: 'top',
//           },
//           tooltip: {
//             enabled: true,
//           },
//         },
//       };

 
// return (
// <div>
//       <h1 className='text-center font-bold mt-2  text-rose-400 text-3xl'>Full Details</h1>
//       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 mx-10'>
//       <div className="p-4 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-2 w-64 font-bold">
//         <p> Users : {totalUsers} </p>
//         </div>

//         <div className="p-4 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-2 w-64 font-bold">
//          <p> Products : {totalProducts} </p>
//         </div>

//         <div className="p-4 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-2 w-64 font-bold">
//         <p> FootwearProducts : {totalFootwearProducts} </p>
//         </div>

//         <div className="p-4 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-2 w-64 font-bold">
//         <p> ToysProducts : {totalToysProducts} </p>
//         </div>

//         <div className="p-4 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-2 w-64 font-bold">
//         <p> GirlFashionProducts : {totalGirlFashionProducts} </p>
//         </div>

//         <div className="p-4 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-2 w-64 font-bold">
//         <p> BoyFashionProducts : {totalBoyFashioProducts} </p>
//         </div>

//         <div className="p-4 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-2 w-64 font-bold">
//         <p> HealthProducts : {totalHealthProducts} </p>
//         </div>

//         <div className="p-4 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-2 w-64 font-bold">
//         <p> NurseryProducts : {totalNurseryProducts} </p>
//         </div>

//         <div className="p-4 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-2 w-64 font-bold">
//         <p> FeedingProducts : {totalFeedingProducts} </p>
//         </div>

//         <div className="p-4 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-2 w-64 font-bold">
//         <p> BathProducts : {totalBathProducts} </p>
//         </div>

       
//         <div className="p-4 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-2 w-64 font-bold">
//         <p> Emptyproducts : {totalemptyProducts} </p>
//         </div>
// {/* 
//         <div className="p-4 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-2 w-64 font-bold">
//         <p> Block : {blockCount} </p>
//         </div> */}

//         <div className="p-4 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-2 w-64 font-bold">
//         <p> SalePrice : {salePrice} </p>
//         </div>
//       </div>
      
//       <div className='flex flex-col md:flex-row m-6 mt-10'>
//         <div className='md:w-1/2 w-full md:mr-4'>
//           <h3 className='text-center font-bold mt-2  text-blue-600 text-3xl'>Stock Out</h3>
//           <table className='mt-5 w-full border-collapse border border-gray-300'>
//             <thead>
//               <tr className='bg-gray-200'>
//                 <th className='px-4 py-2 text-left'>Name</th>
//                 <th className='px-4 py-2 text-left'>Category</th>
//                 <th className='px-4 py-2 text-left'>Quantity</th>
//               </tr>
//             </thead>
//             <tbody>
//               {lessProducts.map((lessitems) => (
                
//                 <tr key={lessitems.id}>
//                   <td className='px-4 py-2'> {lessitems.name} </td>
//                   <td className='px-4 py-2'> {lessitems.category} </td>
//                   <td className='px-4 py-2'> {lessitems.quantity} </td>
//                 </tr>
                
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="md:w-1/2 w-full">
//      <h3 className="m-2 text-center">Orders Data</h3>
    
//      <div className="mb-8">
      
//        <Pie data={data} options={options} />
//      </div>
//    </div>
//       </div>
//     </div>
//   );

// }

// export default Dashboard






// //     <div>
// //     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
// //       <div className="p-4 bg-gray-100 rounded-lg shadow flex justify-center">
// //         {/* <p className="text-xl font-semibold">products: {product.length}</p> */}
// //       </div>
// //       <div className="p-4 bg-gray-100 rounded-lg shadow flex justify-center">
// //         {/* <p className="text-xl font-semibold">Empty products: {emptyProduct.length}</p> */}
// //       </div>
// //       <div className="p-4 bg-gray-100 rounded-lg shadow flex justify-center">
// //         {/* <p className="text-xl font-semibold">user: {user.length}</p> */}
// //       </div>
// //       <div className="p-4 bg-gray-100 rounded-lg shadow flex justify-center">
// //         {/* <p className="text-xl font-semibold">Blocked user: {blockCount}</p> */}
// //       </div>
// //       <div className="p-4 bg-gray-100 rounded-lg shadow flex justify-center">
// //         {/* <p className="text-xl font-semibold">sale price: {salePrice}</p> */}
// //       </div>
// //     </div>
// //     <div className="flex flex-col md:flex-row">
// //   <div className="md:w-1/2 w-full md:mr-4">
// //     <h3 className="m-2 text-center">Stock Out</h3>
// //     <table className="w-full text-sm text-left rtl:text-right text-gray-900 my-2">
// //       <thead className="text-xs text-white uppercase bg-gray-800">
// //         <tr>
// //           <th className="px-3 py-2">Name</th>
// //           <th className="px-3 py-2">Category</th>
// //           <th className="px-3 py-2">Quantity</th>
// //         </tr>
// //       </thead>
// //       {/* <tbody>
// //         {lessProduct.map((product) => (
// //           <tr key={product.id} className="hover:bg-gray">
// //             <td className="px-3 py-2">{product.name}</td>
// //             <td className="px-3 py-2">{product.category}</td>
// //             <td className="px-3 py-2">{product.quantity}</td>
// //           </tr>
// //         ))}
// //       </tbody> */}
// //     </table>
// //   </div>
// //   <div className="md:w-1/2 w-full">
// //     <h3 className="m-2 text-center">Orders Data</h3>
    
// //     <div className="mb-8">
      
// //       <Pie data={data} options={options} />
// //     </div>
// //   </div>
// // </div>

// //     </div>




import React, { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { Admincontext } from './AdminContext';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { products } = useContext(UserContext) || {}; // Handle undefined context
  const { users } = useContext(Admincontext) || {}; // Handle undefined context
  const id = localStorage.getItem("id");

  // Safely access length and filter products
  const totalProducts = products?.length || 0;
  const totalFootwearProducts = products?.filter(item => item.category === 'Footwear')?.length || 0;
  const totalToysProducts = products?.filter(item => item.category === 'Toys')?.length || 0;
  const totalGirlFashionProducts = products?.filter(item => item.category === 'Girl Fashion')?.length || 0;
  const totalBoyFashionProducts = products?.filter(item => item.category === 'Boy Fashion')?.length || 0;
  const totalHealthProducts = products?.filter(item => item.category === 'Health')?.length || 0;
  const totalNurseryProducts = products?.filter(item => item.category === 'Nursery')?.length || 0;
  const totalFeedingProducts = products?.filter(item => item.category === 'Feeding')?.length || 0;
  const totalBathProducts = products?.filter(item => item.category === 'Bath')?.length || 0;

  const totalUsers = users?.length || 0;
  
  // Additional safe checks
  const totalEmptyProducts = products?.filter(emptyitem => Number(emptyitem.quantity) === 0)?.length || 0;
  const lessProducts = products?.filter(lessitem => lessitem.quantity < 5) || [];

  // Calculate sale price
  const salePrice = users?.reduce((acc, cur) => acc + cur.order.reduce((acc, order) => acc + order.total, 0), 0) || 0;

  const data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3],
        backgroundColor: ['#FF0000', '#0000FF', '#FFFF00'],
        borderColor: ['#FF0000', '#0000FF', '#FFFF00'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-center font-bold mt-2 text-rose-400 text-3xl">Full Details</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-4">
          <p className="text-lg font-semibold">Users: {totalUsers}</p>
        </div>

        <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-4">
          <p className="text-lg font-semibold">Products: {totalProducts}</p>
        </div>

        <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-4">
          <p className="text-lg font-semibold">Footwear: {totalFootwearProducts}</p>
        </div>

        <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-4">
          <p className="text-lg font-semibold">Toys: {totalToysProducts}</p>
        </div>

        <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-4">
          <p className="text-lg font-semibold">Girl Fashion: {totalGirlFashionProducts}</p>
        </div>

        <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-4">
          <p className="text-lg font-semibold">Boy Fashion: {totalBoyFashionProducts}</p>
        </div>

        <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-4">
          <p className="text-lg font-semibold">Health: {totalHealthProducts}</p>
        </div>

        <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-4">
          <p className="text-lg font-semibold">Nursery: {totalNurseryProducts}</p>
        </div>

        <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-4">
          <p className="text-lg font-semibold">Feeding: {totalFeedingProducts}</p>
        </div>

        <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-4">
          <p className="text-lg font-semibold">Bath: {totalBathProducts}</p>
        </div>

        <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-4">
          <p className="text-lg font-semibold">Empty Products: {totalEmptyProducts}</p>
        </div>

        <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center space-y-4">
          <p className="text-lg font-semibold">Sale Price: ${salePrice.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row mt-10 gap-6">
        <div className="lg:w-1/2 w-full">
          <h3 className="text-center font-bold text-xl text-blue-600">Stock Out</h3>
          <table className="mt-5 w-full border-collapse border border-gray-300 text-left text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {lessProducts.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:w-1/2 w-full">
          <h3 className="text-center font-bold text-xl text-blue-600">Orders Data</h3>
          <div className="mt-5">
            <Pie data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
