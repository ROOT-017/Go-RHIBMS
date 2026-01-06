import { createContext } from 'react';
import { useLocator } from '../hooks/locator';

export const LocatorContext = createContext<
  Partial<ReturnType<typeof useLocator>>
>({});
