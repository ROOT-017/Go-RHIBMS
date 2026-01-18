import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { restoreSession } from '../store/features/slices/auth.slice';

export const AppInitializer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Restore session on app start
    dispatch(restoreSession());
  }, [dispatch]);

  return <>{children}</>;
};
