import {ReactNode} from "react";
import TopNav from "../components/TopNav.tsx";

const UploadLayout = ({children}: { children: ReactNode }) => {
  return (
    <div className="bg-[#f8f8f8] h-screen">
      <TopNav />

      <div className="container flex justify-between mx-auto w-full px-2">
        {children}
      </div>
    </div>
  );
};

export default UploadLayout;