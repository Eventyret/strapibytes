"use client"

import { UserButton } from '@clerk/nextjs';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';


export const NavbarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isTeacherPage = pathname?.startsWith('/teacher');
  const isPlayerPage = pathname?.startsWith('/chapter');
  return (
    <div className='flex gap-x-2 ml-auto'>
      { isTeacherPage || isPlayerPage ? (
        <Button>
          <LogOut className='h-4 w-4 mr-2' />
        </Button>
      ) : (
        <Link href={ "teacher/courses" } className='hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 py-1'>
          Teacher Mode
        </Link>
      ) }
      <UserButton />
    </div>
  );
}