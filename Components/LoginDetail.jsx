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
// import { isUser, loginUser } from "@/store/Action/User";
// import {
//   clearError,
//   clearErrorAuth,
//   clearMsg,
//   clearMsgAuth,
// } from "@/store/Reducer/UserReducer";

const LoginUser = () => {
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
dispatch(userLogin(info))
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
  const navigate = useNavigate()
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
    console.log(loading,isAuthenticated);
    
  return (
    <>
      {loading ? (
        <div className="flex h-screen w-full items-center justify-center overflow-hidden">
          <CircularProgress />
        </div>
      ) : (
        <div className="w-full flex  items-center justify-center h-screen">
          <div className="side h-full flex-col gap-10  w-fit p-4 flex items-center justify-center max-lg:hidden ">
            <h1 className="text-5xl font-[poppins]">
              Hi , Welcome Back User 👋
            </h1>
            <img
              src={"/bill.png"}
              className="h-[50%] object-center object-contain"
              alt=""
            />
          </div>
          <div className="h-full w-1/2 max-lg:w-full  relative flex flex-col items-center gap-6 justify-center">
            <h1 className=" text-4xl whitespace-nowrap font-bold font-[poppins]">
              Login to Bill Generator
            </h1>

            {active ? (
              <Alert severity="warning" className="w-1/2">
                <AlertTitle>Alert</AlertTitle>
                <strong>{alert}</strong>
              </Alert>
            ) : (
              ""
            )}

            <form
              autoComplete="false"
              className="grid gap-8 w-1/2 "
              onSubmit={formSubmit}
            >
              <TextField
                id="outlined-basic"
                value={email}
                onChange={handelEmail}
                label="Email"
                type="email"
                variant="outlined"
                // required
              />
              <FormControl className="w-full" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  value={password}
                  onChange={handelPassword}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  // required
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        className="ease-in duration-1000	"
                      >
                        {showPassword ? (
                          <i className="ri-eye-line"></i>
                        ) : (
                          <i className="ri-eye-close-line"></i>
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <button className="w-full p-4 transition-all ease-linear duration-150 font-[poppins] text-white bg-black rounded hover:opacity-80  font-semibold">
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginUser;
