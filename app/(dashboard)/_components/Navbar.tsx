import React from 'react';
import { MobileSidebar } from './MobileSidebar';


export const Navbar = async () => {
  return (
    <div className='p-4 border-b h-full flex items-center bg-white shadow-sm'>
      <MobileSidebar />
    </div>
  );
}