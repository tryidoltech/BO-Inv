import React, { useEffect } from 'react'
import NavBar from '../Components/NavBar'
import { useDispatch, useSelector } from 'react-redux';
import { getAllBill } from '../Store/Action/UserAction';
import InvoiceTable from '../Components/InvoiceTable';

const Dashboard = () => {
  const { loading, message, error, bill } = useSelector((state) => state.User);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllBill());
  }, []);
  return (
    <div className="w-full h-screen">
      <NavBar/>
      <div className="w-full h-screen p-10 max-md:p-4">
      <h1 className='text-3xl font-semibold '>Dashboard</h1>
        <div className="w-full grid grid-cols-4 p-10 gap-4 max-md:grid-cols-2 max-md:p-0 ">
          <div className="w-full shadow-md hover:shadow-lg cursor-pointer ease-linear duration-300 shadow-gray-300 flex bg-blue-200 rounded-xl h-[25vh] text-xl max-md:text-base font-semibold  items-center flex-col justify-center">
          <img src="/user.png" alt="" />
          <h1>Total Invoices</h1>
          <h1>{bill?.length}</h1>
          </div>
          <div className="w-full shadow-md hover:shadow-lg cursor-pointer ease-linear duration-300 shadow-gray-300 flex bg-green-200 rounded-xl h-[25vh] text-xl max-md:text-base font-semibold  items-center flex-col justify-center">
          <img src="/completed.png" alt="" />
          <h1>Completed Invoices</h1>
          <h1>{bill?.length}</h1>
          </div>
          <div className="w-full shadow-md hover:shadow-lg cursor-pointer ease-linear duration-300 shadow-gray-300 flex bg-red-200 rounded-xl h-[25vh] text-xl max-md:text-base font-semibold  items-center flex-col justify-center">
          <img src="/product.png" alt="" />
          <h1>Total Product</h1>
          <h1>{bill?.length}</h1>
          </div>
          <div className="w-full shadow-md hover:shadow-lg cursor-pointer ease-linear duration-300 shadow-gray-300 flex bg-yellow-200 rounded-xl h-[25vh] text-xl max-md:text-base font-semibold  items-center flex-col justify-center">
          <img src="/invoice.png" alt="" />
          <h1>Recent Invoices</h1>
          <h1>{bill?.length}</h1>
          </div>
        </div>
    <InvoiceTable data={"Recent Invoice"} bill={bill}/>

      </div>
    </div>
  )
}

export default Dashboard