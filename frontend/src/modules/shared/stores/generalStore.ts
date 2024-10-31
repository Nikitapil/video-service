import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface GeneralState {
  isLoginOpen: boolean;
  selectedPosts: null;
  ids: null;
  posts: null;
}

export interface GeneralActions {
  setIsLoginOpen: (isLoginOpen: boolean) => void;
}

export const useGeneralStore = create<GeneralState & GeneralActions>()(
  devtools(
    persist(
      (set) => ({
        isLoginOpen: false,
        selectedPosts: null,
        ids: null,
        posts: null,
        setIsLoginOpen: (isLoginOpen: boolean) => set({ isLoginOpen: isLoginOpen })
      }),
      { name: 'generalStore' }
    )
  )
);
