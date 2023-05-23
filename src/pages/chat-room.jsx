import { useContext, useEffect, useMemo, useState } from "react";
import RoomList from "../components/room-list";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";
import Header from "../components/header";
import Message from "../components/message";
import { Context } from "../context-api/AuthProvider";
import { AppContext } from "../context-api/AppProvider";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import useFirestore from "../hooks/useFirestore";
import { formatRelative } from "date-fns";

const ChatRoom = () => {
  const user = useContext(Context);
  const { rooms, roomSelected, setRoomSelected } = useContext(AppContext);
  const [mess, setMess] = useState("");
  const nav = useNavigate();

  const logOut = () => {
    auth
      .signOut()
      .then(() => {
        nav("/");
      })
      .catch((error) => {
        console.log(error);
      });
    // window.location.reload();
  };

  const handleSubmit = async () => {
    const docRef = await addDoc(collection(db, "messages"), {
      uid: user.uid,
      rid: roomSelected.id,
      name: user.displayName,
      photoURL: user.photoURL,
      timestamp: serverTimestamp(),
      text: mess,
    });
  };

  const formatDate = (seconds) => {
    // console.log(seconds);
    let format = "";
    if (seconds) {
      format = formatRelative(new Date(seconds * 1000), new Date());
      format = format.charAt(0).toLocaleUpperCase() + format.slice(1);
    }

    return format;
  };

  const condition = useMemo(() => {
    return {
      fieldName: "rid",
      operator: "==",
      compareValue: roomSelected?.id,
    };
  }, [roomSelected]);

  const messages = useFirestore("messages", condition);

  return (
    <div className="grid grid-cols-1fr_3fr h-screen text-white">
      <div className="bg-purple-900">
        <div className="flex py-2 border-b-[1px] border-solid border-[#ccc] justify-between items-center">
          <div className="flex px-3 items-center">
            <div className="rounded-full w-10 h-10 overflow-hidden mr-2">
              <img
                src={user.photoURL}
                alt="avatar"
                className="object-cover object-center w-full h-full"
              />
            </div>
            <p className=" text-sm font-semibold">{user.displayName}</p>
          </div>
          <button
            className="block mx-3 text-sm border-2 border-solid border-slate-300 px-3 py-2 rounded-md transition-all ease-linear hover:border-gray-100"
            onClick={() => logOut()}
          >
            Đăng xuất
          </button>
        </div>
        <div>
          <RoomList
            rooms={rooms}
            user={user}
            setRoomSelected={setRoomSelected}
          />
        </div>
      </div>
      <div>
        <Header roomSelected={roomSelected} />
        <div className="px-3">
          <div className="overflow-y-scroll h-[calc(100vh-100px)] w-full scrollbar-hide">
            {messages.length > 0 &&
              messages.map((item) => {
                return (
                  <Message
                    displayName={item.name}
                    photoURL={item.photoURL}
                    createAt={formatDate(item.timestamp?.seconds)}
                    text={item.text}
                    key={item.timestamp}
                  />
                );
              })}
          </div>
        </div>
        <div className="px-3">
          <form
            action=""
            className="flex w-full text-[#444]"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
              setMess("");
            }}
          >
            <input
              type="text"
              name=""
              placeholder="Nhập nội dung..."
              id=""
              className="block flex-1 border-2 border-solid border-[#ccc] outline-none rounded-md py-1 px-2"
              value={mess}
              onChange={(e) => setMess(e.target.value)}
            />
            <button
              type="submit"
              className="border-2 border-solid border-transparent rounded-md px-3 ml-1 bg-sky-600 text-white"
            >
              Gửi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
