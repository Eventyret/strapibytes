"use client"

import { User } from '@prisma/client';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SignIn from './SignIn';
import { UserAccountNav } from './UserAccountNav';

interface NavbarRoutesProps {
  user: User | null
}
export const NavbarRoutes: React.FC<NavbarRoutesProps> = ({ user }) => {
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
        user && user?.role !== "USER" ? (
          <Link href={ "/teacher/courses" } className='hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 py-1'>
            Teacher Mode
          </Link>

        ) : (
          null
        )
      ) }
      { user ? <UserAccountNav user={ user } /> : <SignIn /> }
    </div>
  );
}
