import './App.css';
import Login from './Components/User/Login';
import Product from './Components/Product/Product';
import SignUp from './Components/User/SignUp';
import Navbar from './Components/Navbar/Navbar';
import { Route,BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './Components/User/Dashboard';
import Home from './Components/Home/Home';
import Logout from './Components/User/Logout';
import Cart from './Components/Cart/Cart';
import Allusers from './Components/User/Allusers';
import { getCookie } from './Components/User/utils';
import Allproducts from './Components/Product/Allproducts';
import Admindashboard from './Components/User/Admindashboard';
import AddProduct from './Components/Product/AddProduct';
import Address from './Components/Address/Address';
import Userdashboard from './Components/User/Userdashboard';
import Adminupdaterole from './Components/User/Adminupdaterole';
import Profile from './Components/User/Profile';
import Productdetail from './Components/Product/Productdetail';
import Unauthorizedpage from './Components/Unauthorizedpage';
import OrderSuccess from './Components/Orders/OrderSuccess';
import Payment from './Components/Orders/Payment';
import Orderpayment from './Components/Orders/Orderpayment';
import OrderList from './Components/Orders/OrderList';
import Items from './Components/Orders/Items';
import Addaddress from './Components/Address/Addaddress';
import Pagenotfound from './Components/Pagenotfound';

import Carousel1 from './Components/Carousel1';
import AddressPage from './Components/Address/AddressPage';
import Navproducts from './Components/Navbar/Navproducts';
import Newform from './Components/User/Newform';
import HomeProduct from './Components/Product/HomeProduct';
import Newcart from './Components/Cart/Newcart';
import EmptyCart from './Components/Cart/EmptyCart';
import Updateproductadmin from './Components/Product/Updateproductadmin';
import Updateproduct from './Components/Product/Updateproduct';
import Allorders from './Components/Orders/Allorders';
import Invoice from './Components/Orders/Invoice';
import Overlay from './Components/Home/Overlay';
import { useEffect, useState } from 'react';
import ForgotPassword from './Components/User/ForgotPassword';
import ResetPassword from './Components/User/ResetPassword';


function App() {
  const navigate=useNavigate();
  function handlelogout()
  {
    localStorage.clear();
    navigate('/login');
  }
  //var [user,setUser]=useState();
  var user = JSON.parse(localStorage.getItem("id"));
  var Role=getCookie("Role");
  // useEffect(() => {
  //   setUser(JSON.parse(localStorage.getItem("id")));
  //   setRole(getCookie("Role"))
  //   if(!Role)
  //   {
  //     localStorage.clear();
  //   }
  //   },[localStorage.getItem("id"),getCookie("Role")])

  useEffect(() => {
    if(user && !getCookie("Role")){
      handlelogout();
    }
  },[getCookie("Role")])
  return (
    <>
      <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/login" element={user? <Unauthorizedpage/>:<Login/>}/>
      {/* <Route exact path="/Dashboard" element={user?<Dashboard/>:<Login/>}/> */}
      <Route exact path="/signup" element={(user)?<Unauthorizedpage/>:<SignUp/>}/>
      <Route exact path="/logout" element={<Logout/>}/>
      <Route exact path="/cart" element={(user)?<Cart/>:<Unauthorizedpage/>}/>
      <Route exact path="/allusers" element={(user&&Role=="Admin")?<Allusers/>:<Home/>}/>
      <Route exact path="/allproducts" element={(user)?<Allproducts/>:<Unauthorizedpage/>}/>
      <Route exact path='/admindashboard' element={(user&&Role=="Admin")?<Admindashboard/>:<Unauthorizedpage/>}/>
      <Route exact path='/addproduct' element={(user&&Role=="Admin")?<AddProduct/>:<Unauthorizedpage/>}/>
      <Route exact path='/addaddress' element={(user)?<Address/>:<Unauthorizedpage/>}/>
      <Route exact path='/userdashboard' element={(user)?<Userdashboard/>:<Unauthorizedpage/>}/>
      <Route path='/adminupdaterole/:id' element={(user&&Role=="Admin")?<Adminupdaterole/>:<Unauthorizedpage/>}/>
      <Route path='/profile' element={(user)?<Profile/>:<Unauthorizedpage/>}/>
      <Route path='/productdetail/:id' element={(user)?<Productdetail/>:<Login/>}/>
      <Route path='/unauthorized' element={<Unauthorizedpage/>}/>
      {/* <Route path='/ordersuccess/:id' element={<OrderSuccess/>}/> */}
      <Route path='/paymentcompleted' element={(user)?<Payment/>:<Unauthorizedpage/>}/>
      {/* <Route path='/orderpayment/:id' element={<Orderpayment/>}/> */}
      <Route path='/orderlist' element={(user)?<OrderList/>:<Unauthorizedpage/>}/>
      <Route path='/items/:id' element={(user)?<Items/>:<Unauthorizedpage/>}/>
      <Route path='/address' element={<Addaddress/>}/>
      <Route path='/pagenotfound' element={<Pagenotfound/>}/>
      <Route path='/carousel' element={<Carousel1/>}/>
      <Route path='/addressupdate/:id' element={(user)?<AddressPage/>:<Unauthorizedpage/>}/>
      <Route path='/products' element={(user)?<Navproducts/>:<Unauthorizedpage/>}/>
      <Route path='/newform' element={<Newform/>}/>
      <Route path='/homeproduct' element={<HomeProduct/>}/>
      <Route path='/newcart' element={<Newcart/>}/>
      <Route path='/emptycart' element={(user)?<EmptyCart/>:<Unauthorizedpage/>}/>
      <Route path='/updateproductadmin' element={(user&&Role=="Admin")?<Updateproductadmin/>:<Unauthorizedpage/>}/>
      <Route path='/updateproductform/:id' element={<Updateproduct/>}/>
      <Route path='/allorders' element={(user??Role=="Admin")?<Allorders/>:<Unauthorizedpage/>}/>
      <Route path='/invoice/:id' element={<Invoice/>}/>
      <Route path='/overlay' element={<Overlay/>}/>
      <Route path='/forgotpassword' element={<ForgotPassword/>}/>
      <Route path='/resetpassword' element={<ResetPassword/>}/>
      </Routes>
    </>
  );
}

export default App;