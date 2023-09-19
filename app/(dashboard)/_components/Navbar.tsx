import React from 'react';
import { MobileSidebar } from './MobileSidebar';
import { NavbarRoutes } from '@/components/NavbarRoutes';
import { getUser } from '@/lib/auth/auth';


export const Navbar = async () => {
  const user = await getUser()
  return (
    <div className='p-4 border-b h-full flex items-center bg-white shadow-sm'>
      <MobileSidebar />
      <NavbarRoutes user={ user } />
    </div>

  );
}