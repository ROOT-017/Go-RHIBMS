import React from 'react';
import { Outlet } from 'react-router-dom';
import StudentNavbar from '../../Navbar/StudentNavbar.organism';

const DashboardLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div>
      <StudentNavbar />
      {children ? children : <Outlet />}
    </div>
  );
};

export default DashboardLayout;
