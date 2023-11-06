"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

export const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);
    const action = isPublished ? "unpublish" : "publish";
    const successMessage = isPublished
      ? "Scene's cut! Chapter hidden."
      : "It's a wrap! Chapter live.";

    await toast.promise(
      axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/${action}`),
      {
        loading: "Cueing up...",
        success: () => successMessage,
        error: "Cut! We hit a glitch.",
      }
    );

    router.refresh();
    setIsLoading(false);
  };

  const onDelete = async () => {
    setIsLoading(true);
    await toast.promise(
      axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`),
      {
        loading: "Turning the page - Processing...",
        success: () => {
          toast.success("Chapter deleted");
          router.refresh();
          router.push(`/teacher/courses/${courseId}`);
          return "Hot off the press - Chapter Published!";
        },
        error: () => "Plot twist! There's been a snag.",
      }
    );
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
