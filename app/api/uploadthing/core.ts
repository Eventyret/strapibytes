import { authOptions } from '@/lib/auth/next-auth-config';
import { isTeacher } from '@/lib/teacher';
import { getServerSession } from 'next-auth';
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const session = await getServerSession(authOptions);
  const isAuthorized = isTeacher(session?.user);
  if (!session || !isAuthorized) throw new Error("Unauthorized");

  return { userId: session.user?.id };
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => await handleAuth())
    .onUploadComplete(async () => { }),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(async () => await handleAuth())
    .onUploadComplete(async () => { }),
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .middleware(async () => await handleAuth())
    .onUploadComplete(async () => { })
} satisfies FileRouter;
export type OurFileRouter = typeof ourFileRouter;