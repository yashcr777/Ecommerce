import axios from 'axios';
import React, { useEffect, useState } from 'react';
//import { DataGrid } from '@mui/x-data-grid'
import DataTable from 'react-data-table-component';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Items.css';
import Singleitem from './Singleitem';
function Items() {
    const {id}=useParams();
    const columns=[
        {
            name:'Name',
            selector:row=>row.name
        },
        {
            name:'Price',
            selector:row=>row.price
        },
        {
            name:'Size',
            selector:row=>row.size
        },
        {
            name:'Quantity',
            selector:row=>row.quantity
        },
        {
            name:'Productimage',
            selector:row=><img src={row.productimage}></img>
        },
        
    ];
    const [data,SetData]=useState([]);
    useEffect(()=>{
        const url=`https://localhost:7027/api/Orderitems/Orderitem/GetByOrderId/${id}`;
        axios.get(url)
        .then((result)=>{
            console.log(result);
            SetData(result.data);
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])
  return (
    <>
    <Navbar/>
    {/* <div className='mt-5 w-full h-screen flex flex-col justify-center items-center'>
        <h1 className='text-4xl text-blue-700 font-medium mb-4'>All Orderitems</h1>
        <DataTable
        // className='w-full p-6 rounded-2xl'
        className='productListContainer'
        columns={columns}
        data={data}
        ></DataTable>
    </div> */}
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
              <td className="border border-slate-300 px-2">Name</td>
              <td className="border border-slate-300 px-2">Price</td>
              <td className="border border-slate-300 px-2">Size</td>
              <td className="border border-slate-300 px-2">Quantity</td>
              <td className="border border-slate-300 px-2">Productimage</td>
              {/* <td className="border border-slate-300 px-2">Items</td> */}
            </tr>
          </thead>
          <tbody className="mb-4">
            {data.map((x) => (
              <Singleitem key={x.id} x={x}></Singleitem>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    </>
  )
}

export default Items