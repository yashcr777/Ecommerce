import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCookie } from '../User/utils';

function Singleorder({x}) {
  const Role=getCookie("Role");
  
  return (
    <tr key={x.id} className="bg-card rounded text-gray-700">
        {/* <td className="py-4 px-4">{x.id}</td> */}
        <Link to={`/addressupdate/${x.address_Id}`}><td className="py-4 px-2 text-blue-500">User Address</td></Link>
        <td className="py-4 px-2">{x.total_Price}</td>
        <td className="py-4 px-2 text-green-500">{x.orderStatus}</td>
        <Link to={`/invoice/${x.id}`}><td className="py-4 px-2">Invoice</td></Link>
        <td className='py-4 px-2 text-blue-500'>{(Role=="User")?<Link to='/profile'>User Details</Link>:<Link to={`/adminupdaterole/${x.user_Id}`}>User Details</Link>}</td>
        <td className='py-4 px-2'>
          <Link to={`/items/${x.id}`} className='underline text-blue-500'>Items</Link>
        </td>
        </tr>
  )
}

export default Singleorder


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