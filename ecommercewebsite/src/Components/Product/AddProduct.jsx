import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getCookie } from '../User/utils';

function AddProduct() {
  var token = getCookie("token");
  var id = JSON.parse(localStorage.getItem("id"));
  const navigate = useNavigate();
  var data={name:"",description:"",price:"",stock:"",productimage:"",category:"",featured:true};
    const [inputData,setInputData]=useState(data);
    function handleData(e) {
      setInputData({ ...inputData, [e.target.name]: e.target.value });
      console.log(inputData)
    }
    function handleSubmit(e)
    {
      e.preventDefault();
      if (!inputData.name || !inputData.description || !inputData.price || !inputData.stock || !inputData.productimage  || !inputData.category)
      {
        alert("All Fields are Mandatory");
        console.log(inputData)
      } 
      else
      {
        console.log(inputData)
        const url='https://localhost:7027/api/Product/CreateProduct';
        var data={
          name:inputData.name,
          description:inputData.description,
          price:inputData.price,
          stock:inputData.stock,
          productimage:inputData.productimage,
          userId:id,
          category:inputData.category,
          featured:inputData.featured,
        };
        axios
        .post(url,data,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result)=>{
          console.log(result);
          // navigate('/');
          setTimeout(()=>{
            navigate('/')
            window.location.reload();
          },1000)
          toast.success("Product Added Sucessfully");
        })
        .catch((error) => {
          console.log(error);
        });
      }
    }
  return (
    <Navbar>
    <div className='mx-auto flex border w-3/4 h-full shadow flex-col justify-center items-center bg-white'>
        <h1 className='text-2xl text-black py-10 px-10'>Add Product</h1>
        <div className='w-full h-full flex flex-row px-10 p5-10'>
        <form className="space-y-6 w-full h-screen"
        onSubmit={handleSubmit}>
          <div className='w-full flex flex-row justify-between'>
            <div className='w-1/3'>
              <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                Product Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  maxLength={20}
                  name="name"
                  type="text"
                  value={inputData.name}
                  onChange={handleData}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  
                />
              </div>
            </div>

            <div  className='w-2/3 mx-20'>
              <div className="flex items-center justify-between">
                <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                  Product Description
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="description"
                  maxLength={50}
                  name="description"
                  type="text"
                  value={inputData.description}
                  onChange={handleData}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  
                />
              </div>
            </div>
            </div>
            
            <div className='mt-6'>
              <div className="flex items-center justify-between">
                <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                    Price
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="price"
                  maxLength={10}
                  name="price"
                  type="text"
                  value={inputData.price}
                  onChange={handleData}
                  className="block w-1/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  
                />
              </div>
              </div>
              <div className='mt-6'>
              <div className="flex items-center justify-between">
                <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                  Stock
                </label>
              </div>
              <div className="mt-2 mb-2">
                <input
                  id="stock"
                  maxLength={40}
                  name="stock"
                  type="text"
                  value={inputData.stock}
                  onChange={handleData}
                  className="block w-1/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  
                />
              </div>
            </div>

            <div className='mt-6'>
              <div className="flex items-center justify-between">
                <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                  Image URL
                </label>
              </div>
              <div className="mt-2 mb-2">
                <input
                  id="productimage"
                  maxLength={100}
                  name="productimage"
                  type="text"
                  value={inputData.productimage}
                  onChange={handleData}
                  className="block w-1/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  
                />
              </div>
            </div>

            <div className='mt-6'>
              <div className="flex items-center justify-between">
                <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                  Category
                </label>
              </div>
              <div className="mt-2 mb-2">
                <input
                  id="category"
                  maxLength={10}
                  name="category"
                  type="text"
                  value={inputData.category}
                  onChange={handleData}
                  className="block w-1/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  
                />
              </div>
            </div>

            
              <button
                type="submit"
                className="mx-64 mt-12 flex w-1/3 justify-center rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Product
              </button>
            
          </form>
          </div>
    </div>
    </Navbar>
  )
}

export default AddProduct