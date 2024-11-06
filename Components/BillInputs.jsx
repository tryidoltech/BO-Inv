import { Button, Form, Input, Select, DatePicker } from "antd";
import React, { useEffect, useRef, useState } from "react";
import TableDetail from "./Table";
import TransactionTable from "./TransactionTable";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { uploadBill } from "../Store/Action/UserAction";
import Papa from "papaparse";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import InputCustom from "./InputCustom";
const { RangePicker } = DatePicker;

const BillInputs = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("Vertical");
  const [tableData, settableData] = useState([]);
  const [transactionData, settransactionData] = useState([]);
  const [transactionDate, settransactionDate] = useState("");
  const [method, setmethod] = useState("Cash");
  const [category, setcategory] = useState("Rental Income");
  const [transAmount, settransAmount] = useState("");
  const [description, setdescription] = useState("");
  const [amount, setamount] = useState("");
  const [discount, setdiscount] = useState("");
  const [paidAmount, setpaidAmount] = useState(0);
  const [orderStatus, setorderStatus] = useState("Completed");
  const [invoiceStatus, setinvoiceStatus] = useState("Paid");
  const [vehiclePartOne, setVehiclePartOne] = useState("");
  const [vehiclePartTwo, setVehiclePartTwo] = useState("");
  const [openInvoiceDatePicker, setOpenInvoiceDatePicker] = useState(false);
  // const [, set] = useState(second)
  const [openDueDatePicker, setOpenDueDatePicker] = useState(false);
  const [openDate, setopenDate] = useState("");
  const handleOpenInvoiceDatePicker = () => setOpenInvoiceDatePicker(true);
  const handleOpenDueDatePicker = () => setOpenDueDatePicker(true);
  const navigate = useNavigate();
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const addBillValues = () => {
    if (
      !description ||
      !amount ||
      !discount ||
      discount === 0 ||
      amount === 0 ||
      description.length <= 0
    ) {
      return toast.error("Please Fill all the details");
    }
    const dets = {
      description: description,
      amount: amount,
      discount: discount,
    };
    settableData([...tableData, dets]);
    setdescription("");
    setamount("");
    setdiscount("");
  };

  const addTransactionValues = () => {
    const dets = {
      date: transactionDate,
      method: method,
      category: category,
      amount: transAmount,
    };
    settransactionData([...transactionData, dets]);
    settransactionDate("");
    setmethod("");
    setcategory("");
    settransAmount("");
  };
  const dispatch = useDispatch();
  const [invoiceDate, setinvoiceDate] = useState(dayjs());
  const [dueDate, setdueDate] = useState(dayjs());
  const [addres, setaddres] = useState("UNITED ARAB EMIRATES, Nationality")
  const onFinish = (values) => {
    const startDate = values.days[0].$d;
    const endDate = values.days[1].$d;
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    const startDateFormatted = startDate.toLocaleString("en-GB", options);
    const endDateFormatted = endDate.toLocaleString("en-GB", options);
    if (
      !values.invoiceTo ||
      !addres ||
      !values.mobileNo ||
      !invoiceDate ||
      !dueDate ||
      !values.vehicleName ||
      !vehiclePartOne ||
      !vehiclePartTwo
    ) {
      return toast.error("Please fill out all required fields.");
    }
    // console.log(values);

    const value = {
      invoiceTo: values.invoiceTo,
      address: addres,
      mobileNo: values.mobileNo,
      invoiceDate: invoiceDate,
      dueDate: dueDate,
      invoiceStatus: invoiceStatus,
      orderStatus: orderStatus,
      vehicleName: values.vehicleName,
      startDate: startDateFormatted,
      endDate: endDateFormatted,
      vehicleNumber: vehiclePartOne + "-" + vehiclePartTwo,
    };
    console.log(value, 456);

    const dets = {
      value,
      tableData,
      transactionData,
      paidAmount,
    };
    dispatch(uploadBill(dets));
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const buttonItemLayout =
    formLayout === "horizontal"
      ? {
          wrapperCol: {
            span: 14,
            offset: 4,
          },
        }
      : null;
  const csv = useRef(null);
  const openInput = () => {
    csv.current.click();
  };

  const [jsonData, setJsonData] = useState(null);
  // const [csvFile, setCsvFile] = useState(null);

  // Handle CSV file upload and parse
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // setCsvFile(file);

    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (result) {
          settableData([...result.data]);
          console.log("Parsed JSON data:", result.data);
        },
        error: function (error) {
          console.error("Error parsing CSV: ", error);
        },
      });
    }
  };
  useEffect(() => {
    if (paidAmount !== 0) {
      settransAmount(paidAmount);
      console.log("hello");
    }
  }, [setpaidAmount, paidAmount, setpaidAmount]);
  console.log(paidAmount, transAmount, "amount");
  const invoice = useRef();
  const handleClick = () => {
    document.querySelector("#invoiceDate").click();
    invoice.current.click();
    console.log(invoice.current);
  };
