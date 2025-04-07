"use client";

import { useState, use } from "react";
import MqttSubscriber from "@/app/components/mqtt/client";

export default function DevicePage({ params }) {
  const { deviceId } = use(params);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle the POST request when the button is clicked
  const handlePostRequest = async () => {
    setIsLoading(true);
    setError(null); // Reset any previous errors

    try {
      const response = await fetch(`/api/device/data/${deviceId}/live`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          endpoint: "https://demo.com/device/123",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send data");
      }

      const data = await response.json();
      console.log("Server response: ", data);
      alert("Client successfully initialized"); // Alert on success
    } catch (error) {
      console.error("Error sending POST request:", error);
      setError("Error sending POST request: " + error.message); // Set the error message to display
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const getLiveData = async () => {
    try {
      const response = await fetch(`/api/device/data/${deviceId}/live`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to send data");
      }

      const data = await response.json();
      console.log("Server response: ", data);
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Device ID: {deviceId}</h1>
      <MqttSubscriber />
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
}
