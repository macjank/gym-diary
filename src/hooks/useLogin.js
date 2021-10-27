import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { projectAuth } from '../firebase/config';
import { authActions } from '../store/auth-slice';

const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const dispatch = useDispatch();

  const login = async (email, password) => {
    setError(false);
    setIsPending(true);

    try {
      const response = await projectAuth.signInWithEmailAndPassword(
        email,
        password
      );

      if (!response) {
        throw new Error('Could not log in');
      }

      const dataToSave = {
        displayName: response.user.displayName,
        uid: response.user.uid,
      };

      dispatch(authActions.login(dataToSave));

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

  return { login, error, isPending };
};

export default useLogin;
