import React, { useEffect } from "react";
import NavBar from "../Components/NavBar";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteBill, getAllBill } from "../Store/Action/UserAction";
import { CircularProgress } from "@mui/material";
import InvoiceTable from "../Components/InvoiceTable";

const Invoice = () => {
  const dispatch = useDispatch();
  const { loading, message, error, bill } = useSelector((state) => state.User);
  const handledeleteBill = (id)=>{
    dispatch(deleteBill(id))
    dispatch(getAllBill());

    }
  useEffect(() => {
    dispatch(getAllBill());
  }, [dispatch]);

  
//   useEffect(() => {}, [loading, message, error, bill]);

  return (
    <div className="w-full min-h-screen flex flex-col gap-5">
      <NavBar />
      {loading ? (
        <CircularProgress />
      ) : (
    <InvoiceTable data={"Invoices"} handledeleteBill={handledeleteBill} bill={bill} type="invoice"/>
      )}
    </div>
  );
};

export default Invoice;
