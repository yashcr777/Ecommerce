import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Singleorder from './Singleorder';
import { getCookie } from '../User/utils';

function Allorders() {
  var token = getCookie("token");
    var id = JSON.parse(localStorage.getItem("id"));
    const items=[];
    var data=[{address_Id:"",price:"",tax:"",shippingPrice:"",total_Price:"",orderStatus:"",payment_Id:"",user_Id:"",items}];
    const [orderData,setOrderData]=useState(data);
    function handleData(e) {
        setOrderData({ ...orderData, [e.target.name]: e.target.value });
        console.log(orderData)
      }
      useEffect(()=>{
        const url="https://localhost:7027/api/Order/Order/GetAll";
        axios.get(url,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result)=>{
            console.log(result.data);
            setOrderData(result.data);
        })
        .catch((error)=>{
            console.log(error);
        })
      },[])
  return (
    <div>
        {orderData.map((x)=>(
            <Singleorder key={x.id} x={x}></Singleorder>
        ))}
    </div>
  )
}

export default Allorders