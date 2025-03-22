import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../features/productSlice';
import { getAllUsers, totalRevenue } from '../../features/adminSlice';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminHome = () => {
    const dispatch = useDispatch();
    const { user, totalRevenues } = useSelector((state) => state.user);
    const { products } = useSelector((state) => state.product);
    console.log("helloiiiii",products)

    useEffect(() => {
        dispatch(getAllProducts({}));
        dispatch(getAllUsers({}));
        dispatch(totalRevenue());
    }, [dispatch]);

    const productStats = useMemo(() => {
        return {
            categoryCounts: products?.reduce((acc, product) => {
                acc[product.category] = (acc[product.category] || 0) + 1;
                return acc;
            }, {}),
        };
    }, [products]);

    const pieData = {
        labels: Object.keys(productStats.categoryCounts || {}),
        datasets: [
            {
                label: 'Product Categories',
                data: Object.values(productStats.categoryCounts || {}),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#8A2BE2', '#00FA9A', '#FF7F50', '#6495ED'
                ],
                hoverBackgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#8A2BE2', '#00FA9A', '#FF7F50', '#6495ED'
                ],
            },
        ],
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'right' },
            tooltip: { enabled: true },
        },
    };

    if (!user || !products) {
        return <p>Loading...</p>;
    }

    return (
        <div className="bg-gray-300 min-h-screen p-8 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-8 text-black">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl">
                <div className="bg-gray-500 hover:bg-green-500 p-6 rounded-lg shadow-md text-white">
                    <Link to="/adminuser">
                        <h2 className="text-xl font-bold mb-2">Total Users</h2>
                        <p className="text-2xl font-bold">{user.length}</p>
                    </Link>
                </div>
                <div className="bg-gray-500 hover:bg-green-500 p-6 rounded-lg shadow-md text-white">
                    <Link to="/adminproduct">
                        <h2 className="text-xl font-bold mb-2">Total Products</h2>
                        <p className="text-2xl font-bold">{products.length}</p>
                    </Link>
                </div>
                <div className="bg-gray-500 hover:bg-green-500 p-6 rounded-lg shadow-md text-white">
                    <h2 className="text-xl font-bold mb-2">Sale Price</h2>
                    <p className="text-2xl font-bold">₹ {totalRevenues}</p>
                </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg mt-8 w-full max-w-lg">
                <h3 className="text-center text-2xl font-bold text-blue-600 mb-6">Product Category Distribution</h3>
                <div className="w-full h-80 flex justify-center items-center">
                    <Pie data={pieData} options={pieOptions} />
                </div>

            </div>
        </div>
    );
};

export default AdminHome;