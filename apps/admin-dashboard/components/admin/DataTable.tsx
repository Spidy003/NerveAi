"use client";

import { useState } from "react";

interface Column {
  key: string;
  label: string;
  render?: (val: any, item: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onRowClick?: (item: any) => void;
}

export function DataTable({ columns, data, onRowClick }: DataTableProps) {
  return (
    <div className="neu-flat rounded-3xl overflow-hidden p-3">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-700">
          <thead className="text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-200/80">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-4 font-semibold">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60">
            {data.map((row, idx) => (
              <tr 
                key={idx} 
                onClick={() => onRowClick?.(row)}
                className={`hover:bg-blue-50/50 transition-colors ${onRowClick ? "cursor-pointer" : ""}`}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 whitespace-nowrap font-medium text-slate-700">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-slate-400 font-medium">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
