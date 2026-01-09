import { ReactNode, lazy } from 'react';
import { LazyComponentWrapper } from './util';

const lazyPages = {
  LoginPage: lazy(() => import('../pages/auth/login.page')),
  LoginAdminPage: lazy(() => import('../pages/auth/login-admin.page')),
  StudentDetailsAdminPage: lazy(
    () => import('../pages/admin/StudentDetails.admin'),
  ),
  AdminDashboard: lazy(() => import('../pages/admin/admin-dashboard')),
  AdminStudentView: lazy(() => import('../pages/admin/AdminStudentView')),
  AdminCoursesView: lazy(() => import('../pages/admin/AdminCoursesView')),
  AdminProgramsView: lazy(() => import('../pages/admin/AdminProgramsView')),
  AdminDepartmentsView: lazy(
    () => import('../pages/admin/AdminDepartmentsView'),
  ),
  AdminInstitutionalInfoView: lazy(
    () => import('../pages/admin/AdminInstitutionalInfoView'),
  ),
  AddCourses: lazy(() => import('../pages/admin/AddCourses.admin')),
  AddProgram: lazy(() => import('../pages/admin/AddProgram.admin')),
  AddStudent: lazy(() => import('../pages/admin/AddStudent.admin')),
  AddSchool: lazy(() => import('../pages/admin/AddSchool.admin')),
  AddDepartment: lazy(() => import('../pages/admin/AddDepartment.admin')),
  TermsAndConditionPage: lazy(() => import('../pages/terms-and-conditions')),
  HomePage: lazy(() => import('../pages/page')),
  CourseDetailAdmin: lazy(() => import('../pages/admin/CourseDetail.admin')),
  /// add your pages here
} as const;

type PageObject = Record<keyof typeof lazyPages, ReactNode>;
type AnimationExclusion = Partial<Record<keyof typeof lazyPages, boolean>>;
type LayoutGroup = Array<{
  layout: (props: { children?: ReactNode }) => ReactNode;
  children: Array<keyof typeof lazyPages>;
}>;

export const animationExclude: AnimationExclusion = {
  // UserDashboardPage: true,
};

export const LayoutDefinitionGroups: LayoutGroup = [
  {
    layout: () => <></>,
    children: [],
  },
];

export const pages = Object.entries(lazyPages).reduce<PageObject>(
  (nodes, [name, Component]) => {
    const nodeName = name as keyof typeof lazyPages;
    let node = null;
    const Child = (
      <LazyComponentWrapper
        childNode={<Component />}
        animated={!animationExclude[nodeName]}
      />
    );
    let Layout = null;
    for (const lout of LayoutDefinitionGroups) {
      for (const child of lout.children) {
        if (child === nodeName) {
          Layout = lout.layout;
          break;
        }
      }
      if (Layout != null) break;
    }
    if (Layout != null) {
      node = <Layout>{Child}</Layout>;
    } else {
      node = Child;
    }

    nodes[nodeName] = node;
    return nodes;
  },
  {} as PageObject,
);
