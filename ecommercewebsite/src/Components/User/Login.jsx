import React, { useEffect, useState } from "react";
import {toast} from "react-hot-toast"
import {EyeInvisibleOutlined,EyeOutlined} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Login.css';


function Login() {
  var id = JSON.parse(localStorage.getItem("id"));
  const navigate = useNavigate();
  const data = { email: "", password: "" };
  const [inputData, setInsputData] = useState(data);
  const [visible,setVisible]=useState(false);
  const [message,setMessage]=useState("");
  const [valid,setValid]=useState(false);
  function handleData(e) {
    setInsputData({ ...inputData, [e.target.name]: e.target.value });
    console.log(inputData)
  }
    

  function checkValidation(e){
    const rgExp=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    setInsputData({ ...inputData, [e.target.name]: e.target.value });
    if(rgExp.test(e.target.value))
    {
      setMessage("Email is valid")
      setValid(true);
    }
    else if(!e.target.value)
    {
      setMessage("Please Enter email")
    }
    else if(!rgExp.test(e.target.value))
    {
      setMessage("Email is not valid")
    }
    else{
      setMessage("");
    }
  }

    function handleSubmit(e) {
    e.preventDefault();
    if (!inputData.email || !inputData.password || !valid) {
      alert("All Fields are Mandatory");
    } else {
      const url = `https://localhost:7027/api/Login/Login?email=${inputData.email}&password=${inputData.password}`;
      const data = {
        email: inputData.email,
        password: inputData.password,
      };
      axios
        .post(url, data)
        .then((result) => {
          console.log(result);
          const date=new Date();
          date.setTime(date.getTime()+3600*1000);
          const expires=`expires=${date.toUTCString()}`;
          var token='token';
          var Role='Role';
          document.cookie=`${token}=${result.data.token}; ${expires};`;
          document.cookie=`${Role}=${result.data.role}; ${expires};`; 
          localStorage.setItem("id", JSON.stringify(result.data.id));
          navigate('/')
          toast.success("Login Sucessfully");
        })
        .catch((error) => {
          if(error.message.includes('401'))
          {
            toast.error('Email or Password Incorrect');
          }
          else if(error.message.includes('404'))
          {
            toast.error('Email not found please signup');
            navigate('/signup');
          }
          console.log(error);
        });
    }
  }
//   
return(
    <div className="flex h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-slate-100">
        <div className="flex-col items-center justify-center shadow  bg-white rounded-lg py-2 md:w-1/2 lg:w-1/3 sm:w-1/3">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6 md:px-2 lg:px-2 sm:px-4"
          onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  maxLength={30}
                  name="email"
                  placeholder="Email"
                  type="email"
                  required
                  value={inputData.email}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  onChange={checkValidation}
                />
              </div>
              <p className="text-red-600">{message}</p>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2 flex justify-end items-center w-full">
                <input
                  id="password"
                  maxLength={20}
                  name="password"
                  placeholder="Password"
                  type={visible?"text":"password"}
                  value={inputData.password}
                  className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  onChange={handleData}
                />
                <div className="p-2 absolute" onClick={()=>{setVisible(!visible)}}>
                  {visible?<EyeOutlined/>:<EyeInvisibleOutlined/>}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
            <p className="font-bold text-indigo-600 mx-32 w-full text-l"><Link to='/forgotpassword'>Forgot Password?</Link></p>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="/signup" className="text-l font-bold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign Up
            </a>
          </p>
        </div>
        </div>
      </div>
)
}
export default Login

