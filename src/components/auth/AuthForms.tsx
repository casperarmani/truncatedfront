import { showError, showSuccess } from '@/utils/error';

// Add to existing imports...

// Update error handling in handleSubmit:
try {
  if (isSignup) {
    await api.signup(email, password);
    showSuccess('Account created successfully!');
    await handleLogin();
  } else {
    await handleLogin();
  }
} catch (err) {
  showError(err instanceof Error ? err.message : 'Authentication failed');
}