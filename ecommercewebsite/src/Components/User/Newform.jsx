import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Newform() {
  var id = JSON.parse(localStorage.getItem("id"));

  const [file, setfile] = useState("");

  //   function handleData(e) {
  //     setInsputData({ ...inputData, [e.target.name]: e.target.value });
  //     console.log(inputData)
  //   }
  // console.log(inputdata);
  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("email","string");
    // const data={
    //   email:"string",
    //   formData:formData
    // };
    // console.log(data)
    
    const url="https://localhost:7156/api/User/UploadResume";
    axios.post(url,formData,{
        headers: { "Content-Type": "application/pdf/jpg/png" },
      })
    .then((result)=>{
        console.log(result.data);
    })
    .catch((error)=>{
        console.log(error)
    })
    console.log(file);
    console.log(formData);
  };

 
  //     e.preventDefault();
  //     if (!inputData) {
  //       alert("All Fields are Mandatory");
  //     } else {
  //       const url = `https://localhost:7027/api/Login/Login?email=${inputData.email}&password=${inputData.password}`;
  //       const data = {
  //         email: inputData.email,
  //         password: inputData.password,
  //       };
  //       axios
  //         .post(url, data)
  //         .then((result) => {
  //           console.log(result);
  //           const date=new Date();
  //           date.setTime(date.getTime()+3600*1000);
  //           const expires=`expires=${date.toUTCString()}`;
  //           var token='token';
  //           var Role='Role';
  //           document.cookie=`${token}=${result.data.token}; ${expires};`;
  //           document.cookie=`${Role}=${result.data.role}; ${expires};`;
  //           localStorage.setItem("id", JSON.stringify(result.data.id));
  //           navigate('/')
  //           toast.success("Login Sucessfully");
  //         })
  //         .catch((error) => {
  //           if(error.message.includes('401'))
  //           {
  //             toast.error('Email or Password Incorrect');
  //           }
  //           else if(error.message.includes('404'))
  //           {
  //             toast.error('Email not found please signup');
  //             navigate('/signup');
  //           }
  //           console.log(error);
  //         });
  //     }
  //   }
  //
  return (
    <div className="flex h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-slate-100">
      <div className="flex-col items-center justify-center shadow  bg-white rounded-lg py-2 md:w-1/2 lg:w-1/3 sm:w-1/3">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            file upload
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6 md:px-2 lg:px-2 sm:px-4"
            onSubmit={submitImage}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Upload File
              </label>
              <div className="mt-2">
                <input
                  accept="application/pdf/jpg/png"
                  type="file"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  onChange={(e) => setfile(e.target.files[0])}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Upload Pdf
              </button>
            </div>
            
          </form>

          
        </div>
      </div>
    </div>
  );
}
export default Newform;
