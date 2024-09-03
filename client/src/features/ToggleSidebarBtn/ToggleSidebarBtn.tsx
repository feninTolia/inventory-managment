import { useAppSelector } from '@/app/providers/StoreProvider';
import { setIsSidebarCollapsed } from '@/shared/state';
import { Menu } from 'lucide-react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

interface IProps {
  className?: string;
}

export const ToggleSidebarBtn = ({ className }: IProps) => {
  const dispatch = useDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = useCallback(() => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  }, [dispatch, isSidebarCollapsed]);

  return (
    <button
      className={`bg-gray-100 p-3 rounded-full hover:bg-blue-100 ${className}`}
      onClick={toggleSidebar}
    >
      <Menu className="w-4 h-4" />
    </button>
  );
};
