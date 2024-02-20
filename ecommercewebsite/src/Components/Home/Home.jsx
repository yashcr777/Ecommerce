import React from 'react'
import Navbar from '../Navbar/Navbar'
import Allproducts from '../Product/Allproducts'
import Carousel1 from '../Carousel1'
import Overlay from './Overlay'
import { getCookie } from '../User/utils'

function Home() {
  var user = JSON.parse(localStorage.getItem("id"));
  const Role=getCookie("Role");
  return (
    // ((!Role && user)?<Overlay/>:
    // <>
     <Navbar>
      <Carousel1/>
      <Allproducts/>
     </Navbar>
    //  </>
    // )
  )
}

export default Home