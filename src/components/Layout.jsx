import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './header';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#1d2125]">
      {isSidebarOpen && (
        <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
      )}
      <div className="flex flex-col flex-grow overflow-auto w-full relative">
        <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        {/* Child routes inject their content here via Outlet */}
        <Outlet />
      </div>
    </div>
  );
}
