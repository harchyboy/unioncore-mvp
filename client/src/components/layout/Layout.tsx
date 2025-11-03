import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-stone font-haltung">
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 bg-stone p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
