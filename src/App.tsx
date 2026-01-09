import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from './store';

import { Toaster } from 'react-hot-toast';
import { Modal } from 'antd';
import { Button } from './components/design-system/buttons';
import { restoreSession } from './store/features/slices/auth.slice';

function App() {
  const alerts = useSelector((state) => state.alerts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            style: {
              border: '2px solid var(--color-success-shade, #05998C)',
              borderRadius: 10,
              backgroundColor: '#EBF7F6',
              color: '#05998C',
            },
          },
          error: {
            style: {
              border: '2px solid var(--color-danger-shade, #DF0A4A)',
              borderRadius: 10,
              backgroundColor: '#FDF5F7',
              color: '#DF0A4A',
            },
          },
        }}
        containerStyle={{
          fontSize: '1.6rem',
        }}
      />
      <Modal
        title={alerts?.title}
        open={alerts?.show}
        centered
        onCancel={window.alertApi?.onCancel}
        footer={
          <div className="w-full px-5 flex gap-8 justify-end items-center">
            {alerts?.cancelText ? (
              <Button centered onClick={window.alertApi?.onCancel}>
                {' '}
                {alerts.cancelText}
              </Button>
            ) : null}
            {alerts?.okText ? (
              <Button danger centered onClick={window.alertApi?.onOk}>
                {' '}
                {alerts.okText}
              </Button>
            ) : null}
          </div>
        }
      >
        {alerts?.message ? <p>{alerts?.message}</p> : null}
      </Modal>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
