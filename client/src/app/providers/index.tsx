'use client';
import { ReactNode } from 'react';
import StoreProvider from './StoreProvider/ui/StoreProvider';

export const Providers = ({ children }: { children: ReactNode }) => {
  return <StoreProvider>{children}</StoreProvider>;
};
