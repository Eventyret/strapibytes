import { getUser } from '@/lib/auth/auth';
import { db } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const user = await getUser();
    const { title } = await req.json();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    const course = await db.course.create({
      data: {
        title,
        userId: user.id
      }
    })
    return NextResponse.json(course, { status: 201 })
  } catch (error: any) {
    console.log("[COURSES]: ", error)
  }
}
