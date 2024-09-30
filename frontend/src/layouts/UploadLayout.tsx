import AppHeader from './components/AppHeader/AppHeader.tsx';
import { ReactChildrenProps } from '../utils/types.ts';

const UploadLayout = ({ children }: ReactChildrenProps) => {
  return (
    <div className="h-screen bg-gray-100">
      <AppHeader />

      <main className="container mx-auto flex w-full justify-between px-2">{children}</main>
    </div>
  );
};

export default UploadLayout;
