import { WebSocketServer } from "ws";

let wss;

export default function handler(req, res) {
  if (!wss) {
    wss = new WebSocketServer({ noServer: true });

    wss.on("connection", (ws) => {
      ws.isAlive = true;
      console.log("Client connected!");

      // Ping every 30s, disconnect if no Pong after 10s
      const pingInterval = setInterval(() => {
        if (!ws.isAlive) return ws.terminate(); // Force disconnect
        ws.isAlive = false;
        ws.ping();
      }, 30000);

      ws.on("pong", () => {
        ws.isAlive = true; // Reset on Pong
      });

      ws.on("message", (message) => {
        console.log("Received:", message.toString());
        ws.send(`Echo: ${message}`);
      });

      ws.on("close", () => {
        clearInterval(pingInterval); // Cleanup
        console.log("Client disconnected");
      });
    });

    console.log("WebSocket server initialized.");
  }

  // Handle upgrade on the HTTP server
  res.socket.server.on("upgrade", (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit("connection", ws, req);
    });
  });

  if (req.method === "POST") {
    res.status(200).json({ message: "WebSocket server is ready." });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

export const config = {
  api: {
    bodyParser: false, // Required for WebSocket upgrade handling
  },
};
