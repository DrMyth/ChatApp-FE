import { useNavigate } from "react-router-dom";
import { TopBar } from "../components/TopBar";
import { useState } from "react";
import { customAlphabet } from "nanoid";
import { CopyIcon } from "./../icons/CopyIcon";
import helper from "../utils/helper";

export const Startup = () => {
  const navigate = useNavigate();
  function directUser() {
    if (!roomCode || !name) {
      alert("Please enter your name and a valid room code.");
      return;
    }

    if(!helper.nameValidation(name)){
      alert("Please enter a valid name.");
      return;
    } 
    
    if(!helper.roomCodeValidation(roomCode)){
      alert("Please enter a valid room code.");
      return;
    }

    navigate("/chat", { state: { roomCode, name, generatedCode } });
  }
  const [name, setName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState(false);
  const [shareLink, setShareLink] = useState("");

  function generateCode() {
    const nanoid = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6);
    const newCode = nanoid();
    setShareLink(newCode);
    setRoomCode(newCode);
    setGeneratedCode(true);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(shareLink);
  }

  return (
    <TopBar>
      <div>
        <div>
          <button
            onClick={generateCode}
            className="bg-white mb-2 w-full hover:bg-white/90 text-lg text-black/80 font-semibold py-2 px-4 rounded-md"
          >
            Create New Room
          </button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            className="input-box w-full mt-2 mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex xs:flex-row flex-col sm:gap-2 gap-0.5 ">
            <input
              type="text"
              placeholder="Enter Room Code"
              className="input-box flex-1 mt-2 mb-2"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
            />
            <button className="button mb-2 mt-2 bg-white hover:bg-white/90" onClick={directUser}>
              Join Room
            </button>
          </div>
        </div>
        {generatedCode == true ? (
          <div className="flex-col bg-[#262626] rounded-lg mt-2 mb-1 p-6">
            <div className="flex justify-center items-center text-center mr-3 ml-3">
              <div className="text-secondary m-1">Share this code with your friend</div>
            </div>
            <div className="mt-1 flex gap-2 justify-center items-center font-bold text-2xl">
                {shareLink}
                <div className="cursor-pointer" onClick={copyToClipboard}> 
                <CopyIcon />
                </div>
              </div>
          </div>
        ) : null}
      </div>
    </TopBar>
  );
};
