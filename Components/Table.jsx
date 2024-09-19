import React from "react";
import { Space, Table, Tag } from "antd";



const TableDetail = ({data}) => {
  return (
    <div>
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 border-l-2 mx-auto border-gray-300">
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
            {
                data?.map((i,index)=>(
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
                      65.00
                    </td>
                    <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black">
                     3.25
                    </td>
                    <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 font-semibold text-black text-sm font-[gilroy]">
                      68.25
                    </td>
                  </tr>
                ))
            }
            <tr class="bg-white border-b ">
              <th
                scope="row"
                class="px-6 text-righ4 py-1.5 font-medium text-gray-900 whitespace-nowrap border-r-2 border-b-2 border-gray-300 "
              >
                Invoice Amount
              </th>
              <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black">
               521.00
              </td>
              <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black">
                0.00
              </td>
              <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black">
               545.00
              </td>
              <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 text-black">
               27.25
              </td>
              <td class="px-4 py-1.5 border-r-2 border-b-2 border-gray-300 font-semibold text-black text-sm font-[gilroy]">
               572.25
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
               44.75
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
               527.50
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableDetail;
