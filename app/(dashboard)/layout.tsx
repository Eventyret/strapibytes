import { getUserId } from "@/lib/auth/auth";
import React from "react";
import { Navbar } from "./_components/Navbar";
import { Sidebar } from "./_components/Sidebar";
import { cn } from "@/lib/utils";
import { NoAuthPage } from "@/components/NoAuthPage";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = async ({
  children,
}) => {
  const userId = await getUserId();
  return (
    <>
      {userId ? (
        <div className="h-full">
          <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
            <Navbar />
          </div>
          <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
            <Sidebar />
          </div>
          <main className="h-full md:pl-56 pt-[96px]">{children}</main>
        </div>
      ) : (
        <NoAuthPage />
      )}
    </>
  );
};

export default DashboardLayout;
