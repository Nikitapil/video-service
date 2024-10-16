import AppHeader from '../components/AppHeader/AppHeader.tsx';
import SideNav from './components/SideNav/SideNav.tsx';
import { ReactChildrenProps } from '../../utils/types.ts';

const MainLayout = ({ children }: ReactChildrenProps) => {
  return (
    <div>
      <AppHeader />

      <div className="container mx-auto flex px-0 lg:px-2.5">
        <SideNav />
        <main className="mt-16 max-w-full flex-1 overflow-hidden px-3 sm:px-6">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
