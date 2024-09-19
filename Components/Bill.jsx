import React, { useEffect, useState } from "react";
import TableDetail from "./Table";
import TransactionTable from "./TransactionTable";

const Bill = ({data,a}) => {
    // const [data, setdata] = useState("");
    // useEffect(() => {
    // const d = JSON.parse(localStorage.getItem("data"))
    // console.log(d);
    // setdata(d)
    
    // }, [])
    
  return (
    <div className="w-[60%] mx-auto min-h-screen flex flex-col gap-6 p-10 pb-20 border-2 font-[gilroy]" ref={a}>
      <div className="w-full h-[2\10vh] bg-red-400">
        <img src="/Header.png" className="w-full object-cover h-full" alt="" />
      </div>
      <div className="w-full mx-auto flex ">
        <div className="flex w-full  flex-col text-black text-base gap-0.5'">
          <h1 className="font-extrabold text-4xl pb-2">Tax Invoice</h1>
          <h1>
            Invoice: <span className="font-semibold">#6747-603 [0209]</span>{" "}
          </h1>
          <h1>
            Invoice Date:{" "}
            <span className="font-semibold">{data?.value?.invoiceDate}</span>
          </h1>
          <h1>
            {" "}
            Due Date: <span className="font-semibold">{data?.value?.dueDate}</span>
          </h1>
          <h1>
            Tax Invoice TRN:{" "}
            <span className="font-semibold">104127291300003</span>{" "}
          </h1>
          <h1>
            {" "}
            Invoice Status: <span className="font-semibold">Unpaid</span>{" "}
          </h1>
          <h1>
            Currency: <span className="font-semibold">AED</span>{" "}
          </h1>
          <h1>
            Number of Days:{" "}
            <span className="font-semibold">
              4 Days -- from 2024-08-05 18:20 to 2024-08-09 22:30:00{" "}
            </span>
          </h1>
          <h1>
            Order:<span className="font-semibold">#6746-602 [0209]</span>
          </h1>
          <h1>
            {" "}
            Order Status: <span className="font-semibold">Completed</span>
          </h1>
          <h1>
            Vehicle: <span className="font-semibold">#13-3 Hy</span>
          </h1>
        </div>
        <div className="border-2 h-fit p-6 w-[50%] shrink-0">
          <h1 className="font-extrabold">Invoice To</h1>
          <h1 className="font-extrabold">{data?.value?.invoiceTo}</h1>
          <h3>
            Address: {data?.value?.address}, Mobile:
            {data?.value?.mobileNo}
          </h3>
        </div>
      </div>
      <TableDetail data={data?.tableData}  />
      <div className="w-full mx-auto flex flex-col gap-1 font-[gilroy]">
        <h1 className="font-extrabold text-2xl">Transactions</h1>
        <TransactionTable data={data?.transactionData} />
      </div>
      <div className="grid w-full grid-cols-3 gap-2 mx-auto font-extrabold text-lg">
        <div className="flex flex-col">
          <h1 className="border-b-2 w-fit pb-1">Receiver Signature</h1>
          <img src="" alt="" />
        </div>
        <div className="flex flex-col">
          <h1 className="border-b-2 w-fit pb-1">Manager Signature</h1>
          <img src="" alt="" />
        </div>
        <div className="flex flex-col">
          <h1 className="border-b-2 w-fit pb-1">Accountant Signature</h1>
          <img src="" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Bill;
