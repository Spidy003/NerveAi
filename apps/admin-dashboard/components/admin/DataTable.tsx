"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

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
    <div className="overflow-x-auto rounded-xl border border-gray-800 bg-card">
      <table className="w-full text-left text-sm text-gray-300">
        <thead className="bg-gray-800/50 text-gray-400 border-b border-gray-800">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-4 font-medium">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800/50">
          {data.map((row, idx) => (
            <tr 
              key={idx} 
              onClick={() => onRowClick?.(row)}
              className={`hover:bg-gray-800/30 transition-colors ${onRowClick ? "cursor-pointer" : ""}`}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
