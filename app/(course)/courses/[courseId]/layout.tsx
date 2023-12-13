import { getProgress } from "@/actions/get-progress";
import { getUserId } from "@/lib/auth/auth";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";
import { CourseSidebar } from "./_components/course-sidebar";

interface CourseLayoutProps {
  children: React.ReactNode;
  params: {
    courseId: string;
  };
}

const CourseLayout: React.FC<CourseLayoutProps> = async ({
  children,
  params,
}) => {
  const userId = await getUserId();
  if (!userId) return redirect("/");

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });
  if (!course) return redirect("/");
  const progressCount = await getProgress(userId, course.id);
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-80 flex-col inset-y-0 z-50">
        <CourseSidebar
          course={course}
          progressCount={progressCount}
        />
      </div>
      <main className="md:pl-80 h-full">{children}</main>
    </div>
  );
};

export default CourseLayout;
