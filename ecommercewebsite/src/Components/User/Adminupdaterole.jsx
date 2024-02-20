import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { toast } from "react-hot-toast";
import { getCookie } from "./utils";

function Adminupdaterole() {
  var token = getCookie("token");
  const navigate = useNavigate();
  const { id } = useParams();
  var data = { name: "", email: "", phone: "" };

  const [userData, setUserData] = useState([]);
  const [inputData, setInputData] = useState(data);
  const [role1, setRole1] = useState("");

  useEffect(() => {
    const url = `https://localhost:7027/api/User/User/GetById/${id}`;
    axios
      .get(url)
      .then((result) => {
        console.log(result);
        setUserData(result.data);
        setInputData({
          name: result.data.name,
          email: result.data.email,
          phone: result.data.phone,
        });
        setRole1(result.data.role);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  function handleData(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!inputData.name || !inputData.email || !inputData.phone) {
      alert("All Fields are Mandatory");
    } else {
      const url = `https://localhost:7027/api/User/User/UpdateUser/${id}`;
      const data = {
        email: inputData.email,
        name: inputData.name,
        phone: inputData.phone,
        gender: userData.gender,
        role: role1,
      };
      axios
        .put(url, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          console.log("Updated Successfully");
          console.log(result);
          setTimeout(() => {
            navigate("/admindashboard");
            window.location.reload();
          }, 1000);
          toast.success("Updated Sucessfully");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  return (
    <Navbar>
      <div className="mx-auto flex border w-1/2 h-1/3 shadow flex-col justify-center items-center">
        <h1 className="text-2xl text-black py-10 px-10">User Dashboard</h1>
        <div className="w-full h-full flex flex-row px-10 p5-10 justify-center items-center">
          <form className="space-y-6 w-1/2 h-screen" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                User Name
              </label>
              <div className="mt-2">
                <input
                  // id="name"
                  // name="name"
                  // placeholder='Name'
                  // type="text"
                  value={inputData.name}
                  // onChange={handleData}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>
            {/* Email */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="text"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  User Email
                </label>
              </div>
              <div className="mt-2">
                <input
                  // id="email"
                  // placeholder='Email'
                  // name="email"
                  // type="email"
                  value={inputData.email}
                  // onChange={handleData}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>
            {/* Mobile Number */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="text"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mobile Number
                </label>
              </div>
              <div className="mt-2">
                <input
                  // id="phone"
                  // placeholder='Mobile No.'
                  // name="phone"
                  // type="text"
                  value={inputData.phone}
                  // onChange={handleData}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="text"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Role
                </label>
              </div>
              <div className="mt-2">
                {/* <input
                  id="role"
                  placeholder='Role'
                  name="role"
                  type="text"
                  value={inputData.role}
                  onChange={handleData}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  
                /> */}
                <select
                  value={role1}
                  onChange={(e) => setRole1(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                >
                  <option value="">Choose Role</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="mt-6 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update User
              </button>
            </div>
          </form>
        </div>
      </div>
    </Navbar>
  );
}

export default Adminupdaterole;
