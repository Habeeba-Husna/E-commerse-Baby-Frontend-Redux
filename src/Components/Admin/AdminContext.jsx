import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

import { UserContext } from '../../Context/UserContext';


export const Admincontext = createContext();

const AdminContextProvider = ({children}) => {
  

const {products,setProducts} = useContext(UserContext)
const [users , setUsers] = useState([]) 
 

useEffect (() => {
    async function fetchUser(){
        try {
            const response = await axios.get(`http://localhost:3001/user`);
            setUsers(response.data);
        }
        catch(error){
            console.log(error.message);
            
        }
    }
    fetchUser();
},[]);

// const Block = async(id,status) =>{
//     try{
//         await axios.patch(`http://localhost:3001/user/${id}`,{status : !status})
//         setUser(User.map((userlist) => (userlist.id === id ? {...userlist , status : !status} : {...userlist})))
//     }
//     catch(error){
//         console.log(error.message);
        
//     }
// }


const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
    } catch (error) {
      console.log("Error fetching products:", error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  
  

    const editFormData=async(product)=>{
        try{
            
            
            const id =product.id
             const response=await axios.put(`http://localhost:5000/products/${id}`,product)
             setProducts((prevProducts) =>
                prevProducts.map((item) => (item.id === id ? product : item))
              );
             
             toast.success("product updated successfully")
        }
        catch(error){
            console.log(error.message);
        }
    }

    const DeleteProduct = async(id) => {
       
        
        try{
            await axios.delete(`http://localhost:5000/products/${id}`);
            setProducts((prevProducts) =>prevProducts.filter((product) => product.id !== id)
        );
            toast.success('Product deleted successfully....')
        }
        catch(error){
            // console.error("Error deleting product:", error);
            toast.error(`Error deleting product: ${error.response?.data?.message || error.message}`);
        }
    }

      const addingData = async (newProduct) => {
        try {
            const response = await axios.post(`http://localhost:5000/products`, newProduct);
            // 
            setProducts([...products, response.data]);
            toast.success("Product added successfully!");
        } catch (error) {
            console.error("Error adding product:", error.message);
            toast.error("Failed to add product. Please try again.");
        }
    };
    


  return (
    <Admincontext.Provider value={ {products,editFormData , DeleteProduct , addingData}}>
        {children}
    </Admincontext.Provider>
  )
}

export default AdminContextProvider


