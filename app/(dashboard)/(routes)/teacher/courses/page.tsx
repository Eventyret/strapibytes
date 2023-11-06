import { getUserId } from "@/lib/auth/auth";
import { db } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const CoursesPage = async () => {
  const userId = await getUserId();
  if (!userId) return redirect("/");
  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <DataTable
        columns={columns}
        data={courses}
      />
    </div>
  );
};
export default CoursesPage;
