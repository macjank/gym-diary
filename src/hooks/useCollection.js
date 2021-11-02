import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

const useCollection = (collection, _query, _orderBy, limit) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = projectFirestore.collection(collection);

    if (query) {
      ref = ref.where(...query);
    }

    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }

    if (limit) {
      ref = ref.limit(limit);
    }

    const unsub = ref.onSnapshot(
      snapshot => {
        const trainings = snapshot.docs.map(doc => {
          //about createdAt: there was workaround needed in order to
          //handle react-persist rules about non-serializable values
          return {
            ...doc.data(),
            id: doc.id,
            createdAt: { ...doc.data().createdAt },
          };
        });

        setData(trainings);
        setError(null);
      },
      error => {
        console.log(`use collection: ${error}`);
        setError('Could not load data.');
      }
    );

    return () => unsub();
  }, [collection, query, orderBy, limit]);

  return { data, error };
};

export default useCollection;
