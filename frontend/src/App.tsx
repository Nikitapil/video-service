import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { useUserStore } from './modules/shared/auth/stores/userStore.ts';
import { useRefreshAuthMutation } from './gql/graphql.tsx';
import { useCallback, useEffect } from 'react';
import { setAccessToken } from './modules/shared/auth/helpers.ts';
import { useGetAppSettings } from './store/useGetAppSettings.ts';

function App() {
  const setUser = useUserStore((state) => state.setUser);
  const setIsAuthLoading = useUserStore((state) => state.setIsAuthLoading);

  const { getSettings } = useGetAppSettings();

  const [refresh] = useRefreshAuthMutation();

  const handleRefreshUser = useCallback(async () => {
    try {
      setIsAuthLoading(true);
      const { data } = await refresh();
      setUser(data?.refreshToken.user || null);
      setAccessToken(data?.refreshToken.accessToken || '');
      await getSettings();
    } catch (e) {
      console.error(e);
    } finally {
      setIsAuthLoading(false);
    }
  }, [refresh, getSettings, setIsAuthLoading, setUser]);

  useEffect(() => {
    handleRefreshUser();
  }, [handleRefreshUser]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
