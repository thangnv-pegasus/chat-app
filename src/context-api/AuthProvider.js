import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import Loading from "../components/loading";
import { useNavigate } from "react-router-dom";

export const Context = createContext();

const AuthProvider = ({ children }) => {
  // console.log({chidren})
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // console.log(user);
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({ displayName, email, uid, photoURL });
        setLoading(false);
        nav("/chat-room");
        return;
      } else {
        setUser({});
        setLoading(false);
        nav("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [nav]);

  console.log(loading);

  return (
    <Context.Provider value={user}>
      {loading === true ? <Loading /> : <>{children}</>}
      {/* {children} */}
    </Context.Provider>
  );
};

export default AuthProvider;
