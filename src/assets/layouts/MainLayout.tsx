import React from 'react';
import Sidebar from '../../components/Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Fixed Sidebar */}
      <aside className="w-64 bg-white p-4 fixed h-full">
        <Sidebar />
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-4 bg-gray-100 ml-64 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
