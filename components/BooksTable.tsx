"use client";
import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { Edit } from 'lucide-react';

interface Book {
  _id: string;
  title: string;
  author: string;
  tags: string[];
  status: string;
  userId: string;
}

interface BooksTableProps {
  rowData: Book[];
  onEdit: (book: Book) => void;
}

const BooksTable = ({ rowData, onEdit }: BooksTableProps) => {
  const columnDefs = useMemo<ColDef[]>(() => [
    { field: 'title', headerName: 'Title', sortable: true, filter: true, flex: 1.5 },
    { field: 'author', headerName: 'Author', sortable: true, filter: true, flex: 1 },
    { 
      field: 'tags', 
      headerName: 'Tags', 
      valueFormatter: (params) => params.value?.join(', ') || '',
      flex: 1 
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      sortable: true, 
      filter: true,
      cellClassRules: {
        'bg-green-100 text-green-800': 'value === "Completed"',
        'bg-blue-100 text-blue-800': 'value === "Reading"',
        'bg-gray-100 text-gray-800': 'value === "Want to Read"',
      },
      flex: 1 
    },
    {
      headerName: 'Action',
      field: '_id' as any,
      cellRenderer: (params: any) => (
        <button
          onClick={() => onEdit(params.data)}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium cursor-pointer py-1 px-2 rounded hover:bg-blue-50 transition-colors"
        >
          <Edit size={16} />
          Edit
        </button>
      ),
      flex: 0.8,
      sortable: false,
      filter: false
    }
  ], [onEdit]);

  const defaultColDef = useMemo(() => ({
    resizable: true,
  }), []);

  return (
    <div className="ag-theme-alpine w-full h-[500px] shadow-sm rounded-xl overflow-hidden border border-gray-100">
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        domLayout='autoHeight'
      />
    </div>
  );
};

export default BooksTable;
