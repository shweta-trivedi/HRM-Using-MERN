
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet /> {/* This will render the current route component */}
    </div>
  );
};

export default Layout;