import { ReactNode } from 'react';
import { useUserStore } from '../stores/userStore.ts';
import AuthModal from './AuthModal.tsx';
import { ImSpinner2 } from 'react-icons/im';

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const user = useUserStore((state) => state.user);
  const isLoading = useUserStore((state) => state.isAuthLoading);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <ImSpinner2
          className="animate-spin"
          size="120"
          color=""
        />
      </div>
    );
  }

  if (!user) {
    return <AuthModal />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
