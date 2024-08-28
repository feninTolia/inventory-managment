'use client';
import React, { ReactNode, useEffect } from 'react';
import { Navbar } from '../Navbar';
import { Sidebar } from '../Sidebar';
import { useAppSelector } from '@/app/providers/StoreProvider/config/store';

interface IProps {
  children: ReactNode;
}

export const DashboardWrapper = ({ children }: IProps) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div
      className={`${
        isDarkMode ? 'dark' : 'light'
      } flex bg-gray-50 w-full min-h-screen `}
    >
      <Sidebar />
      <main
        className={`flex flex-col w-full min-h-screen py-7 px-9 bg-gray-50 ${
          isSidebarCollapsed ? 'md:pl-24' : 'md:pl-72'
        } `}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};
