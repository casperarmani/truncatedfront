import { useState, useCallback } from 'react';
import { useVideoValidation } from './useVideoValidation';
import { useTokenManagement } from './useTokenManagement';
import { showError } from '@/utils/error';

export function useFileUpload() {
  const [selectedFiles, setSelectedFiles] = useState<Set<File>>(new Set());
  const [fileDurations, setFileDurations] = useState<Map<string, number>>(new Map());
  const [isUploading, setIsUploading] = useState(false);
  const { validateFiles } = useVideoValidation();
  const { tokenInfo } = useTokenManagement();

  const handleFiles = useCallback(async (files: FileList) => {
    const validFiles = await validateFiles(Array.from(files));
    const newDurations = new Map(fileDurations);
    
    for (const file of validFiles) {
      try {
        const { duration } = await validateFiles([file]);
        newDurations.set(file.name, duration);
        setSelectedFiles(prev => new Set([...prev, file]));
      } catch (error) {
        showError(`Error processing ${file.name}`);
      }
    }
    
    setFileDurations(newDurations);
  }, [validateFiles, fileDurations]);

  const removeFile = useCallback((file: File) => {
    setSelectedFiles(prev => {
      const newFiles = new Set(prev);
      newFiles.delete(file);
      return newFiles;
    });
    setFileDurations(prev => {
      const newDurations = new Map(prev);
      newDurations.delete(file.name);
      return newDurations;
    });
  }, []);

  const clearFiles = useCallback(() => {
    setSelectedFiles(new Set());
    setFileDurations(new Map());
    setIsUploading(false);
  }, []);

  return {
    selectedFiles,
    fileDurations,
    isUploading,
    handleFiles,
    removeFile,
    clearFiles
  };
}