"use client";
import { Preview } from "@/components/preview";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox } from "@nextui-org/react";
import { Chapter } from "@prisma/client";
import axios from "axios";
import { CircleDollarSign, EyeIcon, Key, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface ChapterAccessFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  isFree: z.boolean().default(false),
});

export const ChapterAccessForm: React.FC<ChapterAccessFormProps> = ({
  initialData,
  courseId,
  chapterId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: !!initialData.isFree || false,
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    toast.promise(
      axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values),
      {
        loading: "Updating permissions for chapter...",
        success: (data) => {
          router.refresh();
          toggleEdit();
          return "Chapter Permission updated";
        },
        error: (err) => {
          return `${err.toString()}`;
        },
      }
    );
  };
  const toggleEdit = () => setIsEditing(!isEditing);
  return (
    <div className='mt-6 border bg-slate-100 roudned-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Chapter Access
        <Button
          variant='light'
          className='mr-2'
          startContent={isEditing ? null : <Pencil />}
          onClick={toggleEdit}>
          {isEditing ? <>Cancel</> : <>Edit Access</>}
        </Button>
      </div>
      {!isEditing && (
        <div className={cn("text-sm mt-2 text-slate-500 italic")}>
          {initialData.isFree ? (
            <div className='inline-flex items-center'>
              <EyeIcon className='m-2' />
              This chapter is free for preview
            </div>
          ) : (
            <div className='inline-flex items-center'>
              <CircleDollarSign className='m-2' />
              This chapter is only available to enrolled students.
            </div>
          )}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 mt-4'>
            <FormField
              control={form.control}
              name='isFree'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <Checkbox
                      defaultSelected={initialData.isFree}
                      isSelected={field.value}
                      onChange={field.onChange}
                      color='primary'>
                      <span className='text-sm text-slate-500 italic'>
                        Check this box to make this chapter free for preview
                      </span>
                    </Checkbox>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className='flex itesm-center gap-x-2'>
              <Button
                disabled={!isValid || isSubmitting}
                type='submit'
                color={!isValid ? "default" : "primary"}
                className='text-white'>
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
