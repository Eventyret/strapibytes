"use client";

import { ourFileRouter } from '@/app/api/uploadthing/core';
import { UploadDropzone } from '@/lib/uploadthing';
import toast from 'react-hot-toast';

interface FileUploadProps {
  onChange: (url?: string) => void
  endpoint: keyof typeof ourFileRouter
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      appearance={ {
        button({ ready, isUploading }) {
          return `bg-primary px-4 py-6 ${ready ? "bg-success" : "bg-danger"
            } ${isUploading ? "bg-primary" : ""}`;
        },
      } }
      endpoint={ endpoint }
      onClientUploadComplete={ (res) => { onChange(res?.[0].url) } }
      onUploadError={ (err: Error) => { toast.error(`${err.message}`) } }
    />
  )
}