"use client";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/utils';
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { Course } from '@prisma/client';
import axios from 'axios';
import { DollarSign, Pencil } from "lucide-react";
import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface PriceFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  price: z.coerce.number()
})

export const PriceForm: React.FC<PriceFormProps> = ({
  initialData,
  courseId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData.price || 0.01
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = axios.patch(`/api/courses/${courseId}`, values);
    toast.promise(response, {
      loading: "Updating your course price...",
      success: "Course updated",
      error: "Something went wrong",
    })
    toggleEdit()
    router.refresh()
  };
  const toggleEdit = () => setIsEditing(!isEditing);
  return (
    <div className='mt-6 border bg-slate-100 roudned-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Course Price
        <Button
          variant='light'
          className='mr-2'
          startContent={ isEditing ? null : <Pencil /> }
          onClick={ toggleEdit }>
          { isEditing ? <>Cancel</> : <>Edit Price</> }
        </Button>
      </div>
      { !isEditing && (
        <p className={ cn(
          "text-sm mt-2",
          !initialData.price && "text-slate-500 italic"
        ) }>
          { initialData.price
            ? formatPrice(initialData.price)
            : "No price"
          }
        </p>
      ) }
      { isEditing && (
        <Form { ...form }>
          <form
            onSubmit={ form.handleSubmit(onSubmit) }
            className='space-y-4 mt-4'>
            <FormField
              control={ form.control }
              name='price'
              render={ ({ field }) => (
                <FormItem>
                  <FormControl>
                    {/* @ts-ignore */ }
                    <Input isDisabled={ isSubmitting } placeholder="Set a price for your course" step="0.01" type='number' startContent={ <DollarSign /> } { ...field } />
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
