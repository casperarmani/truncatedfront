import { create } from 'zustand';

interface ConnectionState {
  isConnected: boolean;
  setConnectionStatus: (status: boolean) => void;
}

/**
 * Zustand store for managing application connection status
 */
export const useConnectionStore = create<ConnectionState>((set) => ({
  isConnected: true,
  setConnectionStatus: (status) => set({ isConnected: status }),
}));

/**
 * Updates the global connection status
 * @param isConnected - Whether the application is connected
 */
export function updateConnectionStatus(isConnected: boolean): void {
  useConnectionStore.getState().setConnectionStatus(isConnected);
}