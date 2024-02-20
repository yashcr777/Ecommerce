import axios from 'axios';
import React, { useEffect, useState } from 'react'
import check from './check.png';
import {toast} from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
function OrderSuccess() {
  const navigate=useNavigate();
    const {id}=useParams();
    var userid = JSON.parse(localStorage.getItem("id"));
    const url=`https://localhost:7027/api/User/User/GetById/${userid}`;
    const [userdata,Setuserdata]=useState({name:"",email:""});
    // useEffect(()=>{
    //   if(!localStorage.getItem('cart'))
    //   {
    //     navigate('/');
    //   }
    // },[])

    useEffect(()=>{
      let newprod=JSON.parse(localStorage.getItem("cart"));
      const url='https://localhost:7027/api/Orderitems/Orderitem/CreateOrderitem';
      newprod.map((p)=>{
        var data={
        name:p.name,
        price:p.price,
        size:p.size.name,
        quantity:p.quantity,
        productimage:p.productimage,
        order_Id:id,
        product_Id:p.id
        };
        axios.post(url,data)
        .then((result)=>{
          toast.success("Order Successful");
          console.log(result)
        })
        .catch((error)=>{
          toast.error("Order not created");
          console.log(error)
        })
      });
       localStorage.removeItem("cart");
    },[])
    useEffect(()=>{
        axios.get(url)
        .then((result)=>{
            console.log(result);
            Setuserdata(result.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])
  return (
    <div className="flex h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-slate-100">
        <div className="flex flex-col items-center justify-center shadow  bg-white rounded-lg py-2 md:w-1/2 lg:w-1/3 sm:w-1/3">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img src={check} className='mt-4 mx-auto w-10 h-10 rounded-full'></img>
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-green-500">
            Order is Completed
          </h2>
        </div>
        <h2 className='mt-6 mx-auto text-2xl text-red-600'>Hello {userdata.name}</h2>
        <h2 className='mt-6 mx-auto text-2xl text-red-600'>Your Order is Completed</h2>
        <h2 className='mt-6 mx-auto text-sm text-black'>
        Your order id is-
            <Link to='/'>
            <span className='text-indigo-400 underline'>{id}</span>
            </Link>
            </h2>

        </div>
      </div>
  )
}

export default OrderSuccess