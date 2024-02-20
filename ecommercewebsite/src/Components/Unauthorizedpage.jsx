import React from 'react'
import { Error } from '@mui/icons-material'
import './Unauthorizedpage.css'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'


const  Unauthorizedpage = () => {
  return (
    <div className="PageNotFound">
      <Error />

      <Typography>Unauthorized Access </Typography>
      <Link to="/">Home</Link>
    </div>
  )
}

export default Unauthorizedpage