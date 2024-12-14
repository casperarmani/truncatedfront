import { create } from 'zustand';

interface NavigationState {
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

/**
 * Zustand store for managing application navigation state
 */
export const useNavigationStore = create<NavigationState>((set) => ({
  currentSection: 'chat',
  setCurrentSection: (section) => set({ currentSection: section }),
}));

/**
 * Shows a specific section of the application
 * @param sectionId - The ID of the section to show
 */
export function showSection(sectionId: string): void {
  useNavigationStore.getState().setCurrentSection(sectionId);
}