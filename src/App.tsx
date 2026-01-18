import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { useEffect } from 'react';
import { useDispatch } from './store';

import { Toaster } from 'react-hot-toast';
import { restoreSession } from './store/features/slices/auth.slice';

function App() {
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

      <RouterProvider router={router} />
    </>
  );
}

export default App;
