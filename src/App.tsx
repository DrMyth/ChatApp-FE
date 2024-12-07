import "./App.css";
import { ChatUI } from "./Pages/ChatUI";
import { Startup } from "./Pages/Startup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Startup />} />
          <Route path="/chat" element={<ChatUI />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
