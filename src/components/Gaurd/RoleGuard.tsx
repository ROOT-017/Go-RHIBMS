// components/RoleGuard.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../store/features/selectors/auth.selector';
import { UserRole } from '../../@types';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallbackPath?: string;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ 
  children, 
  allowedRoles, 
  fallbackPath = '/dashboard' 
}) => {
  const location = useLocation();
  const userRole = useSelector(selectUserRole);

  if (!userRole || !allowedRoles.includes(userRole)) {
    // Redirect to fallback path, preserving the attempted location
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};