import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

function Orderpayment() {
    const navigate=useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('cart'))
        {
          navigate('/');
        }
      },[])

    const {id}=useParams();
    var userid = JSON.parse(localStorage.getItem("id"));
    const data={address_Id:"",price:"",ordertime:"",tax:"",shippingPrice:"",total_Price:"",orderStatus:"",payment_Id:"3fa85f64-5717-4562-b3fc-2c963f66afa6",user_Id:""};
    const [orderdata,Setorderdata]=useState([]);
    const [addressdata,setAddressdata]=useState([]);
    const [pay,Setpay]=useState(0);

    useEffect(()=>{
        let newprod=JSON.parse(localStorage.getItem("cart"));
        const url="https://localhost:7027/api/Order/Order/CreateOrder";
        let payment=0;
        newprod.map((p)=>{
            payment+=p.totalprice
        })
        Setpay(payment);
        const data={
            address_Id:id,
            price:payment,
            ordertime:new Date().toLocaleString(),
            tax:20,
            shippingPrice:50,
            total_Price:(20+50+payment),
            orderStatus:"Completed",
            payment_Id:"3fa85f64-5717-4562-b3fc-2c963f66afa6",
            user_Id:userid,
        };
        axios.post(url,data)
        .then((result)=>{
            console.log(result.data);
            Setorderdata(result.data);
        })
        .catch((error)=>{
            console.log(error)
            console.log(id)
            console.log(payment)
            console.log(data)
        })
    },[])

    useEffect(()=>{
      const url=`https://localhost:7027/api/Address/Address/GetById/${id}`;
      axios.get(url)
      .then((result)=>{
        console.log(result);
        setAddressdata(result.data);
      })
      .catch((error)=>{
        console.log(error)
      })
    },[])

    useEffect(()=>{
      const url=`https://localhost:7027/api/Address/Address/UpdateAddress/${id}`;
      const data={
        userAddess:addressdata.userAddess,
        city:addressdata.city,
        country:addressdata.country,
        state:addressdata.state,
        phone:addressdata.phone,
        pincode:addressdata.pincode,
        order_Id:orderdata.id,
      };
      axios.put(url,data)
      .then((result)=>{
        console.log(result)
      })
      .catch((error)=>{
        console.log(error)
      })
    },[orderdata])
    let product=JSON.parse(localStorage.getItem("cart"));


  return (
    <div className="flex h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-slate-100">
        <div className="flex flex-col items-center justify-center shadow  bg-white rounded-lg py-2 md:w-1/2 lg:w-1/3 sm:w-1/3">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-green-500">
            Please Complete the payment
          </h2>
        </div>
        <h2 className='mt-6 mx-auto text-2xl text-red-600'>Price:{pay}</h2>
        <h2 className='mt-6 mx-auto text-2xl text-red-600'>Tax:20</h2>
        <h2 className='mt-6 mx-auto text-2xl text-red-600'>ShippingPrice:50</h2>
        <h2 className='mt-6 mx-auto text-lg text-black'>
            Complete the payment by clicking the link below 
            <Link to={`/ordersuccess/${orderdata.id}`}>
            <button className='mx-auto flex w-1/3 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                Payment</button>
            </Link>
            </h2>

        </div>
      </div>
  )
}

export default Orderpayment