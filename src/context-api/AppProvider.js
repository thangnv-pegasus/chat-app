import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { db } from "../firebase/config";
import { Context } from "./AuthProvider";
import {
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import useFirestore from "../hooks/useFirestore";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const user = useContext(Context);

  const [roomSelected, setRoomSelected] = useState();

  const roomDefault = async () => {
    const q = query(
      collection(db, "rooms"),
      where("members", "array-contains", user?.uid || ""),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    let my_room;
    querySnapshot.forEach((doc) => {
      my_room = doc.data();
    });
    // console.log(my_room);
    setRoomSelected(() => my_room);
  };

  // set room default is first loading
  useEffect(() => {
    roomDefault();
  }, []);

  const condition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: user.uid,
    };
  }, [user]);

  const rooms = useFirestore("rooms", condition);

  const membersCondition = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: roomSelected?.members,
    };
  }, [roomSelected]);

  const members = useFirestore("users", membersCondition);
  // console.log(members)

  return (
    <AppContext.Provider
      value={{ rooms, roomSelected, setRoomSelected, members }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
