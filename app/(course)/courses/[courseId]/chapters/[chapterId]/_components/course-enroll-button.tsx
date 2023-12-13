"use client";

import { formatPrice } from "@/lib/format";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

export const CourseEnrollButton = ({
  price,
  courseId,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    const loadingMessage = "Enrolling you in... please hold your books!";
    const successMessage = "You're in! Time to hit the books!";
    const errorMessage = "Oops! The library card's not working. Try again.";
    setIsLoading(true);
    toast.promise(axios.post(`/api/courses/${courseId}/checkout`), {
      loading: loadingMessage,
      success: (response) => {
        window.location.assign(response.data.url);
        return successMessage;
      },
      error: errorMessage,
    });
    setIsLoading(false);
  };

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="md"
      color="primary"
      className="w-full md:w-auto">
      Enroll for {formatPrice(price)}
    </Button>
  );
};
