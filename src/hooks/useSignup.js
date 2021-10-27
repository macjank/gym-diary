import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { projectAuth } from '../firebase/config';
import { authActions } from '../store/auth-slice';

const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const dispatch = useDispatch();

  const signup = async (email, password) => {
    setError(false);
    setIsPending(true);

    try {
      const response = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!response) {
        throw new Error('Could not sign up');
      }

      const dataToSave = {
        displayName: response.user.displayName,
        uid: response.user.uid,
      };

      dispatch(authActions.login(dataToSave));

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
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

  return { signup, error, isPending };
};

export default useSignup;
