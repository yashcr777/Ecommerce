import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./SignUp.css";
import emailjs from "@emailjs/browser";

function SignUp() {
  const navigate = useNavigate();
  const data = { name: "", email: "", password: "", confirmpassword: "" };
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [message, setMessage] = useState("");
  const [valid, setValid] = useState(false);
  const [validpassword, setValidPassword] = useState(false);
  const [passwordmessage, setPasswordMessage] = useState("");
  const [inputData, setInsputData] = useState(data);

  const [upper, setupper] = useState(false);
  const [lower, setlower] = useState(false);
  const [number, setnumber] = useState(false);
  const [special, setspecial] = useState(false);
  const [length, setlength] = useState(false);

  function passwordvalidation1(e) {
    setInsputData({ ...inputData, [e.target.name]: e.target.value });
    var value = e.target.value;
    if (e.target.value === "") {
      const regexPatterns = {
        uppercase: /[A-Z]/,
        lowercase: /[a-z]/,
        number: /\d/,
        specialCharacter: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        minLength: /.{8,}/,
      };
      setupper(regexPatterns.uppercase.test(value));
      setlower(regexPatterns.lowercase.test(value));
      setnumber(regexPatterns.number.test(value));
      setspecial(regexPatterns.specialCharacter.test(value));
      setlength(regexPatterns.minLength.test(value));
      setValidPassword(upper || lower || number || special || length);
      setPasswordMessage("Please Enter Password");
    } else {
      setPasswordMessage();
      const regexPatterns = {
        uppercase: /[A-Z]/,
        lowercase: /[a-z]/,
        number: /\d/,
        specialCharacter: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        minLength: /.{8,}/,
      };
      setupper(regexPatterns.uppercase.test(value));
      setlower(regexPatterns.lowercase.test(value));
      setnumber(regexPatterns.number.test(value));
      setspecial(regexPatterns.specialCharacter.test(value));
      setlength(regexPatterns.minLength.test(value));
      setValidPassword(upper || lower || number || special || length);
      //valid?setPasswordMessage("Password Valid"):setPasswordMessage("Password not Valid")
    }
  }

  // function passwordValidation(e)
  // {
  //   const regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //   setInsputData({ ...inputData, [e.target.name]: e.target.value });
  //   console.log(inputData);
  //   if(e.target.value==="")
  //   {
  //     setPasswordMessage("Please Enter Password")
  //   }
  //   else if(regex.test(e.target.value))
  //   {
  //     setPasswordMessage("Password is valid")
  //     setValidPassword(true);
  //   }
  //   else if(!regex.test(e.target.value))
  //   {
  //     setPasswordMessage("Password is not valid")
  //   }
  //   else{
  //     setPasswordMessage("");
  //   }
  // }

  function checkValidation(e) {
    const rgExp = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    setInsputData({ ...inputData, [e.target.name]: e.target.value });
    //console.log(e.target.value);
    if (rgExp.test(e.target.value)) {
      setMessage("Email is valid");
      setValid(true);
    } else if (e.target.value === "") {
      setMessage("Please Enter email");
    } else if (!rgExp.test(e.target.value)) {
      setMessage("Email is not valid");
    } else {
      setMessage("");
    }
  }
  function handleData(e) {
    setInsputData({ ...inputData, [e.target.name]: e.target.value });
    //console.log(inputData)
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (
      !inputData.name ||
      !inputData.email ||
      !inputData.password ||
      !inputData.confirmpassword ||
      !valid ||
      !validpassword
    ) {
      alert("All Fields are Mandatory");
    } else if (inputData.confirmpassword !== inputData.password) {
      alert("Enter Password Correctly");
    } else {
      const url = "https://localhost:7027/api/User/SignUp";
      const data = {
        email: inputData.email,
        password: inputData.password,
        name: inputData.name,
      };
      axios
        .post(url, data)
        .then((result) => {
          //console.log("Registered Successfully");
          //console.log(result);
          navigate("/login");
          toast.success("Registered Sucessfully");
        })
        .catch((error) => {
          if (error.message.includes("400")) {
            toast.error("Email Already Present");
          }
          //console.log(error);
        });
      const templateParams = {
        from_name: inputData.name,
        from_email: inputData.email,
        to_name: "Yash Kumar",
        message: "Signup Successfully",
      };
      const publicKey = "8CKTvsxtQgXNKMNWi";
      const templateId = "template_c4czgcx";
      const serviceId = "service_nmxhlnp";
      emailjs
        .send(serviceId, templateId, templateParams, publicKey)
        .then((result) => {
          //console.log(result);
          //console.log("SignUp Successfully");
        })
        .catch((error) => {
          //console.log(error);
        });
    }
  }
  //
  return (
    <div className="flex h-1/2 flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-slate-100">
      <div
        className="flex-col items-center justify-center shadow lg:w-1/3 w-1/3 bg-white rounded-lg py-2 md:w-1/3 mx-auto "
        style={{ padding: "inherit" }}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6 p-auto m-auto" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  maxLength={20}
                  name="name"
                  placeholder="Name"
                  type="text"
                  value={inputData.name}
                  required
                  onChange={handleData}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  maxLength={40}
                  placeholder="Email"
                  name="email"
                  type="email"
                  required
                  value={inputData.email}
                  onChange={checkValidation}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
              <p className="text-red-600">{message}</p>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2 flex justify-end items-center w-full">
                <input
                  id="password"
                  placeholder="Password"
                  maxLength={20}
                  required
                  name="password"
                  type={visible ? "text" : "password"}
                  value={inputData.password}
                  onChange={passwordvalidation1}
                  className="realtive w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div
                  className="p-2 absolute"
                  onClick={() => {
                    setVisible(!visible);
                  }}
                >
                  {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </div>
              </div>
              {inputData.password ? (
                <p>
                  {!upper ? (
                    <p className="text-red-600">*Enter Upper case</p>
                  ) : (
                    <p className="text-green-600">*Enter Upper case</p>
                  )}
                  {!lower ? (
                    <p className="text-red-600">*Enter Lower case</p>
                  ) : (
                    <p className="text-green-600">*Enter Lower case</p>
                  )}
                  {!number ? (
                    <p className="text-red-600">*Enter Number</p>
                  ) : (
                    <p className="text-green-600">*Enter Number</p>
                  )}
                  {!length ? (
                    <p className="text-red-600">
                      *Length of password should be above 8
                    </p>
                  ) : (
                    <p className="text-green-600">
                      *Length of password should be above 8
                    </p>
                  )}
                  {!special ? (
                    <p className="text-red-600">*Enter Special character</p>
                  ) : (
                    <p className="text-green-600">*Enter Special character</p>
                  )}
                </p>
              ) : (
                <p className="text-red-600">{passwordmessage}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2 flex justify-end items-center w-full">
                <input
                  id="password"
                  placeholder="Confirm Passowrd"
                  maxLength={20}
                  required
                  name="confirmpassword"
                  type={visible1 ? "text" : "password"}
                  value={inputData.confirmpassword}
                  onChange={handleData}
                  className="realtive w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
                <div
                  className="p-2 absolute"
                  onClick={() => {
                    setVisible1(!visible1);
                  }}
                >
                  {visible1 ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have account?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
