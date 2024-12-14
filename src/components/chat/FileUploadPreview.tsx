import React from 'react';
import { formatBytes } from '@/utils/formatters';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadPreviewProps {
  files: Set<File>;
  onRemove: (file: File) => void;
  durations: Map<string, number>;
}

export function FileUploadPreview({ files, onRemove, durations }: FileUploadPreviewProps) {
  if (files.size === 0) return null;

  return (
    <div className="space-y-2 p-4 bg-white/5 rounded-lg">
      {Array.from(files).map((file, index) => (
        <div 
          key={`${file.name}-${index}`}
          className="flex items-center justify-between p-2 bg-white/5 rounded"
        >
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{file.name}</div>
            <div className="text-xs text-gray-400">
              {formatBytes(file.size)}
              {durations.has(file.name) && ` • ${Math.ceil(durations.get(file.name)!)}s`}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(file)}
            className="ml-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}