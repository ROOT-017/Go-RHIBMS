import { useEffect, useMemo, useRef } from 'react';
import { useSelector } from '../store';
import { useLocation, useNavigate } from 'react-router-dom';
import { currentPathName, currentSearchParams } from '../utils';

export const usePrincipal = () => {
  const principal = useSelector((state) => state.user.payload);
  return principal;
};
export const usePrincipalError = () => {
  const errors = useSelector((state) => state.user.errors);
  return errors;
};

export const useUserRole = () => {
  const principal = usePrincipal();
  return principal?.role?.name ? principal?.role?.name : undefined;
};

export const useOnChangeQueryParams = () => {
  const navigate = useNavigate();
  return (consumer?: (params: URLSearchParams) => void) => {
    const params = currentSearchParams();
    consumer?.(params);
    const arr: string[] = [];
    for (const [k, v] of params) {
      arr.push(`${k}=${v}`);
    }
    navigate(`${currentPathName()}?${arr.join('&')}`);
  };
};

export const useQueryParams = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  return Object.fromEntries(query.entries());
};

export const useAuthorities = () => {
  const principal = usePrincipal();
  return principal?.authorities;
};

export const useDebounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number,
) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [delay]);

  return useMemo(
    () =>
      (...args: T) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(
          () => callbackRef.current(...args),
          delay,
        );
      },
    [delay],
  );
};
