'use client';

import { useAppSelector } from '@/app/providers/StoreProvider/config/store';
import { ToggleSidebarBtn } from '@/features/ToggleSidebarBtn';
import { setIsDarkMode } from '@/state';
import { Bell, Menu, Moon, Settings, Sun } from 'lucide-react';
import Link from 'next/link';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export const Navbar = () => {
  const dispatch = useDispatch();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const toggleTheme = useCallback(() => {
    dispatch(setIsDarkMode(!isDarkMode));
  }, [dispatch, isDarkMode]);

  return (
    <div className="flex-between w-full mb-7">
      {/* LEFT SIDE */}
      <div className="flex-between gap-5">
        <ToggleSidebarBtn />

        <div className="relative">
          <input
            type="search"
            placeholder="Start type to search groups & products"
            className="pl-10 pr-4 py-2 w-50 md:w-80 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
          />
          <div className="absolute left-0 inset-y-0 pl-3 flex items-center pointer-events-none">
            <Bell size={20} className="text-gray-500" />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-between gap-5">
        <div className="hidden md:flex items-center gap-5">
          <button onClick={toggleTheme}>
            {!isDarkMode ? (
              <Moon className="text-gray-500 cursor-pointer" size={24} />
            ) : (
              <Sun className="text-gray-500 cursor-pointer" size={24} />
            )}
          </button>
          <div className="relative">
            <Bell className="text-gray-500 cursor-pointer" size={24} />
            <span className="absolute  -right-2 -top-2 bg-red-400 rounded-full inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100">
              3
            </span>
          </div>
          <hr className="border-gray-300 h-7 w-0 border mx-3" />
          <div className="flex items-center gap-3 cursor-pointer">
            {/* <Image
              src={''}
              alt={'Avatar'}
              width={34}
              height={34}
              className="bg-gray-300 rounded-full overflow-hidden text-xs"
            /> */}
            <span className=" font-semibold">FTOE</span>
          </div>
        </div>
        <Link href={'/settings'}>
          <Settings size={24} className="text-gray-500 cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};
