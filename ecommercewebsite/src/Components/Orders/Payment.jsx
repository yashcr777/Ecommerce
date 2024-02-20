import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {v4 as uuidv4} from 'uuid';
import {toast} from 'react-hot-toast';
function Payment() {
  var addressid = JSON.parse(localStorage.getItem("addressid"));
  var userid = JSON.parse(localStorage.getItem("id"));
  var [orderid,setorderid]=useState("3fa85f64-5717-4562-b3fc-2c963f66afa6");
  const [orderdata, Setorderdata] = useState(null);
  var [addressdata, setAddressdata] = useState(null);
  const navigate=useNavigate();
  

  useEffect(() => {
    let newprod = JSON.parse(localStorage.getItem("cart"));
    var url = "https://localhost:7027/api/Order/Order/CreateOrder";
    let payment = 0;
    if(newprod && newprod.length){
    newprod.map((p) => {
      payment += p.totalprice;
    });
    
    const data = {
      address_Id: addressid,
      price: payment,
      ordertime: new Date().toLocaleString(),
      tax: 20,
      shippingPrice: 50,
      total_Price: 20 + 50 + payment,
      orderStatus: "Completed",
      payment_Id: uuidv4(),
      user_Id: userid,
    };
    axios
      .post(url, data)
      .then((result) => {
        setorderid(result.data.id);
        console.log(result.data);
        Setorderdata(result.data);
      })
      .catch((error) => {
        console.log(error);
        console.log(addressid);
        console.log(payment);
        console.log(data);
      });
      url=`https://localhost:7027/api/Address/Address/GetById/${addressid}`;
    axios.get(url)
    .then((result)=>{
      console.log(result);
      setAddressdata(result.data);
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  }, []);

  useEffect(() => {
    if(orderdata){
    let newprod = JSON.parse(localStorage.getItem("cart"));
    const url ="https://localhost:7027/api/Orderitems/Orderitem/CreateOrderitem";
    newprod.map((p) => {
      var data = {
        name: p.name,
        price: p.price,
        size: p.size.name,
        quantity: p.quantity,
        productimage: p.productimage,
        order_Id: orderdata.id,
        product_Id: p.id,
      };
      axios
        .post(url, data)
        .then((result) => {
          toast.success("Order Successful");
          console.log(result);
        })
        .catch((error) => {
          toast.error("Order not created");
          console.log(error);
        });
    });
    localStorage.removeItem("cart")
  }
  }, [orderdata]);


  useEffect(()=>{
    if(addressdata && orderdata){
      console.log(orderid)
    const url=`https://localhost:7027/api/Address/Address/UpdateAddress/${addressid}`;
    const data={
      userAddess:addressdata.userAddess,
      city:addressdata.city,
      country:addressdata.country,
      state:addressdata.state,
      phone:addressdata.phone,
      pincode:addressdata.pincode,
      order_Id:orderid,
    };
    axios.put(url,data)
    .then((result)=>{
      console.log(result)
    })
    .catch((error)=>{
      console.log(error)
    })
    localStorage.removeItem("addressid");
  }
  },[orderdata,addressdata])

  return (
    <div className="bg-white h-screen w-full">
      <div className="bg-white p-6 h-screen md:mx-auto">
        <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your payment.
          </p>
          <p> Have a great day! </p>
          <div class="py-10 text-center">
            <Link
              to='/orderlist'
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              Go To My orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
