"use client";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface TitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export const TitleForm: React.FC<TitleFormProps> = ({
  initialData,
  courseId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  const toggleEdit = () => setIsEditing(!isEditing);
  return (
    <div className='mt-6 border bg-slate-100 roudned-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Course Title
        <Button
          variant='light'
          className='mr-2'
          startContent={ isEditing ? null : <Pencil /> }
          onClick={ toggleEdit }>
          { isEditing ? <>Cancel</> : <>Edit Title</> }
        </Button>
      </div>
      { !isEditing && <p className='text-sm mt-2'>{ initialData.title }</p> }
      { isEditing && (
        <Form { ...form }>
          <form
            onSubmit={ form.handleSubmit(onSubmit) }
            className='space-y-4 mt-4'>
            <FormField
              control={ form.control }
              name='title'
              render={ ({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={ isSubmitting } placeholder="e.g 'Advanced Web Development'" { ...field } />
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
