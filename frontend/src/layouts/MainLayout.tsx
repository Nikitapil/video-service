import {ReactNode} from "react";
import TopNav from "../components/TopNav.tsx";
import SideNav from "../components/SideNav.tsx";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <header>
        <TopNav />
      </header>

      <div className="container flex justify-between mx-auto lg:px-2.5 px-0">
        <SideNav />
        <div className="mt-[70px] ml-[55px] lg:ml-[310px] flex-1 px-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;