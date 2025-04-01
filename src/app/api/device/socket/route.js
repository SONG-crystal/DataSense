import WebSocket, { WebSocketServer } from "ws";

let wss;

export async function OPTIONS(req) {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req) {
  try {
    const { isOpen } = await req.json();

    console.log("body:", isOpen);
    // WebSocket server URL (adjust if necessary)
    const websocketUrl = "ws://10.0.0.176:3000";

    // Send WebSocket URL to external device using `await`
    const response = await fetch("http://10.0.0.131/api/device/socket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ websocket_url: websocketUrl }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send WebSocket URL: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Response from device:", data);

    // Respond with the WebSocket URL
    return new Response(JSON.stringify({ websocket_url: websocketUrl }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to create WebSocket server..." }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
