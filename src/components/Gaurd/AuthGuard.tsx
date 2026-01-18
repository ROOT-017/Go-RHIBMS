import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectIsAuthenticated,
  selectUserRole,
  selectIsLoading,
} from '../../store/features/selectors/auth.selector';
import { Loading } from '../Loading/loading';

interface AuthGuardProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'student';
  failTo?: string;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requiredRole,
  failTo = '/login',
}) => {
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);
  const isLoading = useSelector(selectIsLoading);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Add a small delay to prevent flash of redirect
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || isChecking) {
    return <Loading />;
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to={failTo} state={{ from: location }} replace />;
  }

  // Check role if required
  if (requiredRole && userRole !== requiredRole) {
    // Redirect to appropriate dashboard based on role
    const redirectTo = userRole === 'admin' ? '/admin/dashboard' : '/dashboard';
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
