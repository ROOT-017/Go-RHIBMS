import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { supabase } from './lib/supabaseClient';
import { clearAuth, setAuth } from './store/features/slices/auth.slice';

export const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          dispatch(
            setAuth({
              user: session.user,
              session,
              profile,
            })
          );
        }
      } else {
        dispatch(clearAuth());
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  return null;
};
