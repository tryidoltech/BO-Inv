import React, { useEffect } from "react";
import NavBar from "../Components/NavBar";
import BillInputs from "../Components/BillInputs";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

const UploadBill = () => {
  const { loading, message, error } = useSelector((state) => state.User);
  useEffect(() => {}, [message, error,loading]);

  return (
    <div className="w-full min-h-screen bg-gray-50 max-md:relative max-md:overflow-hidden">
      <NavBar />
      <div className="h-full w-full flex flex-col items-start justify-start p-10 max-md:p-4">
        <h1 className="mx-auto text-2xl font-semibold pb-4">
          Add Bill Details
        </h1>
        {loading ? <CircularProgress /> : <BillInputs />}
      </div>
    </div>
  );
};

export default UploadBill;
