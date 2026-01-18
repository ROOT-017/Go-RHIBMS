import { RouteObject } from 'react-router-dom';
import { pathnames } from './path-name';
import { pages } from './definitions';
import Error404 from '../pages/errors/_404';
import AdminLayout from '../components/Layout/Dashboard/AdminLayout';
import DashboardLayout from '../components/Layout/Dashboard/DashboardLayout';
import AdminStudentView from '../pages/admin/AdminStudentView';
import AdminCoursesView from '../pages/admin/AdminCoursesView';
import AdminProgramsView from '../pages/admin/AdminProgramsView';
import AdminDepartmentsView from '../pages/admin/AdminDepartmentsView';
import AdminInstitutionalInfoView from '../pages/admin/AdminInstitutionalInfoView';
import Dashboard from '../pages/student/student-dashboard';
import AdminSchoolView from '../pages/admin/AdminSchoolView';
import AcademicStructure from '../pages/student/AcademicStructure';
import FormB from '../pages/student/FormB';
import { PublicRoute } from '../components/PublicRoute';
import { AuthGuard } from '../components/Gaurd/AuthGuard';

export const routes: Array<RouteObject> = [
  {
    path: pathnames.HOME,
    element: <PublicRoute>{pages.HomePage}</PublicRoute>,
    errorElement: <Error404 />,
  },

  {
    path: pathnames.LOGIN,
    element: <PublicRoute restricted>{pages.LoginPage}</PublicRoute>,
  },
  {
    path: pathnames.LOGIN_ADMIN,
    element: <PublicRoute restricted>{pages.LoginAdminPage}</PublicRoute>,
  },
  {
    path: pathnames.DASHBOARD,
    element: (
      <AuthGuard requiredRole="student">
        <DashboardLayout />
      </AuthGuard>
      // <AuthGuard element={<DashboardLayout />} failTo={pathnames.LOGIN} />
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        element: <AcademicStructure />,
        path: pathnames.ACADEMIC_STRUCTURE,
      },
      {
        element: <FormB />,
        path: pathnames.FORM_B,
      },
    ],
  },

  {
    path: pathnames.ADMIN_DASHBOARD,
    element: (
      <AuthGuard requiredRole="admin">
        <AdminLayout />
      </AuthGuard>
    ),
    children: [
      {
        element: pages.AdminDashboard,
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
        element: pages.AddCourses,
        path: pathnames.ADD_COURSES,
      },
      {
        element: pages.CourseDetailAdmin,
        path:
          pathnames.ADMIN_DASHBOARD +
          '/' +
          pathnames.COURSES +
          '/:courseCode/details',
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
        element: pages.AddSchool,
        path: pathnames.ADD_SCHOOLS,
      },
      {
        element: pages.AddDepartment,
        path: pathnames.ADD_DEPARTMENTS,
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
      {
        element: <AdminSchoolView />,
        path: pathnames.SCHOOLS,
      },
    ],
  },

  {
    path: '*',
    element: <Error404 />,
  },
];
