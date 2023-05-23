import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { db } from "../firebase/config";
import { Context } from "../context-api/AuthProvider";

const AddRoomModal = ({ setOpenModal }) => {
  const user = useContext(Context);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const rand = Math.floor(Math.random() * 10000) + 1;

  const addRoom = async () => {
    await setDoc(doc(db, "rooms", `${name + rand}`), {
      fieldName: name,
      description: desc,
      members: [user.uid],
      id: `${name + rand}`,
      timestamp: serverTimestamp()
    });
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] text-[#444] z-10 flex items-center justify-center"
      onClick={(e) => setOpenModal(false)}
    >
      <div
        className="w-1/3 bg-white rounded-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="py-3 px-4 border-b-[1px] border-solid border-gray-400 flex justify-between">
          <p className="text-lg font-medium">Tạo phòng</p>
          <span
            className="text-xl font-normal cursor-pointer"
            onClick={() => setOpenModal(false)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </span>
        </h1>
        <form action="" className="block px-5 py-4">
          <label htmlFor="name" className="">
            Tên phòng
          </label>
          <input
            type="text"
            name=""
            id="name"
            className="my-1 px-2 py-1 text-sm block w-full border-solid border-[1px] border-gray-300 outline-sky-200"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="desc" className="inline-block mt-3">
            Mô tả
          </label>
          <input
            type="text"
            name=""
            id="desc"
            className="my-1 px-2 py-1 text-sm block w-full border-solid border-[1px] border-gray-300 outline-sky-200"
            onChange={(e) => setDesc(e.target.value)}
          />
        </form>
        <div className="py-2 px-4 border-t-[1px] border-solid border-gray-400 flex justify-end">
          <button
            className="block px-4 py-1 ml-2 rounded-sm border-solid border-[1px] border-gray-300 transition-all duration-100 ease-linear hover:border-sky-500 hover:text-sky-500"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </button>
          <button
            className="block px-4 py-1 ml-2 rounded-sm border-solid border-[1px] border-gray-300 text-white bg-sky-500 hover:bg-sky-400"
            onClick={() => {
              addRoom();
              setOpenModal(false);
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
