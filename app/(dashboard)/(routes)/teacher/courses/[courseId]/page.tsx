import { getUser } from '@/lib/auth/auth';
import { db } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import React from 'react';

interface SingleCourseProps {
  params: {
    courseId: string;
  }
}

const SingleCourse: React.FC<SingleCourseProps> = async ({ params }) => {
  const user = await getUser()
  if (!user) {
    return redirect('/')
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId
    }
  })
  if (!course) {
    return redirect('/')
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId
  ]
  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length
  const completionText = `(${completedFields}/${totalFields})`
  return (
    <div className='p-6'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-y-2'>
          <h1 className='text-2xl font-medium'>
            Course Setup
          </h1>
          <span>Complete all fields { completionText }</span>
        </div>
      </div>
    </div>
  );
}
export default SingleCourse;