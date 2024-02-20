import React, { useEffect, useState } from "react";
import { getCookie } from "./utils";
import axios from "axios";
import {toast} from 'react-hot-toast'
import { Link, useNavigate } from "react-router-dom";

function Allusers({user}) {
  var id = JSON.parse(localStorage.getItem("id"));
  const navigate = useNavigate();
  var token = getCookie("token");
  const url=`https://localhost:7027/api/User/User/DeleteUser/${user.id}`;
  // function handleClick()
  // {
  //   navigate(`/adminupdaterole/${user.id}`)
  // }
  function deleteUser()
  {
    axios
        .delete(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result)=>{
          console.log(result);
          navigate("/admindashboard");
          window.location.reload();
        })
        .catch((error) => {
          toast.error("Error");
          //console.log(error);
        });
  }
  // console.log(users[0].name);
  //className='border border-slate-300'
  return (
      <tr key={user.id} className="bg-card rounded text-gray-700">
        
        {/* <td className="py-4 px-4 border-b border-r border-slate-200">{user.id}</td> */}
        <td className="py-4 border-b border-r border-slate-200 text-black px-2">{user.name}</td>
        <td className="py-4 border-b border-r border-slate-200 px-2 text-black">{user.email}</td>
        <td className="py-4 border-b border-r border-slate-200 px-2 text-black">{user.role}</td>
        <td className="py-4 border-b border-r border-slate-200 px-2 font-bold text-green-600"><Link to={`/adminupdaterole/${user.id}`}>
          Edit Role</Link></td>
        {(user.id!=id)?<td className="px-2 py-4 border-b border-slate-300"><Link onClick={deleteUser} className="text-red-500 hover:bg-red-500 font-bold py-2 px-4">Delete User</Link></td>:(<td className="px-4 text-red-500 border-b border-slate-300">Not Allowed</td>)}
      </tr>
  );
}

export default Allusers;
