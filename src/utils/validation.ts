export const validateEmail = (email: string): boolean => {
  return /\S+@\S+\.\S+/.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateVideoFile = (file: File): boolean => {
  return file.type.startsWith('video/');
};

export const validateConversationTitle = (title: string): boolean => {
  return title.trim().length > 0;
};