import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
  }, []);
  function handleClick() {
    navigate("/");
    toast.success("Logout Sucessfully");
  }
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <h1>Click To logout</h1>
      <button className="w-36 my-5 py-2 bg-teal-500" onClick={handleClick}>
        Logout
      </button>
    </div>
  );
}

export default Logout;
