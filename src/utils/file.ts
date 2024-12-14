export const isVideoFile = (file: File): boolean => {
  return file.type.startsWith('video/');
};

export const getSupportedVideoFormats = (): string[] => {
  return ['video/mp4', 'video/webm', 'video/ogg'];
};

export const getVideoMimeType = (filename: string): string | null => {
  const extension = filename.split('.').pop()?.toLowerCase();
  const mimeTypes: Record<string, string> = {
    mp4: 'video/mp4',
    webm: 'video/webm',
    ogg: 'video/ogg'
  };
  return extension ? mimeTypes[extension] || null : null;
};