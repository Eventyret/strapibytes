"use client";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from '@/lib/utils';
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Textarea } from "@nextui-org/react";
import { Course } from '@prisma/client';
import axios from 'axios';
import { Pencil } from "lucide-react";
import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface DescriptionFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

export const DescriptionForm: React.FC<DescriptionFormProps> = ({
  initialData,
  courseId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData.description || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    toast.promise(axios.patch(`/api/courses/${courseId}`, values), {
      loading: "Giving your course a description...",
      success: (data) => {
        router.refresh()
        toggleEdit()
        return "Course updated"
      },
      error: (err) => {
        return `${err.toString()}`;
      }
    })
  };
  const toggleEdit = () => setIsEditing(!isEditing);
  return (
    <div className='mt-6 border bg-slate-100 roudned-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Course Description
        <Button
          variant='light'
          className='mr-2'
          startContent={ isEditing ? null : <Pencil /> }
          onClick={ toggleEdit }>
          { isEditing ? <>Cancel</> : <>Edit Description</> }
        </Button>
      </div>
      { !isEditing && <p className={ cn("text-sm mt-2", !initialData.description && "text-slate-500 italic") }>{ initialData.description || "No Description" }</p> }
      { isEditing && (
        <Form { ...form }>
          <form
            onSubmit={ form.handleSubmit(onSubmit) }
            className='space-y-4 mt-4'>
            <FormField
              control={ form.control }
              name='description'
              render={ ({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea isDisabled={ isSubmitting } placeholder="e.g. This course is about..." { ...field } />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />
            <div className='flex itesm-center gap-x-2'>
              <Button disabled={ !isValid || isSubmitting } type='submit' color={ !isValid ? "default" : "success" } className='text-white'>
                Save
              </Button>
            </div>
          </form>
        </Form>
      ) }
    </div>
  );
};
