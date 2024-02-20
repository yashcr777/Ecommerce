import React, { useEffect, useState } from 'react'
import Allusers from './Allusers'
import { getCookie } from './utils';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

function Admindashboard() {
  const [users,setUsers]=useState([]);
  var id = JSON.parse(localStorage.getItem("id"));
  var token = getCookie("token");
  var q=0;
  const url="https://localhost:7027/api/User/User/GetAll";
    useEffect(()=>{
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result)=>{
          console.log(result);
          setUsers(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },[])
  return (
    <>
        <Navbar/>
        <div className="w-full h-screen bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
        <strong className="text-4xl text-blue-700 font-medium">All Users</strong>
        <div className="border-x border-gray-200 rounded-sm mt-3">
          <table className="table-auto w-full shadow-lg rounded bg-white">
            <thead className='text-black bg-slate-200'>
              <tr>
                {/* <td className='px-4 border border-slate-300 py-2'>Id</td> */}
                <td className='border border-slate-300 px-2'>Name</td>
                <td className='border border-slate-300 px-2'>Email</td>
                <td className='border border-slate-300 px-2'>Role</td>
                <td className='border border-slate-300 px-2'>Edit</td>
                <td className='border border-slate-300 px-2'>Delete User</td>
                
              </tr>
              
            </thead>
            <div className='w-full'>
            </div>
            <tbody className='mb-4'>
            {users.map((user)=>(
                    <Allusers key={user.id} user={user}></Allusers>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      </>
  )
}

export default Admindashboard