console.log(addres);

  return (
    <Form
      layout={"vertical"}
      form={form}
      className="w-[90%] max-md:w-full px-[2vw] flex flex-col items-center justify-center  mx-auto"
      onFinish={onFinish} // Add this line
    >
      <div className="w-full grid grid-cols-2 gap-x-3 max-md:grid-cols-1 ">
        {/* <Form.Item label="Invoice To" name="invoiceTo">
          <Input placeholder="BLUE ONLY CAR RENTAL" type="text" />
        </Form.Item> */}
        <Form.Item
          name="invoiceTo"
          // label="Invoice To"
          // rules={[{ required: true, message: "Please input the invoice to!" }]}
        >
          <InputCustom
            title="Invoice To"
            placeholder="BLUE ONLY CAR RENTAL"
            name="invoiceTo"
            type="text"
          />
        </Form.Item>

          <InputCustom
            title="Address"
            // val="UNITED ARAB EMIRATES, Nationality: Saudi Arabia"
            value={addres}
            onChange={(e)=>setaddres(e.target.value)}
            // name="address"
            type="text"
          />

        <Form.Item name="mobileNo">
          <InputCustom
            title="Mobile No."
            placeholder="1234567898"
            name="mobileNo"
            type="number"
          />
        </Form.Item>
        {/* <Form.Item label="Mobile No." name="mobileNo">
          <Input placeholder="1234567898" type="number" />
        </Form.Item> */}
        {/* <Form.Item label="Invoice Date" name="invoiceDate" className="p-2"> */}
        <div className="flex flex-col gap-3 p-1">
          <label >
            Invoice Date
          </label>
          <DatePicker
            className="w-full p-2 rounded-xl h-fit"
            open={openInvoiceDatePicker}
            value={invoiceDate}
            onChange={(date) => {
              const formattedDate = dayjs(date).format("YYYY-MM-DD");

              setinvoiceDate(formattedDate);
              setOpenInvoiceDatePicker(false);
            }}
            onClick={handleOpenInvoiceDatePicker}
            placeholder="Select Invoice Date"
            
            // defaultValue={dayjs()}
          />
        </div>
        {/* </Form.Item> */}
        <Form.Item label="Due Date" name="dueDate" className="p-2">
          <DatePicker
            className="w-full p-2 rounded-xl"
            open={openDueDatePicker}
            value={dueDate}
            onChange={(date) => {
              const formattedDate = dayjs(date).format("YYYY-MM-DD");

              setdueDate(formattedDate);
              setOpenDueDatePicker(false);
            }}
            onClick={() => setOpenDueDatePicker(true)}
            placeholder="Select Invoice Date"
            // defaultValue={dayjs()}
          />
        </Form.Item>
        <Form.Item label="No. of Rental Dates" name="days" className="p-2">
          <RangePicker className="w-full p-2 rounded-xl" showTime />
        </Form.Item>
        <Form.Item
          label="Invoice Status"
          name="invoiceStatus"
          className="p-0 md:flex flex-col w-full"
        >
          <Select
            // className="w-full p-2 rounded-xl"
            defaultValue="Paid"
            value={invoiceStatus}
            style={{
              width: "100%",
              padding: "0.5rem",
              height: "60px",
              borderRadius: "0.75rem",
              // paddingRight:"2rem"
            }}
            onChange={(e) => setinvoiceStatus(e)}
            options={[
              {
                value: "Paid",
                label: "Paid",
              },
              {
                value: "Unpaid",
                label: "Unpaid",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Order Status"
          name="orderStatus"
          className="p-0 md:flex flex-col w-full"
        >
          <Select
            defaultValue="Completed"
            value={orderStatus}
            style={{
              width: "100%",
              padding: "0.5rem",
              height: "60px",
              borderRadius: "0.75rem",
              // paddingRight:"2rem"
            }}
            onChange={(value) => setorderStatus(value)}
            options={[
              {
                value: "Completed",
                label: "Completed",
              },
              {
                value: "Pending",
                label: "Pending",
              },
            ]}
          />
        </Form.Item>
        <Form.Item name="vehicleName">
          <InputCustom
            title={"Vehicle Name"}
            placeholder={"Vehicle Name"}
            // placeholder={"UNITED ARAB EMIRATES, Nationality: Saudi Arabia"}
            name={"vehicleName"}
            type={"text"}
          />
        </Form.Item>

        <Form.Item
          label="Vehicle Number"
          className="flex items-center"
          name="vehicleNumber"
        >
          <div className="flex items-center gap-2">
            <Input.OTP
              value={vehiclePartOne}
              onChange={(e) => setVehiclePartOne(e)}
              placeholder="A"
              length={1}
              formatter={(str) => str.toUpperCase()}
            />
            <span className="font-semibold text-2xl">-</span>
            <Input.OTP
              value={vehiclePartTwo}
              onChange={(e) => setVehiclePartTwo(e)}
              placeholder="12345"
              length={5}
              type="number"
              formatter={(str) => str.replace(/\D/g, "")}
            />
          </div>
        </Form.Item>
      </div>
      <div className="w-full">
        <h1 className="font-semibold text-xl pb-4">Add Bill Details</h1>
        <div className="w-full  grid grid-cols-5  place-items-center justify-items-center max-md:grid-cols-1 max-md:gap-x-2 pb-5 max-md:place-items-start">
          {/* <div className="flex flex-col items-start justify-start gap-2 w-full h-full pl-4">
            <span>Description</span>
            <Input
              placeholder="Demo Product"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              type="text"
            />
          </div> */}
          <InputCustom
            title={"Description"}
            placeholder={"Demo Product"}
            // placeholder={"UNITED ARAB EMIRATES, Nationality: Saudi Arabia"}
            // name={"vehicleName"}
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            type={"text"}
          />
          <InputCustom
            title={"Amount"}
            placeholder={"500"}
            // placeholder={"UNITED ARAB EMIRATES, Nationality: Saudi Arabia"}
            // name={"vehicleName"}
            value={amount}
            onChange={(e) => setamount(e.target.value)}
            type={"text"}
          />
          <InputCustom
            title={"Discount"}
            placeholder={"100"}
            // placeholder={"UNITED ARAB EMIRATES, Nationality: Saudi Arabia"}
            // name={"vehicleName"}
            value={discount}
            onChange={(e) => setdiscount(e.target.value)}
            type={"text"}
          />
          {/* <div className="flex flex-col items-start justify-start gap-2 w-full h-full pl-4">
            <span>Amount</span>
            <Input
              placeholder="500"
              value={amount}
              onChange={(e) => setamount(e.target.value)}
              type="number"
            />
          </div> */}
          {/* <div className="flex flex-col items-start justify-start gap-2 w-full h-full pl-4">
            <span>Discount</span>
            <Input
              placeholder="100"
              value={discount}
              onChange={(e) => setdiscount(e.target.value)}
              type="number"
            />
          </div> */}
          <Button
            type="primary"
            onClick={addBillValues}
            className="w-fit max-md:ml-2"
          >
            Add Values
          </Button>
          <Button
            type="dashed"
            onClick={openInput}
            className="w-fit max-md:ml-2 max-md:mt-2"
          >
            Add CSV
          </Button>
          <input
            type="file"
            accept=".csv"
            ref={csv}
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
        </div>
        {tableData && tableData?.length > 0 ? (
          <TableDetail
            data={tableData}
            type={"add"}
            settableData={settableData}
          />
        ) : (
          ""
        )}
        <Form.Item label="Paid Amount">
          <Input
            placeholder="450"
            value={paidAmount}
            onChange={(e) => setpaidAmount(e.target.value)}
            type="number"
          />
        </Form.Item>
      </div>
      <div className="w-full ">
        <h1 className="font-semibold text-xl pb-4">Add Transaction Details</h1>
        <div className="w-full  grid grid-cols-5  place-items-center justify-items-center max-md:grid-cols-1 max-md:gap-3 gap-2">
          {/* <Form.Item label="Date" className="w-full" name="transactionDate">
            <Input
              value={transactionDate}
              onChange={(e) => settransactionDate(e.target.value)}
              type="date"
            />
          </Form.Item> */}
          <Form.Item label="Date" name="Date" className="p-2 w-full">
            <DatePicker
              className="w-full p-2 rounded-xl"
              open={openDate}
              value={transactionDate}
              onChange={(date) => {
                // Format the date to YYYY-MM-DD
                const formattedDate = dayjs(date).format("YYYY-MM-DD");
                settransactionDate(formattedDate);
                setopenDate(false);
              }}
              onClick={() => setopenDate(true)}
              placeholder="Select Invoice Date"
            />
          </Form.Item>
          <Form.Item
            label="Payment Method"
            className="w-full"
            name="paymentMethod"
          >
            <Select
              // defaultValue="Cash"
              style={{
                width: "100%",
              }}
              value={method}
              onChange={(e) => setmethod(e)}
              // defaultValue={"Select "}
              defaultValue={"Cash"}
              options={[
                {
                  value: "Cash",
                  label: "Cash",
                },
                {
                  value: "Online",
                  label: "Online",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Category"
            name="transactionCategory"
            className="w-full"
          >
            <Select
              // defaultValue="Rental Income"
              style={{
                width: "100%",
              }}
              value={category}
              onChange={(e) => setcategory(e)}
              defaultValue={"Rental Income"}
              options={[
                {
                  value: "Rental Income",
                  label: "Rental Income",
                },
              ]}
            />
          </Form.Item>
          <div className="flex flex-col items-start justify-start gap-2 w-full h-full pl-4 max-md:pl-0 mt-2">
            <span>Amount</span>
            <Input
              onChange={(e) => settransAmount(e.target.value)}
              value={transAmount}
              type="number"
              placeholder="Enter the amount"
            />
          </div>
          <Button
            type="primary"
            onClick={addTransactionValues}
            className="w-fit max-md:mr-auto max-md:mt-4"
          >
            Add Values
          </Button>
        </div>
        {transactionData && transactionData?.length > 0 ? (
          <TransactionTable data={transactionData} />
        ) : (
          ""
        )}
      </div>
      <Form.Item
        {...buttonItemLayout}
        className="max-md:translate-x-1/3 max-md:mt-4 max-md:text-2xl"
      >
        <Button
          type="primary"
          className="max-md:text-xl max-md:px-10 max-md:py-5 text-2xl p-10 py-4"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BillInputs;
