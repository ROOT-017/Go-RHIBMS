import { RouteObject } from 'react-router-dom';
import { pathnames } from './path-name';
import { pages } from './definitions';
import Error404 from '../pages/errors/_404';
import AdminLayout from '../components/Layout/Dashboard/AdminLayout';
import DashboardLayout from '../components/Layout/Dashboard/DashboardLayout';
import AdminDashboard from '../pages/admin/admin-dashboard';
import AdminStudentView from '../pages/admin/AdminStudentView';
import AdminCoursesView from '../pages/admin/AdminCoursesView';
import AdminProgramsView from '../pages/admin/AdminProgramsView';
import AdminDepartmentsView from '../pages/admin/AdminDepartmentsView';
import AdminInstitutionalInfoView from '../pages/admin/AdminInstitutionalInfoView';
import Dashboard from '../pages/student/student-dashboard';
import AddCourses from '../pages/admin/AddCourses.admin';

export const routes: Array<RouteObject> = [
  {
    path: pathnames.HOME,
    element: pages.HomePage,
    errorElement: <Error404 />,
  },

  {
    path: pathnames.LOGIN,
    element: pages.LoginPage,
  },
  {
    path: pathnames.LOGIN_ADMIN,
    element: pages.LoginAdminPage,
  },
  {
    path: pathnames.DASHBOARD,
    element: (
      <DashboardLayout />
      // <AuthGuard element={<DashboardLayout />} failTo={pathnames.LOGIN} />
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },

  {
    path: pathnames.ADMIN_DASHBOARD,
    element: <AdminLayout />,
    children: [
      {
        element: <AdminDashboard />,
        index: true,
      },
      {
        element: <AdminStudentView />,
        path: pathnames.STUDENTS,
      },
      {
        element: <AdminCoursesView />,
        path: pathnames.COURSES,
      },
      {
        element: <AddCourses />,
        path: pathnames.ADD_COURSES,
      },
      {
        element: <AdminProgramsView />,
        path: pathnames.PROGRAMS,
      },
      {
        element: pages.AddStudent,
        path: pathnames.ADD_STUDENTS,
      },
      {
        element: pages.AddProgram,
        path: pathnames.ADD_PROGRAMS,
      },
      {
        element: pages.StudentDetailsAdminPage,
        path:
          pathnames.ADMIN_DASHBOARD + '/students/:matriculationNumber/details',
      },
      {
        element: <AdminDepartmentsView />,
        path: pathnames.DEPARTMENTS,
      },
      {
        element: <AdminInstitutionalInfoView />,
        path: pathnames.INSTITUTIONAL_DATA,
      },
    ],
  },

  {
    path: '*',
    element: <Error404 />,
  },
];
