import { collection, onSnapshot, query } from "firebase/firestore";
import Group from "./group-user";
import { db } from "../firebase/config";
import { useContext, useEffect } from "react";
import { Context } from "../context-api/AuthProvider";
import { AppContext } from "../context-api/AppProvider";

const Header = () => {
  const {roomSelected} = useContext(AppContext)

  return (
    <div className="py-2 px-4 text-[#444] border-solid border-b-2 border-[#ccc]">
      <div className="flex justify-between items-center">
        <div className="">
          {roomSelected ? (
            <>
              <h1 className="text-base font-semibold">
                {roomSelected.fieldName || ""}
              </h1>
              <p className="text-sm">{roomSelected.description || ""}</p>
            </>
          ) : (
            <>
              <h1 className="text-base font-semibold">Room</h1>
              <p className="text-sm">description</p>
            </>
          )}
        </div>
        <div>
          {/* <Group /> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
