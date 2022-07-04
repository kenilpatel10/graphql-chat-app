import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/Home";
import ChatBox from "./components/ChatBox";
import Messages from "./components/Messages";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/chat" element={<ChatBox />} />
        <Route exact path="/chat1" element={<Messages />} />
      </Routes>
    </div>
  );
}

export default App;
