import Group from "./group-user";
import { useContext } from "react";
import { AppContext } from "../context-api/AppProvider";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const { roomSelected } = useContext(AppContext);

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
              <h1 className="flex items-center text-base"> <span className="text-yellow-400 mr-1"><FontAwesomeIcon icon={faTriangleExclamation} /></span> Hãy tạo phòng mới! </h1>
            </>
          )}
        </div>
        <div>{roomSelected && <Group />}</div>
      </div>
    </div>
  );
};

export default Header;
