import { redirect } from "next/navigation";

import { db } from "@/lib/prisma";
import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/CoursesList";

import { getUserId } from "@/lib/auth/auth";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/serach-input";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const userId = await getUserId();
  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
