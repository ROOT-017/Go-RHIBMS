import { useEffect, useMemo, useRef } from 'react';
import { useSelector } from '../store';
import { useLocation, useNavigate } from 'react-router-dom';
import { currentPathName, currentSearchParams } from '../utils';

export const usePrincipal = () => {
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.auth.profile);
  const session = useSelector((state) => state.auth.session);
  const student = useSelector((state) => state.auth.student);
  const admin = useSelector((state) => state.auth.admin);

  return {
    ...user,
    ...profile,
    session,
    student,
    admin,
  };
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
