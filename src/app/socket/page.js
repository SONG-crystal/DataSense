"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [isSocketOpen, setIsSocketOpen] = useState(false);
  const [ws, setWs] = useState(null);
  const isFirstRender = useRef(true); // Track first render

  const handleWebsocketConn = () => {
    setIsSocketOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Set flag to false after first run
      return;
    }

    fetch("http://10.0.0.176:3000/api/device/socket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isOpen: isSocketOpen,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Response:", data))
      .catch((error) => console.error("Error:", error));
  }, [isSocketOpen]); // Runs only when `isSocketOpen` changes

  //   useEffect(() => {
  //     // WebSocket connection to the Next.js server
  //     const socket = new WebSocket("ws://localhost:3000/api/socket"); // Ensure your API handles this

  //     socket.onopen = () => {
  //       console.log("Connected to WebSocket server");
  //       socket.send("Hello from Next.js client");
  //     };

  //     socket.onmessage = (event) => {
  //       console.log("Received message:", event.data);
  //       setMessages((prevMessages) => [...prevMessages, event.data]);
  //     };

  //     socket.onclose = () => {
  //       console.log("WebSocket connection closed");
  //     };

  //     setWs(socket);

  //     return () => {
  //       if (socket) {
  //         socket.close();
  //       }
  //     };
  //   }, []);

  return (
    <div>
      <h1>WebSocket Test in Next.js 15</h1>
      <button onClick={handleWebsocketConn}>
        {isSocketOpen ? "Close Socket" : "Open Socket"}
      </button>
      <div>
        <h2>Messages:</h2>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
