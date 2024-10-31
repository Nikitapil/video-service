import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { useUserStore } from './modules/shared/auth/stores/userStore.ts';
import { useRefreshAuthMutation } from './gql/graphql.tsx';
import { useCallback, useEffect } from 'react';

function App() {
  const setUser = useUserStore((state) => state.setUser);
  const setIsAuthLoading = useUserStore((state) => state.setIsAuthLoading);

  const [refresh] = useRefreshAuthMutation();

  const handleRefreshUser = useCallback(async () => {
    try {
      setIsAuthLoading(true);
      const { data } = await refresh();
      setUser(data?.refreshToken.user || null);
      localStorage.setItem('accessToken', data?.refreshToken.accessToken || '');
    } catch (e) {
      console.error(e);
    } finally {
      setIsAuthLoading(false);
    }
  }, [refresh, setIsAuthLoading, setUser]);

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
