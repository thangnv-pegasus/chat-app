import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import Loading from "../components/loading";
import { useNavigate } from "react-router-dom";
import { Context } from "./AuthProvider";
import { AppContext } from "./AppProvider";

export const ContextMembers = createContext();

const MemberProvider = ({ children }) => {
  const {roomSelected} = useContext(AppContext)

 

  return (
    <ContextMembers.Provider value={roomSelected}>
      {/* {loading ? <Loading /> : <>{children}</>} */}
      {children}
    </ContextMembers.Provider>
  );
};

export default MemberProvider;
