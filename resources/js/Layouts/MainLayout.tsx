import Header from "@/Components/Header";
import MobileSidebar from "@/Components/MobileSidebar";
import Sidebar from "@/Components/Sidebar";
import React from "react";
import { PageProps } from "@/types";

interface MyLayoutProps extends PageProps {
  children: React.ReactNode;
}
const MainLayout = ({ children, auth }: MyLayoutProps) => {
  return (
    <div className="flex flex-col w-full h-screen">
      <MobileSidebar></MobileSidebar>

      <div className="flex w-full">
        <Sidebar></Sidebar>

        <div className="h-screen relative pl-0  lg:pl-[20rem] pt-10 flex w-full flex-col">
          <Header auth={auth}></Header>

          <main className="w-full">
            <div className="pt-20 lg:pt-32 pb-10 px-4">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
