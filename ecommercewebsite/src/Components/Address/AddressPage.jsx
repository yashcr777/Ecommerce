import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Country, State, City } from "country-state-city";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function AddressPage() {
  const navigate = useNavigate();

  function handlepage() {
    navigate(-1);
  }

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const { id } = useParams();
  const [addressdata, setAddressdata] = useState([]);

  var data = {
    order_Id: "",
    userAddess: "",
    city: "",
    pincode: "",
    phone: "",
  };
  const [inputData, setInputData] = useState(data);

  useEffect(() => {
    const url = `https://localhost:7027/api/Address/Address/GetById/${id}`;
    axios
      .get(url)
      .then((result) => {
        console.log(result);
        setAddressdata(result.data);
        setInputData(result.data);
        setCountry(result.data.country);
        setState(result.data.state);
        console.log(country);
        console.log(state);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleData(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
    console.log(inputData);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !inputData.order_Id ||
      !inputData.userAddess ||
      !country ||
      !state ||
      !inputData.city ||
      !inputData.pincode ||
      !inputData.phone
    ) {
      alert("All Fields are Mandatory");
    } else {
      const url = `https://localhost:7027/api/Address/Address/UpdateAddress/${id}`;
      const data = {
        userAddess: inputData.userAddess,
        order_Id: addressdata.order_Id,
        city: inputData.city,
        country: country,
        state: state,
        pincode: inputData.pincode,
        phone: inputData.pincode,
      };
      axios
        .put(url, data)
        .then((result) => {
          console.log(result.data);
          toast.success("Address Updated Successfully");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Address error coming");
        });
    }
  }

  return (
    <Navbar>
      <div classname="w-full h-screen bg-white">
        <form
          className="space-y-6 md:px-2 lg:px-2 sm:px-4 mt-4"
          onSubmit={handleSubmit}
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <p className="mt-1 text-2xl  leading-6 text-gray-800">
                Update Your Address For Delivery
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <input
                      value={inputData.country}
                      className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      maxLength={30}
                      name="userAddess"
                      id="userAddess"
                      value={inputData.userAddess}
                      onChange={handleData}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="city"
                      maxLength={20}
                      id="city"
                      value={inputData.city}
                      onChange={handleData}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      value={inputData.state}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      maxLength={7}
                      minLength={6}
                      name="pincode"
                      id="pincode"
                      value={inputData.pincode}
                      onChange={handleData}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone number
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="phone"
                      maxLength={10}
                      minLength={10}
                      required
                      id="phone"
                      value={inputData.phone}
                      onChange={handleData}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              onClick={handlepage}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </Navbar>
  );
}

export default AddressPage;
