"use client";
import { FileUpload } from '@/components/file-upload';
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import { Course } from '@prisma/client';
import axios from 'axios';
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const ImageForm: React.FC<ImageFormProps> = ({
  initialData,
  courseId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: initialData.imageUrl || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = axios.patch(`/api/courses/${courseId}`, values);
    await toast.promise(response, {
      loading: "Finalizing image upload...",
      success: "Course image uploaded",
      error: "Something went wrong",
    })
    router.refresh();
    toggleEdit();
  };
  const toggleEdit = () => setIsEditing(!isEditing);
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course image
        <Button onClick={ toggleEdit } variant="ghost">
          { isEditing && (
            <>Cancel</>
          ) }
          { !isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          ) }
          { !isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          ) }
        </Button>
      </div>
      { !isEditing && (
        !initialData.imageUrl ? (
          <div className="flex items-center justify-center h-20 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-w-16 aspect-h-9 mt-2 h-32 flex items-center justify-center">
            <Image
              alt="Upload"
              fill
              className="object-contain rounded-md flex justify-center items-center"
              src={ initialData.imageUrl }
            />
          </div>
        )
      ) }
      { isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={ (url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            } }
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      ) }
    </div>
  )
};
