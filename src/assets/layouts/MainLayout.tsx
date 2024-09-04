import React from 'react';
import Sidebar from '../../components/Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-yellow-500 p-4">
        <Sidebar />
        {/* Sidebar content like navigation links */}
      </aside>
      <main className="flex-1 p-4 bg-gray-100">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
