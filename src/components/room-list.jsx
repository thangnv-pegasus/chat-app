import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AddRoomModal from "./add-room-modal";

const RoomList = ({ rooms, user, setRoomSelected }) => {
  const [open, setOpen] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="px-3">
        <div
          className="flex items-center py-2 justify-between hover:cursor-pointer font-semibold"
          onClick={() => setOpen(!open)}
        >
          <p>Danh sách các phòng</p>
          <p
            className={
              (open ? "rotate-180" : "rotate-0") +
              " transition-all duration-500 ease-linear"
            }
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </p>
        </div>
        <ul
          className="transition-all duration-200 ease-linear px-2"
          style={
            open ? { height: "100%" } : { height: "0", overflow: "hidden" }
          }
        >
          {rooms.map((item) => {
            return (
              <li
                className="py-2 px-2 my-1 cursor-pointer transition-all duration-150 ease-linear hover:bg-[rgba(0,0,0,0.1)]"
                key={item.id}
                onClick={() => setRoomSelected(item)}
              >
                {item.fieldName}
              </li>
            );
          })}
        </ul>
        <button
          className="mx-4 flex items-center"
          onClick={() => setOpenModal(true)}
        >
          {" "}
          <span className="mr-2 font-medium">
            <FontAwesomeIcon icon={faSquarePlus} />
          </span>{" "}
          Thêm phòng
        </button>
      </div>
      {openModal && <AddRoomModal setOpenModal={setOpenModal} user={user} />}
    </>
  );
};

export default RoomList;
