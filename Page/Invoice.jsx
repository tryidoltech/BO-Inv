import React, { useEffect } from "react";
import NavBar from "../Components/NavBar";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBill } from "../Store/Action/UserAction";
import { CircularProgress } from "@mui/material";
import InvoiceTable from "../Components/InvoiceTable";

const Invoice = () => {
  const dispatch = useDispatch();
  const { loading, message, error, bill } = useSelector((state) => state.User);
  useEffect(() => {
    dispatch(getAllBill());
  }, []);
//   useEffect(() => {}, [loading, message, error, bill]);
  console.log(bill);

  return (
    <div className="w-full min-h-screen flex flex-col gap-5">
      <NavBar />
      {loading ? (
        <CircularProgress />
      ) : (
    <InvoiceTable data={"Invoices"} bill={bill}/>
      )}
    </div>
  );
};

export default Invoice;
