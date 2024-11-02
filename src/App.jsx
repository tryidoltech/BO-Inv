import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import BillPage from "../Page/BillPage";
import UploadBill from "../Page/UploadBill";
import LoginDetails from "../Components/LoginDetail";
import { useDispatch, useSelector } from "react-redux";
import { isUser } from "../Store/Action/UserAction"; 
import { toast } from "react-toastify";
import { clearError, clearMessage } from "../Store/Reducer/UserReducer";
import Invoice from "../Page/Invoice";
import Dashboard from "../Page/Dashboard";

function App() {
  const { isAuthenticated, user, loading, error, message } = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const navigate = useNavigate();
const location = useLocation()
  useEffect(() => {
    dispatch(isUser());
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated && location.pathname === "/login") {
        navigate("/");
      } else if (!isAuthenticated && location.pathname !== "/login") {
        navigate("/login");
      }
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error, message]);
var download = true
  return (
    <>
      <Routes>
        <Route path="/" index element={<Dashboard/>} />
        <Route path="/add/bill" element={<UploadBill/>} />
        <Route path="/bill/:id" element={<BillPage />} />
        <Route path="/bill/download/:id" element={<BillPage download={download} />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/login" element={<LoginDetails />} />
      </Routes>
    </>
  );
}

export default App;
