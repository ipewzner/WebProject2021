import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector } from 'react-redux';


export default function Users() {
  const users = useSelector((state) => state.users);
  console.log("users "+JSON.stringify(users));
  // email,name,type
  const rows = [
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  const columns = [
    { field: 'type', headerName: 'Type', width: 110, editable: true },
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'email', headerName: 'Email', width: 150, editable: true },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

