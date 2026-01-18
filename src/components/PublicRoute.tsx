// components/PublicRoute.tsx
import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectIsAuthenticated,
  selectUserRole,
} from '../store/features/selectors/auth.selector';

interface PublicRouteProps {
  children: ReactNode;
  restricted?: boolean; // If true, authenticated users can't access (like login page)
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  restricted = false,
}) => {
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       setIsChecking(false);
  //     }, 100);

  //     return () => clearTimeout(timer);
  //   }, []);

  //   if (isLoading || isChecking) {
  //     return <Loading />;
  //   }

  // If route is restricted and user is authenticated, redirect to appropriate dashboard
  if (restricted && isAuthenticated) {
    const redirectTo = userRole === 'admin' ? '/admin/dashboard' : '/dashboard';
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// For login pages specifically
export const LoginRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <PublicRoute restricted>{children}</PublicRoute>;
};
