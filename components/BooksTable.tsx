"use client";
import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

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
}

const BooksTable = ({ rowData }: BooksTableProps) => {
  const columnDefs = useMemo<ColDef[]>(() => [
    { field: 'title', headerName: 'Title', sortable: true, filter: true, flex: 1 },
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
  ], []);

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
