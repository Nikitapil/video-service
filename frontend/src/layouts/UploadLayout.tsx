import AppHeader from './components/AppHeader/AppHeader.tsx';
import { ReactChildrenProps } from '../utils/types.ts';

const UploadLayout = ({ children }: ReactChildrenProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AppHeader />

      <div className="px-4 py-20">
        <main className="container mx-auto w-full rounded-md bg-white p-5 shadow-lg">{children}</main>
      </div>
    </div>
  );
};

export default UploadLayout;
