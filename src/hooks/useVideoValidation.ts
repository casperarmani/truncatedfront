import { useState } from 'react';
import { useTokenManagement } from './useTokenManagement';
import { showError } from '@/utils/error';

export function useVideoValidation() {
  const [isValidating, setIsValidating] = useState(false);
  const { tokenInfo } = useTokenManagement();

  const validateVideo = async (file: File): Promise<{ isValid: boolean; duration: number }> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';

      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve({ isValid: true, duration: video.duration });
      };

      video.onerror = () => {
        window.URL.revokeObjectURL(video.src);
        reject(new Error('Error loading video metadata'));
      };

      video.src = URL.createObjectURL(file);
    });
  };

  const validateFiles = async (files: File[]): Promise<File[]> => {
    setIsValidating(true);
    const validFiles: File[] = [];
    const currentTokens = tokenInfo?.token_balance || 0;

    try {
      for (const file of files) {
        if (!file.type.startsWith('video/')) {
          showError('Only video files are supported');
          continue;
        }

        const { duration } = await validateVideo(file);
        const requiredTokens = Math.ceil(duration);

        if (requiredTokens > currentTokens) {
          showError(`Video duration (${Math.ceil(duration)}s) exceeds available tokens (${currentTokens}). Please upload a shorter video or get more tokens.`);
          continue;
        }

        validFiles.push(file);
      }
    } catch (error) {
      showError('Error validating video: ' + error.message);
    } finally {
      setIsValidating(false);
    }

    return validFiles;
  };

  return {
    validateFiles,
    isValidating
  };
}