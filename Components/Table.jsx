import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";

const TableDetail = ({ data, paidAmount, name, number }) => {
  const [invoiceAmount, setinvoiceAmount] = useState(0);
  const [discountAmount, setdiscountAmount] = useState(0);
  useEffect(() => {
    var invoice = 0;
    var dis = 0;
    var totalAmnt = 0;
    data?.map((i) => {
      invoice += Number(i?.amount);
      dis += Number(i?.discount);
    });
    setinvoiceAmount(invoice);
    setdiscountAmount(dis);
  }, [data]);

  return (
    <div >
      <div class="relative overflow-x-auto max-md:mt-5 font-[gilroy] max-md:w-fit max-md:overflow-hidden ">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 border-l-2 mx-auto border-gray-300 max-md:mx-0">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 border-t-2 border-gray-300  ">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 border-r-2 border-b-2 border-gray-300"
              >
                Description
              </th>
              <th
                scope="col"
                class="px-6 py-3 border-r-2 border-b-2 border-gray-300"
              >
                Amount
              </th>
              <th
                scope="col"
                class="px-6 py-3 border-r-2 border-b-2 border-gray-300"
              >
                Discount
              </th>
              <th
                scope="col"
                class="px-6 py-3 border-r-2 border-b-2 border-gray-300"
              >
                Total Before Tax
              </th>
              <th
                scope="col"
                class="px-6 py-3 border-r-2 border-b-2 border-gray-300"
              >
                Tax
              </th>
              <th
                scope="col"
                class="px-6 py-3 font-semibold text-black border-r-2 border-b-2 border-gray-300 text-base"
              >
                Balance After Tax
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((i, index) => (
              <tr class="bg-white border-b ">
                <th
                  scope="row"
                  class="px-4 py-1.5 font-medium text-gray-900 whitespace-nowrap border-r-2 border-b-2 border-gray-300 "
                >
                  {i?.description}
                </th>
                <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black">
                  {i?.amount}
                </td>
                <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black">
                  {i?.discount}
                </td>
                <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black">
                  {Number(i?.amount) - Number(i?.discount)}
                </td>
                <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black">
                  {((Number(i?.amount) - Number(i?.discount)) * 5) / 100}
                </td>
                <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 font-semibold text-black text-sm font-[gilroy]">
                  {Number(i?.amount) -
                    Number(i?.discount) +
                    ((Number(i?.amount) - Number(i?.discount)) * 5) / 100}
                </td>
              </tr>
            ))}
            <tr class="bg-white border-b ">
              <th
                scope="row"
                class="px-6 text-righ4 py-1.5 font-medium text-gray-900 whitespace-nowrap border-r-2 border-b-2 border-gray-300 "
              >
                - Rent Vehicle {name} , <br /> Plate Number :(L){number}
              </th>
              <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black">
                {invoiceAmount}.00
              </td>
              <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black">
                {discountAmount}.00
              </td>
              <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black">
                {Number(invoiceAmount) - Number(discountAmount)}
              </td>
              <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black">
                {((Number(invoiceAmount) - Number(discountAmount)) * 5) / 100}
              </td>
              <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 font-semibold text-black text-sm font-[gilroy]">
                {Number(invoiceAmount) -
                  Number(discountAmount) +
                  ((Number(invoiceAmount) - Number(discountAmount)) * 5) / 100}
              </td>
            </tr>
            <tr class="bg-white border-b ">
              <th
                scope="row"
                class="px-6 text-righ4 py-1.5 font-medium text-gray-900 whitespace-nowrap border-r-2 border-b-2 border-gray-300 "
              >
                Invoice Amount
              </th>
              <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black">
                {invoiceAmount}.00
              </td>
              <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black">
                {discountAmount}.00
              </td>
              <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black">
                {Number(invoiceAmount) - Number(discountAmount)}
              </td>
              <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black">
                {((Number(invoiceAmount) - Number(discountAmount)) * 5) / 100}
              </td>
              <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 font-semibold text-black text-sm font-[gilroy]">
                {Number(invoiceAmount) -
                  Number(discountAmount) +
                  ((Number(invoiceAmount) - Number(discountAmount)) * 5) / 100}
              </td>
            </tr>
            <tr class="bg-white border-b ">
              <th
                scope="row"
                class="px-6 text-righ4 py-1.5 font-medium text-gray-900 whitespace-nowrap border-r-2 border-b-2 border-gray-300 "
              >
                Paid Amount
              </th>
              <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black">
                -
              </td>
              <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black">
                -
              </td>
              <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black">
                -
              </td>
              <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black">
                -
              </td>
              <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 font-semibold text-black text-base">
                {paidAmount}.00
              </td>
            </tr>
            <tr class="bg-white border-b ">
              <th
                scope="row"
                class="px-6 text-righ4 py-1.5 font-medium text-gray-900 whitespace-nowrap border-r-2 border-b-2 border-gray-300 "
              >
                Remaining Amount
              </th>
              <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black">
                -
              </td>
              <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black">
                -
              </td>
              <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black">
                -
              </td>
              <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black">
                -
              </td>
              <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 font-semibold text-black text-base">
                {Number(invoiceAmount) -
                  Number(discountAmount) +
                  ((Number(invoiceAmount) - Number(discountAmount)) * 5) / 100 -
                  paidAmount}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableDetail;
