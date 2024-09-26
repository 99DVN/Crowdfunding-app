import React from "react";
import Header from "./components/Header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container  mx-auto  px-2">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;