import { create } from 'zustand';
import { SettingsType } from '../gql/graphql.tsx';
import { devtools } from 'zustand/middleware';

interface AppStoreState {
  settings: SettingsType;
}

interface AppStoreActions {
  setSettings: (settings: SettingsType) => void;
}

export const useAppStore = create<AppStoreState & AppStoreActions>()(
  devtools((set) => ({
    settings: { unreadMessagesCount: 0 },
    setSettings: (settingsValue: SettingsType) => set({ settings: settingsValue })
  }))
);
