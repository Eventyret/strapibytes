import { getUser } from '@/lib/auth/auth';
import { db } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { courseId: string } }) {
  console.log("Fire in the hole")
  try {
    const user = await getUser();
    const { courseId } = params
    const values = await req.json();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    const course = await db.course.update({
      where: {
        id: courseId,
        userId: user.id
      },
      data: {
        ...values
      }
    })
    return NextResponse.json(course, { status: 200 })

  } catch (error) {
    console.log("[COURSE_ID]: ", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}