import { Button, Form, Input, Select, DatePicker } from "antd";
import React, { useEffect, useRef, useState } from "react";
import TableDetail from "./Table";
import TransactionTable from "./TransactionTable";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { uploadBill } from "../Store/Action/UserAction";
import Papa from "papaparse";
import { toast } from "react-toastify";
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
      !values.address ||
      !values.mobileNo ||
      !values.invoiceDate ||
      !values.dueDate ||
      !values.vehicleName ||
      !vehiclePartOne ||
      !vehiclePartTwo
    ) {
      return toast.error("Please fill out all required fields.");
    }
    const value = {
      invoiceTo: values.invoiceTo,
      address: values.address,
      mobileNo: values.mobileNo,
      invoiceDate: values.invoiceDate,
      dueDate: values.dueDate,
      invoiceStatus: invoiceStatus,
      orderStatus: orderStatus,
      vehicleName: values.vehicleName,
      startDate: startDateFormatted,
      endDate: endDateFormatted,
      vehicleNumber: vehiclePartOne + "-" + vehiclePartTwo,
    };
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

  return (
    <Form
      layout={"vertical"}
      form={form}
      className="w-[90%] max-md:w-full"
      onFinish={onFinish} // Add this line
    >
      <div className="w-full grid grid-cols-3 gap-x-3 max-md:grid-cols-2">
        <Form.Item label="Invoice To" name="invoiceTo">
          <Input placeholder="BLUE ONLY CAR RENTAL" type="text" />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input
            placeholder="UNITED ARAB EMIRATES, Nationality: Saudi Arabia"
            type="text"
          />
        </Form.Item>
        <Form.Item label="Invoicer Mobile No." name="mobileNo">
          <Input placeholder="1234567898" type="number" />
        </Form.Item>
        <Form.Item label="Invoice Date" name="invoiceDate">
          <Input placeholder="input placeholder" type="date" />
        </Form.Item>
        <Form.Item label="Due Date" name="dueDate">
          <Input placeholder="input placeholder" type="date" />
        </Form.Item>
        <Form.Item label="Number of Rental Dates" name="days">
          <RangePicker showTime />
        </Form.Item>
        <Form.Item label="Invoice Status" name="invoiceStatus">
          <Select
            defaultValue="Paid"
            value={invoiceStatus}
            style={{
              width: "100%",
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
        <Form.Item label="Order Status" name="orderStatus">
          <Select
            defaultValue="Completed"
            value={orderStatus}
            style={{
              width: "100%",
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
        <Form.Item label="Vehicle Name" name="vehicleName">
          <Input placeholder="Vehicle Name" type="text" />
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
        <div className="w-full  grid grid-cols-5  place-items-center justify-items-center max-md:grid-cols-3 max-md:gap-x-2 pb-5">
          <div className="flex flex-col items-start justify-start gap-2 w-full h-full pl-4">
            <span>Description</span>
            <Input
              placeholder="Demo Product"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              type="text"
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-2 w-full h-full pl-4">
            <span>Amount</span>
            <Input
              placeholder="500"
              value={amount}
              onChange={(e) => setamount(e.target.value)}
              type="number"
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-2 w-full h-full pl-4">
            <span>Discount</span>
            <Input
              placeholder="100"
              value={discount}
              onChange={(e) => setdiscount(e.target.value)}
              type="number"
            />
          </div>
          <Button type="primary" onClick={addBillValues} className="w-fit">
            Add Values
          </Button>
          <Button type="primary" onClick={openInput} className="w-fit">
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
        <div className="w-full  grid grid-cols-5  place-items-center justify-items-center max-md:grid-cols-2 max-md:gap-x-3">
          <Form.Item label="Date" name="transactionDate">
            <Input
              value={transactionDate}
              onChange={(e) => settransactionDate(e.target.value)}
              type="date"
            />
          </Form.Item>
          <Form.Item label="Payment Method" name="paymentMethod">
            <Select
              // defaultValue="Cash"
              style={{
                width: "100%",
              }}
              value={method}
              onChange={(e) => setmethod(e)}
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
              options={[
                {
                  value: "Rental Income",
                  label: "Rental Income",
                },
              ]}
            />
          </Form.Item>
          <div className="flex flex-col items-start justify-start gap-2 w-full h-full pl-4" >
            <span>Amount</span>
            <Input
              onChange={(e) => settransAmount(e.target.value)}
              value={transAmount}
              type="number"
            />
          </div>
          <Button
            type="primary"
            onClick={addTransactionValues}
            className="w-fit"
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BillInputs;
