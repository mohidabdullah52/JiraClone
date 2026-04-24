import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useSelector((state) => state.user.data);

  return (
    <div className="flex h-screen overflow-hidden bg-[#1d2125]">
      {isSidebarOpen && (
        <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
      )}
      <div className="flex flex-col flex-grow overflow-auto w-full relative">
        <Header 
            isSidebarOpen={isSidebarOpen} 
            setIsSidebarOpen={setIsSidebarOpen} 
            userEmail={user?.email} 
        />
        {/* Child routes inject their content here via Outlet */}
        <Outlet />
      </div>
    </div>
  );
}
