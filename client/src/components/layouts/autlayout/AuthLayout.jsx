import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import './authlayout.css'; // Import the CSS file
import { useSidebar } from '../../../Context/sidetoggle/SidebarContext';
import Footer from '../Footer/Footer';
import ThemeCustomizer from '../../../pages/themes/ThemeCustomizer';

const AuthLayout = () => {
  const { mobileOpen } = useSidebar();

  return (
    <div className={`auth-layout ${mobileOpen ? 'collapsed' : 'expanded'}`}>
      {/* Sidebar */}
      <Sidebar />

      {/* Right section: Header + Main */}
      <div className="right-section">
        {/* Navbar (fixed height) */}
        <Navbar />

        {/* Main content area */}
        <main className="main-content">
          <Outlet />
          <ThemeCustomizer />
        </main>
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default AuthLayout;
