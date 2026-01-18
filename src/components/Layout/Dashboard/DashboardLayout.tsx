import { Outlet } from 'react-router-dom';
import StudentNavbar from '../../Navbar/StudentNavbar.organism';
import { Footer } from '../../Footer/footer';

const DashboardLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div>
      <StudentNavbar />
      {children ? children : <Outlet />}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
