import {
  onSnapshot,
  where,
  collection,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const useFirestore = (collection1, condition) => {
  const [document, setDocument] = useState([]);

  useEffect(() => {
    let query1 = query(collection(db, collection1));
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        return;
      }
      query1 = query(
        collection(db, collection1),
        where(condition.fieldName, condition.operator, condition.compareValue)
      );
    }
    // console.log(collectionRef);

    const unsubscribe = onSnapshot(query1, (querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      arr.sort((a, b) => {
        return a?.timestamp - b?.timestamp;
      });
      setDocument(arr);
    });

    // console.log(collectionRef);

    return () => {
      unsubscribe();
    };
  }, [collection1, condition]);

  return document;
};

export default useFirestore;
