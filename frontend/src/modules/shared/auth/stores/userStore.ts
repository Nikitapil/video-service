import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { User } from '../../../../gql/graphql.tsx';

export type UserStoreUser = User | null;

export interface UserStoreState {
  user: UserStoreUser;
}

export interface UserActions {
  setUser: (user: UserStoreUser) => void;
  logout: () => void;
}

const initialState: UserStoreState = {
  user: null
} as const;

export const useUserStore = create<UserStoreState & UserActions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setUser: (user: UserStoreUser) => set({ ...initialState, user }),
        logout: () => set({ ...initialState })
      }),
      { name: 'userStore' }
    )
  )
);
