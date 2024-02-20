import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Country, State, City } from "country-state-city";
import Navbar from "../Navbar/Navbar";
import {toast} from 'react-hot-toast';
import { loadStripe } from "@stripe/stripe-js";

function Address() {
  let newprod=JSON.parse(localStorage.getItem("cart"));
  var price=0;
  newprod.map((p)=>{
    price+=p.totalprice
})
  
  const stripePromise = loadStripe(
    "pk_test_51KktbBSHIlA9k8TX9lY7AggWO2jxeTm8OtFgLE1h1R6pwSJVV4fBAbOwX8VapDVZv63JaF1mRxHj6peUejvTFyQs00UXqOSwcw"
    //"pk_test_51OaDjKSCAl7kXLDrURGBiqMzPehW6P7HZl9kk36qVAwQJQ2Ik4IaB1BKkvlYXMfpCtuxgVfxO17z9F637NeGoYTQ00Ywhlt8Ad"
);

const url="https://localhost:7027/api/Payment/payment";
const handleCheckOut = async() => {
  const data={
    orderprice:(price+70)*100,
  };
  try {
    const stripe = await stripePromise;
    const res = await axios.post(url,data);
    console.log(res);
    await stripe.redirectToCheckout({
        sessionId: res.data,
    });
} catch (err) {
    console.log(err);
}
}
  
  let countryData = Country.getAllCountries();
  const [country, setCountry] = useState(countryData[0]);
  const [state, setState] = useState();
  const [city,setcity]=useState();
  console.log(country);
  console.log(state);
  const navigate = useNavigate();

  var data = {
    order_Id: "",
    userAddess: "",
    pincode: "",
    phone: "",
  };
  const [inputData, setInputData] = useState(data);
  function handleData(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
    console.log(inputData);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (
      !inputData.userAddess ||
      !city ||
      !inputData.pincode ||
      !inputData.phone ||
      !country ||
      !state
    ) {
      alert("All Fields are Mandatory");
    } else {
      const url = "https://localhost:7027/api/Address/AddAddress";
      data = {
        order_Id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userAddess: inputData.userAddess,
        city: city,
        state: State.getStateByCodeAndCountry(state,country).name,
        country: Country.getCountryByCode(country).name,
        pincode: inputData.pincode,
        phone: inputData.phone,
      };
      console.log(data);
      axios
      .post(url,data)
      .then((result)=>{
        console.log(result);
        toast.success("Address Successfully Added")
        localStorage.setItem("addressid", JSON.stringify(result.data.id));
        handleCheckOut();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error Adding address to the Order")
      });
    }
  }
  return (
    
      <Navbar>
        <div className="mx-auto flex border w-1/2 h-full  flex-col justify-center items-center bg-white my-4">
          <h1 className="text-2xl text-blue-500 py-10 px-10 text-bold">Add Address</h1>
          <div className="w-full h-full flex flex-row px-10 p5-10">
            <form className="space-y-6 w-1/2 h-screen" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="text"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  User Address
                </label>
                <div className="mt-2">
                  <input
                    id="userAddess"
                    name="userAddess"
                    type="text"
                    required
                    value={inputData.userAddess}
                    onChange={handleData}
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
                    Add your Country
                  </label>
                </div>
                <div className="mt-2 mb-2">
                  <select
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"

                  >
                    <option value="">Country</option>
                    {Country &&
                      Country.getAllCountries().map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Add your State
                  </label>
                </div>
                <div className="mt-2">
                  {country && (
                    <select
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"

                    >
                      <option value="">State</option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  )}
                </div>
              </div>

              

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Add City
                  </label>
                </div>
                <div className="mt-2">
                  {/* <input
                    id="city"
                    name="city"
                    type="text"
                    maxLength={20}
                    value={inputData.city}
                    onChange={handleData}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  /> */}
                  {country && (
                    <select
                      required
                      value={city}
                      onChange={(e) => setcity(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"

                    >
                      <option value="">City</option>
                      {City &&
                        City.getCitiesOfState(country,state).map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Postal Code
                  </label>
                </div>
                <div className="mt-2 mb-2">
                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    maxLength={6}
                    value={inputData.pincode}
                    onChange={handleData}
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
                    Mobile Number
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    required
                    minLength={10}
                    maxLength={10}
                    value={inputData.phone}
                    onChange={handleData}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="mx-32 mt-10 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Address
                </button>
              </div>
            </form>
          </div>
        </div>
      </Navbar>
    
  );
}

export default Address;
