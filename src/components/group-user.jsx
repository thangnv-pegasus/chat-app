import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import AddUserModal from "./add-user-modal";
import { AppContext } from "../context-api/AppProvider";

const Group = ({ maxSize = 2, roomSelected }) => {
  const [openModal, setOpenModal] = useState(false);

  const { members } = useContext(AppContext);

  return (
    <>
      <div className="flex">
        <button
          className="block text-sm px-3 py-1 rounded-md text-[#444] transition-all duration-150 ease-linear"
          onClick={() => setOpenModal(true)}
        >
          {" "}
          <span className="mr-[1px]">
            {" "}
            <FontAwesomeIcon icon={faUserPlus} />{" "}
          </span>{" "}
          Mời
        </button>
        <ul className="flex">
          {members.length > 0 ? (
            <>
              {members.map((item) => {
                return (
                  <li
                    className="w-8 h-8 overflow-hidden rounded-full"
                    title={item.displayName}
                    key={item.uid}
                  >
                    <img
                      src={item.photoURL}
                      alt=""
                      className="object-cover object-center w-full h-full"
                    />
                  </li>
                );
              })}
            </>
          ) : (
            <>
              <li
                className="w-8 h-8 overflow-hidden rounded-full"
                title="user"
                // key={item.uid}
              >
                <img
                  src="data:image/png;base64,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"
                  alt="avatar"
                  className="object-cover object-center w-full h-full"
                />
              </li>
            </>
          )}
        </ul>
      </div>
      {openModal && <AddUserModal setOpenModal={setOpenModal} />}
    </>
  );
};

export default Group;
