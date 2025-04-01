const { createServer } = require("http");
const { WebSocketServer } = require("ws");
const next = require("next");

const port = 3000;
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

// Track active connections
const activeConnections = new Set();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    if (req.method === "GET" && req.url === "/api/device/socket") {
      res.writeHead(200, {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      });
      res.end("WebSocket server is ready.");
    } else {
      handle(req, res);
    }
  });

  // Configure WebSocket server with proper settings
  const wss = new WebSocketServer({
    server,
    perMessageDeflate: false,
    maxPayload: 1024 * 1024, // 1MB
  });

  // Connection timeout (60 seconds)
  const heartbeatInterval = 60000;

  wss.on("connection", (ws) => {
    console.log("New WebSocket connection established.");
    activeConnections.add(ws);

    // Send welcome message
    ws.send("Welcome to the WebSocket server!");

    // Setup heartbeat
    const heartbeat = setInterval(() => {
      if (ws.readyState === ws.OPEN) {
        ws.ping();
      }
    }, heartbeatInterval);

    ws.on("ping", () => {
      console.log("Received ping from client, sending pong...");
      ws.pong();
    });

    ws.on("pong", () => {
      // Reset heartbeat timer
      console.log("Received pong");
    });

    ws.on("message", (message) => {
      console.log(`Received: ${message.toString()}`);
      // Echo back with timestamp
      ws.send(`Echo [${new Date().toISOString()}]: ${message.toString()}`);
    });

    ws.on("close", () => {
      console.log("WebSocket client disconnected.");
      clearInterval(heartbeat);
      activeConnections.delete(ws);
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
      clearInterval(heartbeat);
      activeConnections.delete(ws);
    });
  });

  // Graceful shutdown
  process.on("SIGTERM", () => {
    console.log("Closing WebSocket server gracefully...");
    activeConnections.forEach((ws) => {
      if (ws.readyState === ws.OPEN) {
        ws.close(1000, "Server shutdown");
      }
    });
    server.close();
  });

  server.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
  });
});
