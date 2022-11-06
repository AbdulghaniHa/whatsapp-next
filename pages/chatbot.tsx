import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useRouter } from "next/router";

function Chatbot() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const BACKEND_SERVER = "http://localhost:3001";
  const socket = io(BACKEND_SERVER);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connection Started !");
      console.log(socket.id);
      socket.emit("frontend_to_server", "message from frontend hehe")
    });

    socket.on("event_", (message) => {
      console.log(message);
    });

    socket.on("message_recived", (message) => {
      console.log(message);
      setMessage(message)
    });

  }, []);

  return <div>
    Socket id {message}

    <button onClick={() => {
      socket.emit("frontend_to_server", "message from frontend Button")
    }}>Send message</button>
    </div>;
}

export default Chatbot;
