import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../Store/Action/UserAction";
import DrawerBill from "./DrawerBill";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
   const logoutUser = ()=>{
    dispatch(logout())
    localStorage.removeItem("userToken");
    navigate("/login")
   }
   const [open, setOpen] = useState(false);
   const [placement, setPlacement] = useState("left");
   const showDrawer = () => {
     setOpen(true);
   };
   const onClose = () => {
     setOpen(false);
   };
   const onChange = (e) => {
     setPlacement(e.target.value);
   };
  return (
  <>
    <div className="w-full h-20 flex items-center justify-between px-20 text-xl  bg-white max-md:px-4 shrink-0">
      <div className="flex items-center justify-center gap-2">
      <img src="/blueLogo.png" className="w-20 object-contain h-16" alt="" />
      <h1 className="max-md:text-sm font-semibold text-base">Bill Generator</h1>

      </div>
      {/* <div className="flex gap-8 text-sm font-semibold">
        <NavLink to={"/"} className="cursor-pointer">
          Add Bill
        </NavLink>
        <NavLink to={"/invoice"} className="cursor-pointer">
          Invoices
        </NavLink>
        <NavLink to={"/"} className="cursor-pointer"></NavLink>
      </div> */}
      <div className="flex items-center justify-center gap-3">
      <i className="ri-menu-5-line text-2xl bg-gray-200 p-2 px-3 rounded-full cursor-pointer " onClick={showDrawer}></i>

      <button onClick={logoutUser} className="text-base border-black bg-red-500 text-white p-1 px-4 rounded-md">
        Logout
      </button>
      </div>
    </div>
<DrawerBill showDrawer={showDrawer} onClose={onClose} open={open}/>
  </>
  );
};

export default NavBar;
