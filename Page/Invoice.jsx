import React, { useEffect } from "react";
import NavBar from "../Components/NavBar";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBill } from "../Store/Action/UserAction";
import { CircularProgress } from "@mui/material";

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
        <div className="w-full p-10 flex flex-col gap-4 max-md:p-4">
          <h1 className="font-semibold text-3xl">Invoices</h1>
          <div class="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
            <table class="w-full text-left table-auto min-w-max">
              <thead>
                <tr>
                  <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                    <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      S. No.
                    </p>
                  </th>
                  <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                    <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Created At
                    </p>
                  </th>
                  <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                    <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Invoice To
                    </p>
                  </th>
                  <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                    <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"></p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {bill?.map((i, index) => (
                  <tr>
                    <td class="p-4 border-b border-blue-gray-50">
                      <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {index + 1}
                      </p>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                     { new Date(i?.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50 max-md:w-20">
                      <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                       {i?.value?.invoiceTo}
                      </p>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <NavLink
                        to={`/bill/${i?._id}`}
                        class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                      >
                        <i className="ri-eye-line text-2xl"></i>
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoice;
