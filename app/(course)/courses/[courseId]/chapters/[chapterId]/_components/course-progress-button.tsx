"use client";

import { useConfettiStore } from "@/hooks/use-confetti.store";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseProgressButtonProps {
  chapterId: string;
  courseId: string;
  isCompleted?: boolean;
  nextChapterId?: string;
}

export const CourseProgressButton = ({
  chapterId,
  courseId,
  isCompleted,
  nextChapterId,
}: CourseProgressButtonProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);

    const action = isCompleted ? "delete" : "put";
    const endpoint = `/api/courses/${courseId}/chapters/${chapterId}/progress`;
    const data = { isCompleted: !isCompleted };
    const axiosRequest =
      action === "delete" ? axios.delete(endpoint) : axios.put(endpoint, data);

    const loadingMessage = isCompleted
      ? "Removing the bookmark..."
      : "Turning the page...";
    const successMessage = isCompleted
      ? "Chapter reopened. More to explore!"
      : "Chapter completed. Onward!";
    const errorMessage = "Oops! The plot thickens, something went wrong.";

    await toast
      .promise(axiosRequest, {
        loading: loadingMessage,
        success: () => {
          if (!isCompleted) {
            if (!nextChapterId) {
              confetti.onOpen();
            } else {
              router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
            }
          } else {
            router.refresh();
            router.push(`/teacher/courses`);
          }
          return successMessage;
        },
        error: errorMessage,
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const Icon = isCompleted ? XCircle : CheckCircle;

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      color={isCompleted ? "secondary" : "success"}
      className="w-full md:w-auto">
      {isCompleted ? "Not completed" : "Mark as complete"}
      <Icon className="h-4 w-4 ml-2" />
    </Button>
  );
};
