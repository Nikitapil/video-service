import { ReactNode } from 'react';
import AppHeader from '../components/AppHeader.tsx';
import SideNav from './components/SideNav/SideNav.tsx';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <AppHeader />

      <div className="container mx-auto flex justify-between px-0 lg:px-2.5">
        <SideNav />
        <div className="ml-[55px] mt-[70px] flex-1 px-6 lg:ml-[310px]">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
