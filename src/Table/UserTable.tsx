import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { ArrowUpDown } from "lucide-react";

import {
  useGetAllUsersQuery,
  type TotaluserProps,
} from "../query/server/TotalUser";
interface userTableProps {
  searchTerm: string;
}
export const UserTable = ({ searchTerm }: userTableProps) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data: getUserApi, isLoading } = useGetAllUsersQuery();

  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<TotaluserProps>[] = [
    {
      header: () => <span className="pl-3">S.N</span>,
      accessorKey: "sn",
      cell: ({ row }) => {
        return <p className="pl-4">{row.index + 1}</p>;
      },
      size: 70,
      enableSorting: false,
    },
    {
      header: "User Name",
      accessorKey: "name",
      size: 150,
      enableSorting: true,
    },
    {
      header: "Email",
      accessorKey: "email",
      size: 250,
      enableSorting: true,
    },
    {
      header: "Joined",
      accessorKey: "created_at",
      size: 150,
      enableSorting: true,
      cell: ({ row }) => {
        const date = row.original.created_at;
        const formatted = date?.split("T")[0];
        return <span>{formatted}</span>;
      },
    },

    {
      header: "Status",
      accessorKey: "is_active",
      cell: ({ row }) => (
        <div
          className={`w-fit py-1 px-2 text-center font-medium ${
            row.original.is_active
              ? "bg-green-200 text-green-800 rounded-2xl"
              : "bg-red-300 text-red-800 rounded-2xl"
          }`}
        >
          {row.original.is_active ? "Active" : "Inactive"}
        </div>
      ),
      size: 70,
      enableSorting: false,
    },
  ];

  React.useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, []);

  const tableData = useMemo(() => {
    if (!getUserApi?.users) return [];
    let users = getUserApi.users.filter((el) => el.is_admin === false);
    if (searchTerm && searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      users = users.filter(
        (user) =>
          user.name.toLowerCase().includes(lowerSearch) ||
          user.email.toLowerCase().includes(lowerSearch)
      );
    }

    return users;
  }, [getUserApi, searchTerm]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
    },
    columnResizeMode: "onChange",
  });

  return (
    <>
      <div className="flex w-full flex-col overflow-auto rounded-[.625rem] shadow-md">
        <div className="formScroll max-h-[30rem] w-full overflow-auto rounded-[10px]">
          <table
            className="w-full table-auto rounded-[10px]"
            style={{ tableLayout: "fixed" }}
          >
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="sticky -top-[1px] z-10 bg-orange-500 text-white"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="border-t py-2 text-left text-[16px] font-semibold"
                      style={{
                        width: header.getSize(),
                      }}
                    >
                      <div className="flex items-center">
                        <span
                          className={
                            header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : ""
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </span>
                        {header.column.getCanSort() && (
                          <ArrowUpDown
                            className="ml-2 h-4 w-4 cursor-pointer"
                            onClick={header.column.getToggleSortingHandler()}
                          />
                        )}
                        {{
                          asc: <span className="ml-1">↑</span>,
                          desc: <span className="ml-1">↓</span>,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="gap-1 py-4 text-center align-middle"
                  >
                    <div className="flex items-baseline justify-center gap-1 text-center">
                      <span>Loading</span>
                      <span className="h-1 w-1 animate-bounce rounded-full bg-gray-800 [animation-delay:-0.3s]"></span>
                      <span className="h-1 w-1 animate-bounce rounded-full bg-gray-800 [animation-delay:-0.15s]"></span>
                      <span className="h-1 w-1 animate-bounce rounded-full bg-gray-800"></span>
                    </div>
                  </td>
                </tr>
              ) : table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-4 text-center text-gray-500 font-medium"
                  >
                    No data found
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row, rowIndex) => (
                  <tr
                    key={row.id}
                    className={`h-10 cursor-pointer text-left hover:bg-gray-100 ${
                      rowIndex % 2 === 0 ? "bg-white" : "bg-sky-50/20"
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="border-b border-gray-300 py-2 pr-14 text-left text-[.875rem]"
                        style={{
                          width: cell.column.getSize(),
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="   p-4 shadow-md border-t-2 border-gray-400">
          <div className="mx-auto pt-1.5 flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                className="rounded-xl text-[14px] border bg-orange-500 text-white px-3 py-1 disabled:opacity-50"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </button>
              <button
                className="rounded-xl text-[14px] border bg-orange-500 text-white px-3 py-1 disabled:opacity-50"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </button>
            </div>
            <div>
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount() || 1}
            </div>
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
                className="rounded border px-2 py-1 text-[14px]"
              >
                {[10, 15, 20, 30, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
