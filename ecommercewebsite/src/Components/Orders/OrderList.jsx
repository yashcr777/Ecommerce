import React, { useEffect, useState } from "react";
import Singleorder from "./Singleorder";
import { getCookie } from "../User/utils";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function OrderList() {
  var id = JSON.parse(localStorage.getItem("id"));
  var token = getCookie("token");
  var Role = getCookie("Role");
  // var data = [
  //   {
  //     address_Id: "",
  //     price: "",
  //     tax: "",
  //     shippingPrice: "",
  //     total_Price: "",
  //     orderStatus: "",
  //     payment_Id: "",
  //     user_Id: "",
  //   },
  // ];

  var [orderData, setOrderData] = useState([]);

  useEffect(() => {
    var url = "https://localhost:7027/api/Order/Order/GetAll";
    Role !== "Admin"
      ? (url = `https://localhost:7027/api/Order/Order/UserAllOrders/${id}`)
      : (url = "https://localhost:7027/api/Order/Order/GetAll");
    axios
      .get(url,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result.data);
        setOrderData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
    <Navbar/>
    <div className="w-full h-screen bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <div className="w-full h-1/6 flex flex-col items justify-center">
        <strong className="mx-auto  text-4xl text-blue-700 font-medium">
          All Orders
        </strong>
      </div>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="table-auto w-full shadow-lg rounded bg-white">
          <thead className="text-black bg-slate-200">
            <tr>
              {/* <td className="px-4 border border-slate-300 py-2">Id</td> */}
              <td className="border border-slate-300 px-2">Address-Id</td>
              <td className="border border-slate-300 px-2">Total-Price</td>
              <td className="border border-slate-300 px-2">Order-Status</td>
              <td className="border border-slate-300 px-2">Payment-Id</td>
              <td className="border border-slate-300 px-2">User-Id</td>
              <td className="border border-slate-300 px-2">Items</td>
            </tr>
          </thead>
          <tbody className="mb-4">
            {orderData.map((x) => (
              <Singleorder key={x.id} x={x}></Singleorder>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default OrderList;
