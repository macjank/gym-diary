import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { projectAuth } from '../firebase/config';
import { authActions } from '../store/auth-slice';

const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const dispatch = useDispatch();

  const logout = async () => {
    setError(false);
    setIsPending(true);

    try {
      await projectAuth.signOut();

      dispatch(authActions.logout());

      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending };
};

export default useLogout;
