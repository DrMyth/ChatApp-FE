import { useLocation } from "react-router-dom";
import { TopBar } from "../components/TopBar";
import { CopyIcon } from "../icons/CopyIcon";
import { useEffect, useRef, useState } from "react";
import { StartupClone } from "./StartupClone";

export const ChatUI = () => {
  const location = useLocation();
  const shareLink = location.state?.roomCode;
  const username = location.state?.name;
  const generatedCode = location.state?.generatedCode;
  const [messages, setMessages] = useState<
    { username: string; message: string }[]
  >([]);
  const wsRef = useRef<WebSocket>();
  const [userCount, setUserCount] = useState(1);

  const [input, setInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  function sendMessage() {
    wsRef.current?.send(
      JSON.stringify({
        type: "chat",
        payload: {
          message: input,
        },
      })
    );
    setInput("");
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setLoading(true);
    const ws = new WebSocket("wss://chatapp-be-production.up.railway.app");
    wsRef.current = ws;
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type == "chat") {
        setMessages((m) => [
          ...m,
          { username: data.payload.username, message: data.payload.message },
        ]);
      }

      if (data.type == "userCountUpdate") {
        setUserCount(data.payload.userCount);
        if (data.payload.userCount > 0) {
          setLoading(false); 
        }
      }
    };

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: shareLink,
          },
          username: username,
        })
      );
      console.log("WebSocket connection established");
    };

    ws.onclose = () => {
      setUserCount((count) => count - 1);
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.close();
    };
  }, []);

  function copyToClipBoard() {
    navigator.clipboard.writeText(shareLink);
  }

  if (loading) {
    return (
      <StartupClone name={username} roomCode={shareLink} generated={generatedCode}></StartupClone>
    );
  }

  return (
    <TopBar>
      <div>
        <div className="text-sm flex text-secondary justify-between rounded-lg p-4 bg-[#262626]">
          <div className="items-center flex gap-2">
            Room Code: {shareLink}
            <div onClick={copyToClipBoard} className="cursor-pointer">
              <CopyIcon />
            </div>
          </div>
          <div>Users: {userCount}</div>
        </div>

        {/* Chat Section */}
        <div
          ref={chatContainerRef}
          className="xl:h-[430px] lg:h-[390px] h-[400px] overflow-y-auto border p-4 rounded-lg mt-5 border-white/15"
        >
          {messages.map((msg, index) => {
            const isFirstMessageByUser =
              index === 0 || messages[index - 1].username !== msg.username;

            return (
              <div
                key={index}
                className={`m-1 flex ${
                  msg.username === username ? "justify-end" : "justify-start"
                }`}
              >
                <div className="max-w-[70%]">
                  {isFirstMessageByUser && (
                    <div
                      className={`text-xs mb-1 text-secondary ${
                        msg.username === username ? "text-right" : "text-left"
                      }`}
                    >
                      {msg.username}
                    </div>
                  )}

                  <div
                    className={`p-2 rounded-lg ${
                      msg.username === username
                        ? "bg-white text-black/80"
                        : "bg-white/10 text-secondary"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Messages Section */}
        <div className="mt-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="input-box flex-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.code == "Enter") {
                  sendMessage();
                }
              }}
            />
            <button className="button" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </TopBar>
  );
};
