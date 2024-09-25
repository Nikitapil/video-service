import { ReactNode } from 'react';
import AppHeader from './components/AppHeader.tsx';

const UploadLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen bg-[#f8f8f8]">
      <AppHeader />

      <div className="container mx-auto flex w-full justify-between px-2">{children}</div>
    </div>
  );
};

export default UploadLayout;
