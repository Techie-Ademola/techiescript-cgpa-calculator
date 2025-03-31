import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from '../AppComponents/BottomNavbar';
import Header from './Header';
import usePageTitle from '../hooks/usePageTitle';
import { Toaster } from "sonner";

const Layout = () => {
  usePageTitle();

  return (
    <>
      <Header />
      <Toaster position="top-center" visibleToasts={1} />
      <Outlet />
      <BottomNav />
    </>
  );
};

export default Layout; 