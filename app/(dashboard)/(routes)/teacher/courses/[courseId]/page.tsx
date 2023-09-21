import { IconBadge } from '@/components/icon-badge';
import { getUser } from '@/lib/auth/auth';
import { db } from '@/lib/prisma';
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react';
import { AttachmentForm } from './_components/AttachmentForm';
import { CategoryForm } from './_components/CategoryForm';
import { ChaptersForm } from './_components/ChaptersForm';
import { DescriptionForm } from './_components/DescriptionForm';
import { ImageForm } from './_components/ImageForm';
import { PriceForm } from './_components/PriceForm';
import { TitleForm } from './_components/TitleForm';

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
      id: params.courseId,
      userId: user.id
    },
    include: {
      chapters: {
        orderBy: {
          position: 'asc'
        }
      },
      attachments: {
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })
  if (!course) {
    return redirect('/')
  }

  const categories = await db.category.findMany()

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some(chapter => chapter.isPublished)
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
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
        <div>
          <div className='flex items-center gap-x-2'>
            <IconBadge icon={ LayoutDashboard } />
            <h2 className='text-xl'>Customize your course</h2>
          </div>
          <TitleForm initialData={ course } courseId={ course.id } />
          <DescriptionForm initialData={ course } courseId={ course.id } />
          <ImageForm initialData={ course } courseId={ course.id } />
          <CategoryForm initialData={ course } courseId={ course.id } options={ categories.map(category => ({ label: category.name, value: category.id })) } />
        </div>
        <div className='space-y-6'>
          <>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={ ListChecks } />
              <h2 className='text-xl'>Course Chapters</h2>
            </div>
            <div>
              <ChaptersForm initialData={ course } courseId={ course.id } />
            </div>
            <>
              <div className='flex items-center gap-x-2'>
                <IconBadge icon={ CircleDollarSign } />
                <h2 className='text-xl'>Sell your course</h2>
              </div>
              <PriceForm initialData={ course } courseId={ course.id } />
            </>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={ File } />
              <h2 className='text-xl'>Resources & Attachments</h2>
            </div>
            <AttachmentForm initialData={ course } courseId={ course.id } />
          </>
        </div>
      </div>
    </div>
  );
}
export default SingleCourse;