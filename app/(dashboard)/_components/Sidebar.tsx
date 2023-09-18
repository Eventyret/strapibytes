import React from 'react';
import { Logo } from './Logo';
import { SidebarRoutes } from './SidebarRoutes';

interface SidebarProps { }

export const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <div className='h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm'>
      <div className='p-6'>
        <Logo />
      </div>
      <div className='flex flex-col w-full'>
        <SidebarRoutes />
      </div>
    </div>
  );
}