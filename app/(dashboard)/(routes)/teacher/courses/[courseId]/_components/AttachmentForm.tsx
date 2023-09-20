"use client";

import { Attachment, Course } from "@prisma/client";
import axios from "axios";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as z from "zod";

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
};

const formSchema = z.object({
  url: z.string().min(1),
});

export const AttachmentForm = ({
  initialData,
  courseId
}: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = axios.post(`/api/courses/${courseId}/attachments`, values);
    await toast.promise(response, {
      loading: "Finalizing attachment upload...",
      success: "Attachment uploaded",
      error: "Something went wrong",
    })
    toggleEdit();
    router.refresh();
  };

  const onDelete = async (id: string) => {
    setDeletingId(id);
    const response = axios.delete(`/api/courses/${courseId}/attachments/${id}`);
    await toast.promise(response, {
      loading: "Removing attachment...",
      success: "Attachment Removed",
      error: "Something went wrong",
    })
    router.refresh();
    setDeletingId(null);
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course attachments
        <Button onClick={ toggleEdit } variant="ghost">
          { isEditing && (
            <>Cancel</>
          ) }
          { !isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a file
            </>
          ) }
        </Button>
      </div>
      { !isEditing && (
        <>
          { initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments yet
            </p>
          ) }
          { initialData.attachments.length > 0 && (
            <div className="space-y-2">
              { initialData.attachments.map((attachment) => (
                <div
                  key={ attachment.id }
                  className={ `flex items-center p-3 w-full border text-sky-700 rounded-md ${deletingId === attachment.id
                    ? "bg-red-500 border-red-500 text-white"
                    : "bg-sky-100 border-sky-200"
                    }` }
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">
                    { attachment.name }
                  </p>
                  { deletingId === attachment.id && (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin ml-4" />
                    </div>
                  ) }
                  { deletingId !== attachment.id && (
                    <button
                      onClick={ () => onDelete(attachment.id) }
                      className="ml-auto hover:opacity-75 transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  ) }
                </div>
              )) }
            </div>
          ) }
        </>
      ) }
      { isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={ (url) => {
              if (url) {
                onSubmit({ url: url });
              }
            } }
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your students might need to complete the course.
          </div>
        </div>
      ) }
    </div>
  )
}