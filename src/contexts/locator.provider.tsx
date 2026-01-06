import { ReactNode } from 'react';
import { useLocator } from '../hooks/locator';
import { LocatorContext } from './locator.context';

export const LocatorContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const value = useLocator();
  return (
    <LocatorContext.Provider value={value}>{children}</LocatorContext.Provider>
  );
};
