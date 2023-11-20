import React, { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import AIRobot from "../assets/airobot.png";
import ChatItem from "../components/chat/ChatItem";
import axios from "axios";

const Chat = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [emptyMessage, setEmptyMessage] = useState(false);

  const handleSubmit = async () => {
    if (userPrompt.trim() !== "") {
      const content = userPrompt;
      setUserPrompt("");
      const newMessage = { role: "user", content };
      setChatMessages((prev) => [...prev, newMessage]);
      const response = await axios.post(
        "http://localhost:8000/api/v1/chat/new",
        {
          userPrompt,
        }
      );
      const getMessage = { role: "assistant", content: response.data };
      setChatMessages((prev) => [...prev, getMessage]);
      console.log(response);
    } else {
      setEmptyMessage(true);
    }
  };

  useEffect(() => {}, [chatMessages]);

  return (
    <div className="chatpage-container">
      <div className="card" style={{ width: "80%", marginTop: "50px" }}>
        <div className="chat-details">
          <div className="chat-banner">
            <img src={AIRobot} alt="banner" />
            <button style={{ margin: "auto" }}>Clear Conversations</button>
          </div>
          <div className="chat-intro">
            <h1>Model - GPT 3.5 Turbo</h1>
            <h5 style={{ borderBottom: "1px solid rgb(242, 237, 237)" }}>
              You can ask some questions related to Knowledge, Business,
              Advices, Education, etc. But avoid sharing personal information.
            </h5>
            <div className="chat-conversation">
              {chatMessages.map((chat, index) => (
                <ChatItem content={chat.content} role={chat.role} key={index} />
              ))}
            </div>
            <div className="submit-conversation">
              <input
                type="text"
                required
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (e.target.value.trim() === "") {
                      setEmptyMessage(true);
                    } else {
                      handleSubmit();
                    }
                  }
                }}
              />
              <button type="submit" onClick={handleSubmit}>
                <IoMdSend />
              </button>
            </div>
            {emptyMessage && (
              <p style={{ color: "red" }}>Please enter your query!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
