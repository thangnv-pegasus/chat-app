import {
    FacebookAuthProvider,
    getAdditionalUserInfo,
    signInWithPopup,
  } from "firebase/auth";
  import { auth, db } from "../firebase/config";
  import { useNavigate } from "react-router-dom";
  import { collection, addDoc, setDoc, doc, serverTimestamp } from "firebase/firestore";
  
  const Login = () => {
    const provider = new FacebookAuthProvider();
    const navigate = useNavigate();
  
    const handleLogin = async () => {
      const data = await signInWithPopup(auth, provider);
      navigate("/chat-room");
  
      // Add a new document with a generated id.
      const { displayName, photoURL, uid, email } = data.user;
      const check = getAdditionalUserInfo(data);
      const providerId = check.providerId;
      if (check.isNewUser == true) {
        await setDoc(doc(db, "users", uid), {
          displayName,
          photoURL,
          uid,
          email,
          providerId,
          timestamp: serverTimestamp()
        });
      }
    };
  
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <div className="">
          <h1 className="text-3xl text-center font-bold mb-10">Chat App</h1>
          <button
            className="block w-80 text-center text-lg font-semibold border-2 text-blue-500 py-1 border-solid border-blue-500 transition-all ease-linear hover:text-blue-700 hover:border-blue-700 my-2"
            onClick={() => handleLogin()}
          >
            Đăng nhập bằng Facebook
          </button>
          <button className="block w-80 text-center text-lg font-semibold border-[1px] py-1 transition-all ease-linear border-solid border-blue-500 my-3">
            Đăng nhập bằng Google
          </button>
        </div>
      </div>
    );
  };
  
  export default Login;
  