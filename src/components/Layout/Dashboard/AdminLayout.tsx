import { Outlet } from 'react-router-dom';
import { Footer } from '../../Footer/footer';
import AdminNavbar from '../../Navbar/AdminNavbar.organism';

const AdminLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div>
      <AdminNavbar />
      <>{children ? children : <Outlet />}</>
      <Footer />
    </div>
  );
};

export default AdminLayout;
