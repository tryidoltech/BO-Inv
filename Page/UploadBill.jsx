import React from "react";
import NavBar from "../Components/NavBar";
import BillInputs from "../Components/BillInputs";

const UploadBill = () => {
  return <div className="w-full h-screen bg-gray-50">
    <NavBar/>
    <div className="h-full w-full flex flex-col items-start justify-start p-10">
    <BillInputs/>
    </div>
  </div>;
};

export default UploadBill;
