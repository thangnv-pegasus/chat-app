import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, db } from "../firebase/config";
import Loading from "../components/loading";
import { useNavigate } from "react-router-dom";
import { Context } from "./AuthProvider";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import useFirestore from "../hooks/useFirestore";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const user = useContext(Context);

  // console.log(user)

  const [rooms, setRooms] = useState([]);
  const [roomSelected, setRoomSelected] = useState();
  const [members, setMembers] = useState([]);
  const [defaultId, setDefaultId] = useState([""]);

  const nav = useNavigate();
  const getRooms = async () => {
    const q = query(
      collection(db, "rooms"),
      where("uid", "array-contains", user.uid)
    );

    const querySnapshot = await getDocs(q);
    const arr = [];
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });

    setRooms(arr);
  };

  const roomDefault = async () => {
    const q = query(
      collection(db, "rooms"),
      where("members", "array-contains", user.uid),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    let my_room;
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.data());
      my_room = doc.data();
    });
    // console.log(my_room);
    setRoomSelected(() => my_room);
  };

  // get all room of user
  useEffect(() => {
    getRooms();
    const q = query(
      collection(db, "rooms"),
      where("members", "array-contains", user.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      setRooms(arr);
    });
  }, []);

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

  const rooms2 = useFirestore("rooms", condition);

  // console.log(rooms)
  // console.log(roomSelected);

  console.log(rooms2);

  return (
    <AppContext.Provider
      value={{ rooms, roomSelected, setRoomSelected, members }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
