import { ReactNode, Suspense, useEffect, useRef } from 'react';
import { Loading } from '../components/Loading/loading';
import { useOnChangeQueryParams, useQueryParams } from '../hooks/common.hooks';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { DefaultErrorFallback } from '../components/ErrorBoundary/fallback';
import { pathnames } from './path-name';
import { Modal } from 'antd';
import { Button } from '../components/design-system/buttons';

type LazyComponentProp = {
  childNode: ReactNode;
  animated?: boolean;
};

export const LazyComponentWrapper = ({
  childNode: element,
  animated,
}: LazyComponentProp) => {
  // const logout = useLogout();
  const listnerRef = useRef(true);

  const onVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      console.count('onVisibilityChange');
      // tokenRefresher(window.origin.includes('localhost:5173') ? undefined : logout);
    }
  };

  useEffect(() => {
    if (![pathnames.LOGIN].some((p) => window.location.pathname.includes(p))) {
      if (listnerRef.current) {
        document.addEventListener('visibilitychange', onVisibilityChange);
        listnerRef.current = false;
      }
      return () =>
        document.removeEventListener('visibilitychange', onVisibilityChange);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const q = useQueryParams();
  const changeQueryParams = useOnChangeQueryParams();
  const handleCancelPaymentStatus = () => {
    changeQueryParams((params) => {
      params.delete('payment_intent_client_secret');
      params.delete('setup_intent_client_secret');
    });
  };

  return (
    <ErrorBoundary fallback={<DefaultErrorFallback />}>
      <Suspense fallback={<Loading />}>
        {animated ? (
          <div className="page-box animate-fade-in">{element}</div>
        ) : (
          element
        )}
        <Modal
          title={`${q?.['payment_intent_client_secret'] ? 'Payment Status' : 'Setup Payment Method'}`}
          open={
            (q?.['payment_intent_client_secret'] != null &&
              q?.['payment_intent_client_secret'] != '') ||
            (q?.['setup_intent_client_secret'] != null &&
              q?.['setup_intent_client_secret'] != '')
          }
          centered
          onCancel={handleCancelPaymentStatus}
          footer={
            <div className="w-full px-5 flex gap-8 justify-end items-center">
              <Button
                type="default"
                centered
                onClick={handleCancelPaymentStatus}
              >
                Ok
              </Button>
            </div>
          }
        ></Modal>
      </Suspense>
    </ErrorBoundary>
  );
};
