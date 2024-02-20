import React from 'react'
import { Link, useParams } from 'react-router-dom'

function Singleitem({x}) {
  
  return (
    <tr key={x.id} className="bg-card rounded text-gray-700">
        {/* <td className="py-4 px-4">{x.id}</td> */}
        <td className="py-4 px-2 ">{x.name}</td>
        <td className="py-4 px-2">{x.price}</td>
        <td className="py-4 px-2">{x.size}</td>
        <td className="py-4 px-2">{x.quantity}</td>
        <td className='py-4 px-2 '><img src={x.productimage} alt="" className='w-20 h-20' /></td>
        
        </tr>
  )
}

export default Singleitem


{/* <div>
        <div className='w-full h-1/3'>
            <h3>x.address_Id</h3>
            <h3>x.price</h3>
            <h3>x.tax</h3>
            <h3>x.shippingPrice</h3>
            <h3>x.total_Price</h3>
            <h3>x.orderStatus</h3>
            <h3>x.payment_Id</h3>
            <h3>x.user_Id</h3>
            <div>
            {(x.items).map((item)=>{
                <div>
                    <h1>item.name</h1>
                    <h1>item.price</h1>
                    <h1>item.size</h1>
                    <h1>item.quantity</h1>
                    <h1>item.productimage</h1>
                    <h1>item.order_Id</h1>
                    <h1>item.product_Id</h1>
                </div>
            })}
            </div>
            
        </div>
    </div> */}