import { onSnapshot, where, collection, query, orderBy } from "firebase/firestore";
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
      const cities = [];
      querySnapshot.forEach((doc) => {
        cities.push(doc.data());
      });
      setDocument(cities);
    });

    // console.log(collectionRef);

    return () => {
      unsubscribe();
    };
  }, [collection, condition]);

  return document;
};

export default useFirestore;
