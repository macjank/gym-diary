import { useEffect, useReducer, useState } from 'react';
import { projectFirestore, timestamp } from '../firebase/config';

const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return {
        isPending: true,
        error: null,
        success: false,
        document: null,
      };
    case 'ERROR':
      return {
        document: null,
        error: action.payload,
        isPending: false,
        success: false,
      };
    case 'ADDED_DOCUMENT':
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      };
    case 'RECEIVED_DOCUMENT':
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      };
    default:
      return state;
  }
};

const useFirestore = collection => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const ref = projectFirestore.collection(collection);

  const addDocument = async document => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const createdAt = timestamp.fromDate(new Date());

      const addedDocument = await ref.add({ ...document, createdAt });

      if (!isCancelled) {
        dispatch({ type: 'ADDED_DOCUMENT', payload: addedDocument });
      }
    } catch (error) {
      console.log(error);
      if (!isCancelled) {
        dispatch({ type: 'ERROR', payload: error.message });
      }
    }
  };

  const deleteDocument = async id => {
    try {
      await ref.doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  };

  const overwriteDocument = async (id, newDoc) => {
    try {
      await ref.doc(id).set(newDoc);
    } catch (error) {
      console.log(error);
    }
  };

  const getDocument = async id => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const receivedDoc = await ref.doc(id).get();

      if (!receivedDoc.exists) {
        throw new Error('Document with this ID does not exist.');
      }

      if (!isCancelled) {
        dispatch({ type: 'RECEIVED_DOCUMENT', payload: receivedDoc.data() });
      }
    } catch (error) {
      if (!isCancelled) {
        dispatch({ type: 'ERROR', payload: error.message });
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return {
    addDocument,
    deleteDocument,
    overwriteDocument,
    getDocument,
    response,
  };
};

export default useFirestore;
