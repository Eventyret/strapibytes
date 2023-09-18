"use client"

import { UserButton } from '@clerk/nextjs';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


export const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith('/teacher');
  const isPlayerPage = pathname?.startsWith('/chapter');
  return (
    <div className='flex gap-x-2 ml-auto'>
      { isTeacherPage || isPlayerPage ? (
        <Link href={ "/" } className='inline-flex justify-center items-center hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 py-1'>
          <LogOut className='h-4 w-4 mr-2' /> Exit
        </Link>
      ) : (
        <Link href={ "teacher/courses" } className='hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 py-1'>
          Teacher Mode
        </Link>
      ) }
      <UserButton afterSignOutUrl='/' />
    </div>
  );
}