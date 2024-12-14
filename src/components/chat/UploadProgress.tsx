import React from 'react';
import { Progress } from '@/components/ui/progress';

interface UploadProgressProps {
  progress: number;
  isUploading: boolean;
}

export function UploadProgress({ progress, isUploading }: UploadProgressProps) {
  if (!isUploading) return null;

  return (
    <div className="p-4 space-y-2">
      <div className="flex justify-between text-sm">
        <span>Uploading video...</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="w-full" />
    </div>
  );
}