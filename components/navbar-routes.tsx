"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { isTeacher } from "@/lib/teacher";
import { User } from "@prisma/client";
import { UserAccountNav } from "./auth/UserAccountNav";
import { SearchInput } from "./search-input";

interface NavbarRoutesProps {
  user: User | null;
}
export const NavbarRoutes = ({ user }: NavbarRoutesProps) => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button
              size="sm"
              variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : user && isTeacher(user) ? (
          <Link href="/teacher/courses">
            <Button
              size="sm"
              variant="ghost">
              Teacher mode
            </Button>
          </Link>
        ) : null}
        {user && <UserAccountNav user={user} />}
      </div>
    </>
  );
};
