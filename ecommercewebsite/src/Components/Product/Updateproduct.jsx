import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {toast} from "react-hot-toast";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { getCookie } from "../User/utils";
function Updateproduct() {
  var token = getCookie("token");
  var { id } = useParams();
  var userid = JSON.parse(localStorage.getItem("id"));
  const navigate = useNavigate();
  const [category,setCategory]=useState("");
  const [featured,setFeatured]=useState(true);
  const [inputData, setInputData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    productimage: "",
    userId: "",
  });
  const [productData, setProductData] = useState([]);
  const url = `https://localhost:7027/api/Product/Product/UpdateProduct/${id}`;
  useEffect(() => {
    const url = `https://localhost:7027/api/Product/Product/GetById/${id}`;
    axios
      .get(url)
      .then((result) => {
        console.log(result);
        setInputData({
          name: result.data.name,
          description: result.data.description,
          price: result.data.price,
          stock: result.data.stock,
          productimage: result.data.productimage,
          userId: userid,
        });
        
        setCategory(result.data.category);
        setFeatured(result.data.featured);
        
      })
      .catch((error) => {
        console.log(error);
        
      });
  }, []);
  console.log(inputData)

  function handleData(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }
  function handleSubmit(e)
  {
    e.preventDefault();
    if(!inputData.name || !inputData.description || !inputData.price || !inputData.stock || !inputData.productimage || !inputData.userId || !category || !featured)
    {
      alert("All Fields are Mandatory");
    }
    else
    {
      const data={
        name:inputData.name,
        description:inputData.description,
        price:inputData.price,
        stock:inputData.stock,
        productimage:inputData.productimage,
        userId:inputData.userId,
        category:category,
        featured:featured,
      };
      axios.put(url,data,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result)=>{
        console.log(result);
        toast.success("Product Updated Successfully");
      })
      .catch((error)=>{
        console.log(error)
        toast.error("Error1");
      })
    }
  }
  return (
    <Navbar>
      <div className="mt-4 mx-auto flex border-2 w-7/12 h-full shadow flex-col justify-center items-center bg-white">
        <h1 className="text-2xl text-blue-500 py-10 px-10">Update Product</h1>
        <div className="w-full h-full flex flex-row px-10 p5-10">
          <form className="space-y-6 w-full h-screen" onSubmit={handleSubmit}>
            <div className="w-full flex flex-row justify-between">
              <div className="w-1/3">
                <label
                  htmlFor="text"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <input
                    maxLength={20}
                    id="name"
                    name="name"
                    type="text"
                    value={inputData.name}
                    onChange={handleData}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  />
                </div>
              </div>

              <div className="w-2/3 mx-20">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Product Description
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    maxLength={100}
                    id="description"
                    name="description"
                    type="text"
                    value={inputData.description}
                    onChange={handleData}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="text"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
              </div>
              <div className="mt-2">
                <input
                  maxLength={4}
                  id="price"
                  name="price"
                  type="text"
                  value={inputData.price}
                  onChange={handleData}
                  className="block w-1/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="text"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
              </div>
              <div className="mt-2 mb-2">
                <input
                  maxLength={10}
                  id="stock"
                  name="stock"
                  type="text"
                  value={inputData.stock}
                  onChange={handleData}
                  className="block w-1/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="text"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Image
                </label>
              </div>
              <div className="mt-2 mb-2">
                <input
                  id="productimage"
                  name="productimage"
                  type="text"
                  value={inputData.productimage}
                  onChange={handleData}
                  className="block w-1/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="text"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
              </div>
              <div className="mt-2 mb-2">
                
              <select value={category}  onChange={(e) => setCategory(e.target.value)} className="block w-1/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2">
                <option value="">Choose Role</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                </select>
              </div>
            </div>



            <div className="mt-6">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="text"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Featured
                </label>
              </div>
              <div className="mt-2 mb-2">
                
              <select value={featured}  onChange={(e) => setFeatured(e.target.value)} className="block w-1/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2">
                <option value="">Choose Featured</option>
                  <option value={true}>True</option>
                  <option value={false}>False</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="mx-auto mt-12 flex w-1/3 justify-center rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update Product
            </button>
          </form>
        </div>
      </div>
    </Navbar>
  );
}

export default Updateproduct;
