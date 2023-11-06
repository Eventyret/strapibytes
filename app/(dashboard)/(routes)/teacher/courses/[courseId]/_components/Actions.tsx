"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import toast from "react-hot-toast";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti.store";

interface ActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

export const Actions = ({ disabled, courseId, isPublished }: ActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const useConfetti = useConfettiStore();

  const onClick = async () => {
    setIsLoading(true);
    const action = isPublished ? "unpublish" : "publish";
    const successMessage = isPublished
      ? "Course offline. It's intermission time!"
      : "Showtime! Course is now live.";

    await toast.promise(axios.patch(`/api/courses/${courseId}/${action}`), {
      loading: "Setting the stage...",
      success: () => {
        if (!isPublished) useConfetti.onOpen();
        return successMessage;
      },
      error: "Oops! The stage lights tripped.",
    });

    router.refresh();
    setIsLoading(false);
  };

  const onDelete = async () => {
    setIsLoading(true);
    await toast.promise(axios.delete(`/api/courses/${courseId}`), {
      loading: "Dropping the curtain...",
      success: () => {
        toast.success("Course has ended its run.");
        router.refresh();
        router.push(`/teacher/courses`);
        return "Final bow taken!";
      },
      error: () => "Encore? That wasn't planned.",
    });
    setIsLoading(false);
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm">
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button
          size="sm"
          disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
