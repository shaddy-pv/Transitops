import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DataTableProps<T> {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  searchPlaceholder?: string;
  searchKey?: string;
  toolbar?: React.ReactNode;
  pageSize?: number;
}

export function DataTable<T>({
  columns,
  data,
  searchPlaceholder = "Search…",
  searchKey,
  toolbar,
  pageSize = 10,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filters, setFilters] = useState<ColumnFiltersState>([]);
  const [global, setGlobal] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters: filters, globalFilter: global },
    onSortingChange: setSorting,
    onColumnFiltersChange: setFilters,
    onGlobalFilterChange: setGlobal,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full max-w-xs">
          <Input
            placeholder={searchPlaceholder}
            value={
              searchKey
                ? ((table.getColumn(searchKey)?.getFilterValue() as string) ?? "")
                : global
            }
            onChange={(e) => {
              if (searchKey) table.getColumn(searchKey)?.setFilterValue(e.target.value);
              else setGlobal(e.target.value);
            }}
            className="h-9 bg-background"
          />
        </div>
        {toolbar}
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40 text-xs uppercase tracking-wide text-muted-foreground">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((h) => (
                    <th
                      key={h.id}
                      className="whitespace-nowrap border-b border-border px-4 py-3 text-left font-medium"
                    >
                      {h.isPlaceholder ? null : (
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 hover:text-foreground"
                          onClick={h.column.getToggleSortingHandler()}
                        >
                          {flexRender(h.column.columnDef.header, h.getContext())}
                          {h.column.getCanSort() && <ArrowUpDown className="h-3 w-3 opacity-50" />}
                        </button>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-16 text-center text-sm text-muted-foreground"
                  >
                    No results found.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-border/60 transition-colors last:border-0 hover:bg-secondary/30"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="whitespace-nowrap px-4 py-3 text-foreground">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-border px-4 py-3 text-xs text-muted-foreground">
          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {Math.max(1, table.getPageCount())} · {table.getFilteredRowModel().rows.length} rows
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              Next
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
