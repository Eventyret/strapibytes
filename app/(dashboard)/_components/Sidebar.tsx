import React from 'react';

interface SidebarProps { }

export const Sidebar: React.FC<SidebarProps> = async () => {
  return (
    <div className='h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm'>
      Sidebar
    </div>
  );
}