import AppHeader from '../components/AppHeader/AppHeader.tsx';
import SideNav from './components/SideNav/SideNav.tsx';
import { ReactChildrenProps } from '../../utils/types.ts';

const MainLayout = ({ children }: ReactChildrenProps) => {
  return (
    <div>
      <AppHeader />

      <div className="container mx-auto flex justify-between px-0 lg:px-2.5">
        <SideNav />
        <main className="ml-14 mt-16 flex-1 px-3 sm:px-6 lg:ml-80">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
