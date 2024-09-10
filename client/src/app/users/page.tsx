'use client';
import { IUser, useGetUsersQuery } from '@/shared/state/api';
import { Header } from '@/shared/ui/Header';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useCallback } from 'react';

const Users = () => {
  const { data: users, isError, isLoading } = useGetUsersQuery();

  const columns: GridColDef[] = [
    { field: 'userId', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'User Name',
      width: 200,
    },
    {
      field: 'email',
      headerName: 'User Email',
      width: 200,
    },
  ];

  const getRowId = useCallback((row: IUser) => row.userId, []);

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !users) {
    return <div className="text-center">Failed to fetch users</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <Header name="Users" />
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={getRowId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
};

export default Users;
