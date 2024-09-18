import { Button, Form, Input, Select } from "antd";
import React, { useState } from "react";
import TableDetail from "./Table";
import TransactionTable from "./TransactionTable";
import { useNavigate } from "react-router";

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
const navigate = useNavigate()
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const addBillValues = () => {
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

  // Handle form submission
  const onFinish = (values) => {
    const value = {
        invoiceTo: values.invoiceTo,
        address: values.address,
        mobileNo: values.mobileNo,
        invoiceDate: values.invoiceDate,
        dueDate: values.dueDate,
        invoiceStatus: values.invoiceStatus,
        orderStatus: values.orderStatus
      };
    const dets = {
        value,
        tableData,
        transactionData
    }
    localStorage.setItem("data",JSON.stringify(dets));
    navigate("/")
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

  return (
    <Form
      layout={"vertical"}
      form={form}
      className="w-[90%]"
      onFinish={onFinish} // Add this line
    >
      <div className="w-full grid grid-cols-3 gap-x-3">
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
        <Form.Item label="Invoice Status" name="invoiceStatus">
          <Select
            defaultValue="Paid"
            style={{
              width: "100%",
            }}
            onChange={handleChange}
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
            style={{
              width: "100%",
            }}
            onChange={handleChange}
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
      </div>
      <div className="w-full ">
        <h1 className="font-semibold text-xl pb-4">Add Bill Details</h1>
        <div className="w-full  grid grid-cols-5  place-items-center justify-items-center">
          <Form.Item label="Description" name="billDescription">
            <Input
              placeholder="Demo Product"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              type="text"
            />
          </Form.Item>
          <Form.Item label="Amount" name="billAmount">
            <Input
              placeholder="500"
              value={amount}
              onChange={(e) => setamount(e.target.value)}
              type="number"
            />
          </Form.Item>
          <Form.Item label="Discount" name="billDiscount">
            <Input
              placeholder="100"
              value={discount}
              onChange={(e) => setdiscount(e.target.value)}
              type="number"
            />
          </Form.Item>
          <Button type="primary" onClick={addBillValues} className="w-fit">
            Add Values
          </Button>
        </div>
        {tableData && tableData?.length > 0 ? (
          <TableDetail data={tableData} />
        ) : (
          ""
        )}
      </div>
      <div className="w-full ">
        <h1 className="font-semibold text-xl pb-4">Add Transaction Details</h1>
        <div className="w-full  grid grid-cols-5  place-items-center justify-items-center">
          <Form.Item label="Date" name="transactionDate">
            <Input
              value={transactionDate}
              onChange={(e) => settransactionDate(e.target.value)}
              type="date"
            />
          </Form.Item>
          <Form.Item label="Payment Method" name="paymentMethod">
            <Select
              defaultValue="Cash"
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
          <Form.Item label="Category" name="transactionCategory">
            <Select
              defaultValue="Rental Income"
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
          <Form.Item label="Amount" name="transactionAmount">
            <Input
              value={transAmount}
              onChange={(e) => settransAmount(e.target.value)}
              type="number"
            />
          </Form.Item>
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
      <Form.Item {...buttonItemLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BillInputs;
