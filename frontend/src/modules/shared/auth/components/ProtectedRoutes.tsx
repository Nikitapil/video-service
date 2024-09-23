import { ReactNode } from 'react';
import { useUserStore } from '../stores/userStore.ts';
import AuthModal from './AuthModal.tsx';

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <AuthModal />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
