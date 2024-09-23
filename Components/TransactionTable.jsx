import React, { useEffect, useState } from "react";

const TransactionTable = ({ data,invoiceId }) => {
  const [amout, setamout] = useState("");
  useEffect(() => {
    var amnt = 0;
    data?.map((i) => (amnt += Number(i.amount)));
    setamout(amnt);
  }, [data]);

  return (
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 border-l-2 mx-auto border-gray-300">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 border-t-2 border-gray-300  ">
        <tr>
          <th
            scope="col"
            class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300"
          >
            #
          </th>
          <th
            scope="col"
            class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300"
          >
            Date
          </th>
          <th
            scope="col"
            class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300"
          >
            Payment Method
          </th>
          <th
            scope="col"
            class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300"
          >
            Category
          </th>
          <th
            scope="col"
            class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300"
          >
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((i, index) => (
          <tr class="bg-white border-b " key={index}>
            <th
              scope="row"
              class="px-4 py-1.5 font-medium text-gray-900 whitespace-nowrap border-r-2 border-b-2 border-gray-300 "
            >
              #{invoiceId}
            </th>
            <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black">
              {i?.date}
            </td>
            <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black">
              {i?.method}
            </td>
            <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black">
              {i?.category}
            </td>
            <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black">
              {i?.amount} AED
            </td>
          </tr>
        ))}

        <tr class="bg-white border-b ">
          <th
            scope="row"
            class="px-4 py-1.5 font-medium text-gray-900 whitespace-nowrap border-b-2 border-gray-300"
          ></th>
          <td class="px-4 py-1.5 text-black border-b-2 border-gray-300"></td>
          <td class="px-4 py-1.5 text-black border-b-2 border-gray-300"></td>
          <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black text-right font-extrabold text-base">
            Total
          </td>
          <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black font-extrabold text-base">
            {amout} AED
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TransactionTable;
