import { useState } from "react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Button, Popover } from "antd";
import CreateData from "./CreateData";
import { useDataStore } from "../hooks/useDataStore";
import DataTabs from "./DataTabs";
import Stats from "./Stats";

const columns = [
  {
    accessorKey: "id",
    header: () => "ID",
    cell: ({ row }) => {
      const id = row.original.id;
      return id;
    },
  },
  {
    accessorKey: "title",
    header: () => "Title",
    cell: ({ row }) => {
      const title = row.original.title;
      return title;
    },
  },
  {
    accessorKey: "body",
    header: () => "Body",
    cell: ({ row }) => {
      const body = row.original.body;
      return <p className="max-w-40 w-full truncate">{body}</p>;
    },
  },
];

export default function DataTable() {
  const { data } = useDataStore();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 4,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: { pagination },
  });

  const dataColumns = table
    .getAllColumns()
    .filter(
      (column) =>
        typeof column.accessorFn !== "undefined" && column.getCanHide()
    );

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-semibold">Entrpirse Risk Management</h2>
        <Stats />
      </div>

      <div className="flex items-center justify-between py-4">
        <Popover
          content={
            <ul>
              {dataColumns.map((col) => (
                <li
                  key={col.id}
                  onClick={() => col.toggleVisibility(!col.getIsVisible())}
                >
                  {col.id}
                </li>
              ))}
            </ul>
          }
          title="Filter by"
          trigger="click"
        >
          <Button className="max-w-60">Filter</Button>
        </Popover>
        <CreateData />
      </div>

      <table className="w-full border border-neutral-200">
        <thead className="border border-neutral-200 [&_tr]:border-b">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="border border-b border-neutral-200 transition [&>:not(:last-child)]:border-r"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="h-10 px-3 text-left align-middle font-medium whitespace-nowrap cursor-default"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="[&_tr:last-child]:border-0 border border-neutral-200">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="border border-neutral-200 border-b transition [&>:not(:last-child)]:border-r"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-3 py-2 align-middle text-sm whitespace-nowrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={table.getAllColumns().length}>No results.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
