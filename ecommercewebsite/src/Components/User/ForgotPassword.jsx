import React, { useState } from "react";
import axios from "axios";
import {toast} from "react-hot-toast";
const ForgotPassword = () => {
  const [email, setemail] = useState("");
  const [message, setMessage] = useState("");
  const [valid,setValid]=useState(false);
  function handledata(e) {
    const rgExp = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    setemail(e.target.value);
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
  function handleclick(e)
  {
    e.preventDefault();
    if(!valid || !email)
    {
        alert("All Fields are Mandatory");
    }
    else
    {
        const url=`https://localhost:7027/api/User/ForgotPassword/?email=${email}`;
        const data={
            email:email,
        };
        axios.post(url,data)
        .then((result)=>{
            console.log(result);
            toast.success(result.data.mssg)
        })
        .catch((error)=>{
            console.log(error);
            if (error.message.includes("404")) {
                toast.error("Email Not Present");
              }
        })
    }
  }

  return (
    <main
      id="content"
      role="main"
      className="w-full max-w-md mx-auto p-6 mt-36"
    >
      <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Forgot password?
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Remember your password?
              <a
                className="text-blue-600 decoration-2 hover:underline font-medium mx-2"
                href="/login"
              >
                Login here
              </a>
            </p>
          </div>

          <div className="mt-5">
            <form>
              <div className="grid gap-y-4">
                <div>
                  <label
                    for="email"
                    className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handledata}
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      required
                     
                    />
                    <p className="text-red-600">{message}</p>
                  </div>
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="email-error"
                  >
                    Please include a valid email address so we can get back to
                    you
                  </p>
                </div>
                <button
                  type="submit"
                  onClick={handleclick}
                  className="mt-4 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-indigo-600 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  Reset password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
