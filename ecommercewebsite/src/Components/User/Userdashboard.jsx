import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar';
import {toast} from 'react-hot-toast'
import axios from 'axios';
import { getCookie } from './utils';
function Userdashboard() {
  
  const Role=getCookie("Role");
    var id = JSON.parse(localStorage.getItem("id"));
    var token = getCookie("token");
    const data={name:"",email:"",phone:""};
    const [userData,setUserData]=useState([]);
    const [message,setMessage]=useState("");
    const [valid,setValid]=useState(false);
    const [inputData,setInputData]=useState(data);
    const checkValidation=(e)=>{
      const rgExp=/^[0-9]{10}$/
      setInputData({ ...inputData, [e.target.name]: e.target.value });
      if(rgExp.test(e.target.value))
      {
        console.log(inputData.phone)
        setMessage("Phone Number is valid")
        setValid(true);
      }
      else if(e.target.value==="")
      {
        setValid(false);
        setMessage("Please Enter Your Number")
      }
      else if(!rgExp.test(e.target.value))
      {
        setValid(false);
        setMessage("Phone Number is not valid")
      }
      else{
        setMessage("");
      }
    }
    
    useEffect(()=>{
        const url=`https://localhost:7027/api/User/User/GetById/${id}`
        axios
        .get(url)
        .then((result)=>{
            console.log(result)
            setUserData(result.data);
            setInputData({
                name:result.data.name,
                email:result.data.email,
                phone:result.data.phone,
            });
        })
        .catch((error)=>{
          toast.error('Error');
            console.log(error)
        })
    },[])
    function handleData(e) {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    }
    function handleSubmit(e)
    {
      console.log(inputData.phone)
      console.log(Role);
      console.log(token);
      console.log(valid)
        e.preventDefault();
        if (!inputData.name || !inputData.email || !inputData.phone || !valid) {
            alert("All Fields are Mandatory");
          }
        else{
          const url = `https://localhost:7027/api/User/User/UpdateUser/${id}`;
            const data = {
                email: inputData.email,
                name: inputData.name,
                phone: inputData.phone,
                gender: userData.gender,
                role:Role,
              };
              axios
              .put(url, data, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((result)=>{
                //console.log("Updated Successfully");
                //console.log(result);
                toast.success("Update Successfully")
                //window.location.reload();
              })
              .catch((error) => {
                toast.error("Error")
                //console.log(error);
              });
        }
    }
  return (
    <div>
        <Navbar/>
        <div className='mt-4 border border-gray-200 mx-auto flex w-1/3 h-10/12 flex-col justify-center bg-white mb-10'>
        <h1 className='mx-auto mt-10 text-2xl text-blue-600 px-10 mb-14'>User Dashboard</h1>
        <div className='w-full h-full flex flex-row px-10  justify-center '>
        <form className="space-y-2 w-3/4 h-3/4"
        onSubmit={handleSubmit}>

            {/* Name */}
            <div>
              <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                User Name
              </label>
              <div className="mt-4">
                <input
                  id="name"
                  name="name"
                  maxLength={25}
                  placeholder='Name'
                  type="text"
                  required
                  value={inputData.name}
                  onChange={handleData}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  
                />
              </div>
            </div>
            {/* Email */}
            <div  className='mt-6'>
              <div className="flex items-center justify-between">
                <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                  User Email
                </label>
              </div>
              <div className="mt-4">
                <input
                  id="email"
                  maxLength={30}
                  placeholder='Email'
                  name="email"
                  type="email"
                  value={inputData.email}
                  onChange={handleData}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  
                />
              </div>
            </div>
            {/* Mobile Number */}
            <div className='mt-6'>
              <div className="flex items-center justify-between">
                <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                    Mobile Number
                </label>
              </div>
              <div className="mt-4">
                <input
                  id="phone"
                  maxLength={10}
                  placeholder='Mobile No.'
                  name="phone"
                  type="text"
                  value={inputData.phone}
                  onChange={checkValidation}
                  
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  
                />
              </div>
              <p className="text-red-600">{message}</p>
              </div>
              

            <div>
              <button
                type="submit"
                className="mt-8 mb-12 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update User
              </button>
            </div>
          </form>
          </div>
    </div>
    </div>
  )
}

export default Userdashboard