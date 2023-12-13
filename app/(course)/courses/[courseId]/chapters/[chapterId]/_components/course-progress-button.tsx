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

    const endpoint = `/api/courses/${courseId}/chapters/${chapterId}/progress`;
    const data = { isCompleted: !isCompleted };

    const loadingMessage = isCompleted
      ? "Revisiting the chapter..."
      : "Wrapping up this chapter...";
    const successMessage = isCompleted
      ? "Back for more insights!"
      : "Well done! Chapter completed.";
    const errorMessage = "Oops! The quill broke, couldn't update the chapter.";

    await toast.promise(axios.put(endpoint, data), {
      loading: loadingMessage,
      success: () => {
        if (!isCompleted) {
          if (!nextChapterId) {
            confetti.onOpen();
          } else {
            router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
          }
        }
        return successMessage;
      },
      error: errorMessage,
    });
    router.refresh();
    setIsLoading(false);
  };

  const Icon = isCompleted ? XCircle : CheckCircle;

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      color={isCompleted ? "primary" : "success"}
      className="w-full md:w-auto">
      {isCompleted ? "Not completed" : "Mark as complete"}
      <Icon className="h-4 w-4 ml-2" />
    </Button>
  );
};
