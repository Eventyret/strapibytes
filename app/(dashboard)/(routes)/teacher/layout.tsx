import { getUser, getUserId } from "@/lib/auth/auth";
import { isTeacher } from "@/lib/teacher";
import { redirect } from "next/navigation";

const TeacherLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  if (user && !isTeacher(user)) {
    return redirect("/");
  }

  return <>{children}</>;
};

export default TeacherLayout;
