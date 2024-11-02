import React, { useEffect } from "react";
import Bill from "../Components/Bill";
import NavBar from "../Components/NavBar";
import { Button } from "antd";
import { useRef } from "react";
import generatePDF from "react-to-pdf";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getBillById } from "../Store/Action/UserAction";
import { CircularProgress } from "@mui/material";
const BillPage = ({ download }) => {
  const targetRef = useRef();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { billData, loading } = useSelector((state) => state.User);
  const handleBill = () => {
    generatePDF(targetRef, { filename: "bill.pdf" });
  };
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getBillById(id));
    if (download) {
      handleBill();
      download = false
      navigate("/")
      
    }
  }, []);

  return (
    <>
      <div className="w-full relative overflow-hidden">
        <NavBar />
        <div className="w-full flex flex-col items-center justify-center gap-4 py-8 relative max-md:overflow-x-auto">
          {loading ? (
            <div className="h-screen flex items-center justify-center w-full">
              <CircularProgress />
            </div>
          ) : (
            <Bill data={billData} a={targetRef} />
          )}
          <Button type="primary" className="mx-auto" onClick={handleBill}>
            Print Bill
          </Button>
        </div>
      </div>
    </>
  );
};

export default BillPage;
