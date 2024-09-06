import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface User {
  id: number | null;
  fullname: string;
  email?: string;
  bio?: string;
  image?: string;
}

export interface UserActions {
  setUser: (user: User) => void;
  logout: () => void;
}

const initialState: User = {
  id: null,
  fullname: '',
  email: '',
  bio: '',
  image: '',
} as const

export const useUserStore = create<User & UserActions>()(
  devtools(
    persist((set) => ({
      ...initialState,
      setUser: (user: User) => set({ ...user }),
      logout: () => set({ ...initialState })
    }), {name: 'userStore'}),
  )
)