import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const BasicTable = ({ data, columns }) => {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [customPageSize, setCustomPageSize] = useState(10); // nouvel état pour la taille de la page personnalisée

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
    pageSize: customPageSize, // Mettez à jour la taille de la page
  });

  return (
    <div className="w3-container">
      <div className="flex gap-4" style={{ marginBottom: "20px" }}>
        {/* Champ de texte pour la recherche globale */}
        <input
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          placeholder="Search..."
          className="mb-4 w3-input w3-border w3-round 1fr"
        />
        {/* Ajouter le champ de texte pour la taille de la page */}
        <div className="flex">
          <input
            type="number"
            value={customPageSize}
            onChange={(e) => setCustomPageSize(parseInt(e.target.value))}
            placeholder="Rows per page"
            className="w3-input w3-border w3-round"
            style={{ marginRight: "20px", width: "80px" }}
          />
          {/* Bouton pour appliquer la nouvelle taille de la page */}
          <button
            onClick={() => table.setPageSize(customPageSize)}
            className="px-4 py-2 text-white bg-black rounded w-max"
          >
            Apply Custom Page Size
          </button>
        </div>
      </div>
      <table className="w3-table-all" style={{ marginBottom: "20px" }}>
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
      </table>
      <div className="flex gap-5 p-5 text-white">
        <button
          onClick={() => table.setPageIndex(0)}
          className="px-4 py-4 text-white bg-black border rounded"
        >
          First page
        </button>
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          className="px-4 py-4 text-white bg-black border rounded"
        >
          Previous page
        </button>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          className="px-4 py-4 text-white bg-black border rounded"
        >
          Next page
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          className="px-4 py-4 text-white bg-black border rounded"
        >
          Last page
        </button>
      </div>
    </div>
  );
};

export default BasicTable;
