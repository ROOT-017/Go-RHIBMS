import { ReactNode, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrincipal } from '../hooks/common.hooks';
import { useSelector } from '../store';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Loading } from '../components/Loading/loading';

export type GuardProp = {
  element: ReactNode;
  failTo: string;
};
export const AuthGuard = ({ element, failTo }: GuardProp) => {
  const [isChecked, setIsChecked] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const principal = usePrincipal();
  const readyState = useSelector((state) => state.doc.readyState);
  const { t } = useTranslation();
  useEffect(() => {
    if (ref.current != null && readyState) {
      if (principal?.user?.id != null) {
        setIsChecked(true);
      } else {
        toast.error(t('login-to-continue'));
        navigate(failTo);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [principal, readyState]);
  return isChecked ? (
    element
  ) : (
    <div ref={ref}>
      <Loading />
    </div>
  );
};

export const DashboardGuard = ({ element }: Omit<GuardProp, 'failTo'>) => {
  const [isChecked] = useState(true);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return isChecked ? (
    element
  ) : (
    <div ref={ref}>
      <Loading />
    </div>
  );
};
