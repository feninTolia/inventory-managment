import React, { ReactNode } from 'react';
import { Navbar } from '../Navbar';
import { Sidebar } from '../Sidebar';

interface IProps {
  children: ReactNode;
}

export const DashboardWrapper = ({ children }: IProps) => {
  return (
    <div className="flex bg-gray-50 w-full min-h-screen">
      <Sidebar />
      <main className="flex flex-col w-full min-h-screen py-7 px-9 bg-gray-50 md:pl-24">
        <Navbar />
        {children}
      </main>
    </div>
  );
};
