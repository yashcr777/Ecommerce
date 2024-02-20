import React, { useEffect, useState} from "react";
import "./Profile.css";
import logo from'./user.png'
import axios from "axios";
import Navbar from '../Navbar/Navbar';
function Profile() {
    var id = JSON.parse(localStorage.getItem("id"));
    const [data,setData]=useState({name:"",email:"",role:"",phone:""});
    const url=`https://localhost:7027/api/User/User/GetById/${id}`;
    useEffect(()=>{
        axios.get(url)
        .then((result)=>{
            console.log(result);
            setData({
            name:result.data.name,
            email:result.data.email,
            role:result.data.role,
            phone:result.data.phone,
        });
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])
  return (
    <div>
    <Navbar/>
    <div className="flex h-screen flex-1 flex-col justify-center items-center px-6 py-6 lg:px-8 bg-white">
      <div className="flex-col items-center justify-center border-4 border-black  bg-white rounded-lg py-2 w-1/3 h-3/4">
        <img className="mx-auto w-26 h-26 rounded-full mt-4 " src="https://img.icons8.com/clouds/100/user.png" alt="user"/>
      <div className="border-b border-gray-900/10 pb-6" />
        <div className="mt-2 w-full flex flex-col items-center justify-center">
          
        <div className="mt-4 w-3/4 flex flex-row justify-center items-center">
          <p className="text-base font-bold text-gray-700">Name-</p>
          <input
          value={data.name}
          className="relative block w-1/2 rounded-md border-0 py-1.5 text-black  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
          />
          </div>


          <div className="mt-4 w-10/12 flex flex-row justify-center items-center">
          <p className="text-base text-gray-700 font-bold">Email-</p>
          <input
          value={data.email}
          className="relative block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
          />
          </div>


          <div className="mt-4 w-3/4 flex flex-row justify-center items-center">
          <p className="text-base text-gray-700 font-bold">Role-</p>
          <input
          value={data.role}
          className="relative block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
          />
          </div>



          <div className="w-3/4 mt-4 flex flex-row justify-center items-center">
          <p className="text-base text-gray-700 font-bold">Phone No.-</p>
          <input
          value={data.phone}
          className="relative block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
          />
          </div>



          <button
                className="flex w-1/3 mt-6 justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update User
              </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Profile;
