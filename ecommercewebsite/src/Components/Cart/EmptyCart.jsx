import React from 'react'
import {RemoveShoppingCart} from "@mui/icons-material"
import './Emptycart.css'
import { Typography } from '@mui/material';
import {Link} from 'react-router-dom'
function EmptyCart() {
  return (
    <div className="emptyCart justify-center items-center flex flex-col">
               <RemoveShoppingCart/>
               <Typography>No Product in Your Cart</Typography>
               <Link to='/' className='mt-5'>HOME</Link>
           </div>
  )
}

export default EmptyCart