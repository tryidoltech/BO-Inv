import { Alert, AlertTitle, CircularProgress, IconButton } from "@mui/material";
// import Link from "next/link";
import React, { useEffect, useState } from "react";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { isUser, userLogin } from "../Store/Action/UserAction";
import { useNavigate } from "react-router";
import axios from "../Axios/axios";
import { Icon } from "@iconify/react/dist/iconify.js";
// import { isUser, loginUser } from "@/store/Action/User";
// import {
//   clearError,
//   clearErrorAuth,
//   clearMsg,
//   clearMsgAuth,
// } from "@/store/Reducer/UserReducer";

const LoginUser = () => {
  const [cookiesEnabled, setCookiesEnabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [alert, setalert] = useState("");
  const [active, setactive] = useState(false);
  const dispatch = useDispatch();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { messageAuth, errorAuth, isAuthenticated, loading, user } =
    useSelector((state) => state.User);
  // console.log(error,789);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handelEmail = (e) => {
    setemail(e.target.value);
    setactive(false);
  };
  const handelPassword = (e) => {
    setpassword(e.target.value);
    setactive(false);
  };
  const formSubmit = (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (email !== "" && password !== "") {
      // if (!password.match(passwordRegex)) {
      //   return toast.error(
      //     "Password must contain at least 6 characters, one uppercase letter, one lowercase letter, and one number"
      //   );
      // }
      const info = { email, password };
      console.log(info);
      
      dispatch(userLogin(info));
      //   dispatch(loginUser(info));
    } else {
      if (email === "") {
        toast.error("Email is required");
      }
      if (password === "") {
        toast.error("Password is required");
      }
      if (email === "" && password === "") {
        toast.error("Email & Password is required");
      }
    }
  };
  const navigate = useNavigate();
  // useEffect(() => {

  //   // if (messageAuth) {
  //   //   toast.success(messageAuth);
  //   //   dispatch(clearMsgAuth());
  //   // }
  //   // if (errorAuth) {
  //   //   toast.error(errorAuth);
  //   //   dispatch(clearErrorAuth());
  //   // }

  //   dispatch(isUser());
  //     if(isAuthenticated){
  //       navigate("/")
  //     }
  //     else{
  //      navigate("/login")
  //     }

  // }, [messageAuth, errorAuth,dispatch]);
  console.log(loading, isAuthenticated);

  return (
    <>
      {loading ? (
        <div className="flex h-screen w-full items-center justify-center overflow-hidden">
          <CircularProgress />
        </div>
      ) : (
        <div className="w-full  flex max-md:flex-col min-h-screen items-center justify-between max-md:justify-center">
        {/* Header */}
        {/* <div className="w-full absolute top-0 left-0 flex items-center justify-between px-4 md:px-[10vw] py-2">
          <img src="/Logo.png" className="h-10" alt="Logo" />
          <NavLink to={"/"}>
            <i
              className="ri-close-line text-primary text-4xl md:text-5xl cursor-pointer"
              style={{ fontWeight: "100" }}
            ></i>
          </NavLink>
        </div> */}
      
        {/* Image Section */}
        <div className="w-full  lg:w-1/2 flex items-center justify-center mt-20 px-4 lg:p-0 order-1">
          <img
            src="/login.jpg"
            alt="Login Illustration"
            className="w-[60%]  h-full object-contain"
          />
        </div>
      
        {/* Form Section */}
        <div className="w-full  lg:w-1/2 flex flex-col justify-center  items-center lg:items-start p-6 lg:p-12 order-2">
          <form onSubmit={formSubmit} className="w-full max-w-md flex flex-col justify-center">
            <h1 className="text-center lg:text-left flex items-center text-primary text-2xl md:text-4xl font-extrabold">
              <Icon
                icon="solar:login-2-linear"
                style={{ color: "#1d4ed8", marginRight: "1vw" }}
              />
              Sign in to your account
            </h1>
            <h3 className="w-full mt-4 text-center lg:text-left lightF">
              Enter your email and password to sign in to your account.
            </h3>
      
            <div className="flex flex-col items-start w-full gap-2 p-2 mt-6">
              <label className="font-extrabold">
                Enter your Email address <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                placeholder="xyz@abcd.com"
                className="w-full p-2 rounded-xl border-2"
                name="email"
                value={email}
                onChange={handelEmail}
              />
            </div>
      
            <div className="flex flex-col items-start w-full gap-2 p-2 mt-2">
              <label className="font-extrabold">
                Enter your Password <span className="text-primary">*</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-2 rounded-xl border-2"
                name="password"
                value={password}
                onChange={handelPassword}
              />
            </div>
      
            <button
              type="submit"
              className="bg-blue-700 px-10 py-2 mt-5 rounded-xl text-white text-xl w-full lg:w-auto lg:ml-0 mx-auto"
            >
              Login <i className="ri-arrow-right-wide-line"></i>
            </button>
          </form>
        </div>
      </div>
      )}
    </>
  );
};

export default LoginUser;
