import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { User } from '../../../../gql/graphql.tsx';

export type UserStoreUser = User | null;

export interface UserStoreState {
  user: UserStoreUser;
  isAuthLoading: boolean;
}

export interface UserActions {
  setUser: (user: UserStoreUser) => void;
  logout: () => void;
  setIsAuthLoading: (isLoading: boolean) => void;
}

const initialState: UserStoreState = {
  user: null,
  isAuthLoading: false
} as const;

export const useUserStore = create<UserStoreState & UserActions>()(
  devtools((set) => ({
    ...initialState,
    setUser: (user: UserStoreUser) => {
      set({ user });
    },
    logout: () => set({ ...initialState }),
    setIsAuthLoading: (isLoading: boolean) => set({ isAuthLoading: isLoading })
  }))
);
