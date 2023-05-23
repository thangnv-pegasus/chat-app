import {  Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import ChatRoom from "./pages/chat-room";
function App() {
  return (
    <>
        <Routes>
          <Route path="/chat-room" element={<ChatRoom />} />
          <Route path="/" element={<Login />} />
        </Routes>
    </>
  );
}

export default App;
