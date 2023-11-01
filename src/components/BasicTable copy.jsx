import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import mDta from "../MOCK_DATA.json";
import { DateTime } from "luxon";

const BasicTable = () => {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  /* 
{
  "id": 1,
  "first_name": "Isador",
  "last_name": "Kruger",
  "email": "ikruger0@huffingtonpost.com",
  "gender": "Male",
  "dob": "2023-04-28T11:19:35Z"
}
*/

  const data = React.useMemo(() => mDta, []); //we use the useMemo hook to memoize the data
  //columns definition
  const columns = [
    {
      Header: "ID",
      accessorKey: "id",
      footer: "ID",
    },
    {
      header: "Name",
      columns: [
        {
          Header: "First ",
          accessorKey: "first_name",
          footer: "ID",
        },
        {
          Header: "Last ",
          accessorKey: "last_name",
          footer: "ID",
        },
      ],
      //   footer: "ID",
    },
    // {
    //   header: "Name",
    //   accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    //   //   footer: "ID",
    // },
    // {
    //   Header: "First Name",
    //   accessorKey: "first_name",
    //   footer: "ID",
    // },
    // {
    //   Header: "Last Name",
    //   accessorKey: "last_name",
    //   footer: "ID",
    // },
    {
      Header: "Email",
      accessorKey: "email",
      footer: "ID",
    },
    {
      Header: "Gender",
      accessorKey: "gender",
      footer: "ID",
    },
    {
      Header: "Date of Birth",
      accessorKey: "dob",
      footer: "ID",
      cell: (info) => {
        const date = DateTime.fromISO(info.getValue());
        return date.toLocaleString(DateTime.DATE_MED);
      },
    },
  ];

  //create a table instance
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  }); //takes three arguments: data and columns
  return (
    <div className="w3-container">
      <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        placeholder="Search..."
        className="mb-4 w3-input w3-border w3-round"
      />
      <table className="w3-table-all">
        {/* table header */}
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        { asc: "🔼", desc: "🔽" }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* table body */}
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        {/* <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>
      <div className="flex gap-5 p-5 text-white">
        <button
          onClick={() => table.setPageIndex(0)}
          className="px-4 py-4 text-white bg-black border"
        >
          First page
        </button>
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          className="px-4 py-4 text-white bg-black border"
        >
          Previous page
        </button>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          className="px-4 py-4 text-white bg-black border"
        >
          Next page
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          className="px-4 py-4 text-white bg-black border"
        >
          Last page
        </button>
      </div>
    </div>
  );
};

export default BasicTable;
