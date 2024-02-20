import React, { useEffect } from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateProductForm() {
    var id = JSON.parse(localStorage.getItem("id"));
    const navigate = useNavigate();
    const {productid} = useParams();
    var data={name:"",description:"",price:"",stock:"",productimage:"",userId:"",category:"",featured:true};
    const [productData,setProductData]=useState([]);
    const [inputData,setInputData]=useState(data);
    const url=`https://localhost:7027/api/Product/Product/GetById/${id}`;
    useEffect(()=>{
        axios.get(url)
        .then((result)=>{
            console.log(result);
            setProductData(result.data);
            setInputData({
                name:result.data.name,
                description:result.data.description,
                price:result.data.price,
                stock:result.data.stock,
                productimage:result.data.productimage,
                userId:result.data.userId,
                category:result.data.category,
                featured:result.data.featured,
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    })
    function handleData(e) {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    }
    function handleSubmit(e)
    {
        e.preventDefault();
        if (!inputData.name || !inputData.description || !inputData.price || !inputData.stock || !inputData.productimage || !inputData.userId || !inputData.category || !inputData.featured) {
            alert("All Fields are Mandatory");
          }
        else{
            const url=`https://localhost:7027/api/Product/Product/UpdateProduct/${productid}`
            var data = {
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
              .put(url,data)
              .then((result)=>{
                console.log("Updated Successfully");
                console.log(result)
                setTimeout(()=>{
                  navigate('/')
                  window.location.reload();
                },1000)
                toast.success("Product Updated Sucessfully");
              })
              .catch((error) => {
                console.log(error);
              });
        }
    }
  return (
    <div>
        <Navbar>
        <div className='flex border w-1/2 h-1/3 shadow flex-col justify-center items-center'>
        <h1 className='text-2xl text-black py-10 px-10'>User Dashboard</h1>
        <div className='w-full h-full flex flex-row px-10 p5-10 justify-center items-center'>
        <form className="space-y-6 w-1/2 h-screen"
        onSubmit={handleSubmit}>

            {/* Name */}
            <div>
              <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                Product Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  placeholder='Name'
                  type="text"
                  value={inputData.name}
                  onChange={handleData}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  
                />
              </div>
            </div>
            {/* Description */}
            <div  className='mt-6'>
              <div className="flex items-center justify-between">
                <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                  Enter New Description
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="description"
                  placeholder='description'
                  name="description"
                  type="text"
                  value={inputData.description}
                  onChange={handleData}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"  
                />
              </div>
            </div>
            {/* price */}
            <div className='mt-6'>
              <div className="flex items-center justify-between">
                <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                    Enter new price
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="price"
                  placeholder='Enter New Price'
                  name="price"
                  type="text"
                  value={inputData.price}
                  onChange={handleData}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  
                />
              </div>
              </div>
              

              <div className='mt-6'>
              <div className="flex items-center justify-between">
                <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                    Total Stocks
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="stock"
                  placeholder='Enter new Stocks of Product'
                  name="stock"
                  type="text"
                  value={inputData.stock}
                  onChange={handleData}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
              </div>

              <div className='mt-6'>
              <div className="flex items-center justify-between">
                <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                    Add new Product Image
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="productimage"
                  placeholder='Enter new Product Image'
                  name="productimage"
                  type="text"
                  value={inputData.productimage}
                  onChange={handleData}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
              </div>

              <div className='mt-6'>
              <div className="flex items-center justify-between">
                <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                    Is it a Featured Product
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="featured"
                  placeholder='Is is a featured product'
                  name="featured"
                  type="text"
                  value={inputData.featured}
                  onChange={handleData}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
              </div>

            <div>
              <button
                type="submit"
                className="mt-6 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update Product
              </button>
            </div>
          </form>
          </div>
    </div>
    </Navbar>
    </div>
  )
}

export default UpdateProductForm