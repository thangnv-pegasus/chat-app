import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useMemo, useState } from "react";
import { db } from "../firebase/config";
import { AppContext } from "../context-api/AppProvider";

const AddUserModal = ({ setOpenModal, user }) => {
  const [email, setEmail] = useState("");
  const { roomSelected } = useContext(AppContext);

  const rand = Math.floor(Math.random() * 10000) + 1;

  const addUserToRoom = async () => {
    let check = null;
    let result = ''

    const checkEmail = async () => {
      const q = query(collection(db, "users"), where("email", "==", email));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        check = true;
        result = doc.data()
      });
    };

    const userRef = doc(db, "rooms", roomSelected?.id);

    // Set the "capital" field of the city 'DC'
    if (check == true) {
      await updateDoc(userRef, {
        members: [...roomSelected.members, result?.uid],
      });
      alert('Thêm thành công!')
    }
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
            Nhập email
          </label>
          <input
            type="text"
            name=""
            id="name"
            className="my-1 px-2 py-1 text-sm block w-full border-solid border-[1px] border-gray-300 outline-sky-200"
            onChange={(e) => setEmail(e.target.value)}
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
              addUserToRoom();
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

export default AddUserModal;
