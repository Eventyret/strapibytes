import { getUserRole } from '@/lib/auth/auth';
import { db } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { courseId: string, chapterId: string } }) {
  try {
    const userId = await getUserRole();
    const values = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId
      }
    })

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId
      },
      data: {
        ...values
      }
    })
    // TODO: Handle video upload
    return NextResponse.json(chapter, { status: 200 })

  } catch (error) {
    console.log("[COURSE_CHAPTER_ID]: ", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }

}