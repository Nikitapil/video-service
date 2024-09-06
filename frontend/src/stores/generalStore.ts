import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface GeneralState {
  isLoginOpen: boolean;
  isEdiProfileOpen: boolean;
  selectedPosts: null;
  ids: null;
  posts: null;
}

export interface GeneralActions {
  setIsLoginOpen: (isLoginOpen: boolean) => void;
  setIsEditProfileOpen: () => void;
}

export const useGeneralStore = create<GeneralState & GeneralActions>()(
  devtools(
    persist((set) => ({
      isLoginOpen: false,
      isEdiProfileOpen: false,
      selectedPosts: null,
      ids: null,
      posts: null,
      setIsLoginOpen: (isLoginOpen: boolean) => set({ isLoginOpen: isLoginOpen }),
      setIsEditProfileOpen: () => set((state) => ({  isEdiProfileOpen: !state.isEdiProfileOpen })),
    }), {name: 'generalStore'}),
  )
)