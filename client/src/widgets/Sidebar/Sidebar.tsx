'use client';
import { useAppSelector } from '@/app/providers/StoreProvider/config/store';
import { ToggleSidebarBtn } from '@/features/ToggleSidebarBtn';
import { SidebarLink } from './SidebarLink';
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  SlidersHorizontal,
  User,
} from 'lucide-react';
import Image from 'next/image';

export const Sidebar = () => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? 'w-0 md:w-16' : 'w-72 md:w-64'
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
      {/* TOP LOGO */}
      <div
        className={`flex flex-between items-center gap-3 pt-8 md:justify-normal ${
          isSidebarCollapsed ? 'px-5' : 'px-8'
        }`}
      >
        <Image
          src={
            'https://s3-inventorymanagement-ftoe.s3.eu-central-1.amazonaws.com/logo.png'
          }
          alt={'festock logo'}
          width={27}
          height={27}
          className="rounded w-8 "
        />
        <h1
          className={`text-2xl font-extrabold ${
            isSidebarCollapsed ? 'hidden' : 'block '
          }`}
        >
          FESTOCK
        </h1>
        <ToggleSidebarBtn className="md:hidden" />
      </div>

      {/* LINKS */}
      <div className="flex flex-col flex-grow mt-8">
        <SidebarLink
          href={'/dashboard'}
          Icon={Layout}
          label={'Dashboard'}
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href={'/inventory'}
          Icon={Archive}
          label={'Inventory'}
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href={'/products'}
          Icon={Clipboard}
          label={'Products'}
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href={'/users'}
          Icon={User}
          label={'Users'}
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href={'/settings'}
          Icon={SlidersHorizontal}
          label={'Settings'}
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href={'/expenses'}
          Icon={CircleDollarSign}
          label={'Expenses'}
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* FOOTER */}
      <div className={isSidebarCollapsed ? 'hidden' : 'block mb-10'}>
        <p className={`text-center text-xs text-gray-500`}>
          &copy; 2024 Festock
        </p>
      </div>
    </div>
  );
};
