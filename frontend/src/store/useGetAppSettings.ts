import { useGetSettingsLazyQuery } from '../gql/graphql.tsx';
import { useAppStore } from './appStore.ts';

export const useGetAppSettings = () => {
  const setSettings = useAppStore((state) => state.setSettings);
  const settings = useAppStore((state) => state.settings);

  const [getSettings] = useGetSettingsLazyQuery({
    onCompleted(data) {
      setSettings(data.getSettings);
    }
  });

  return { getSettings, settings };
};
