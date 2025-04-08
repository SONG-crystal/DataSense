"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import mqtt from "mqtt";
import Link from "next/link";

const MQTT_BROKER =
  "wss://9f153fb50aea4234875db6b86d42af5b.s1.eu.hivemq.cloud:8884/mqtt";
const MQTT_USER = "pico-w";
const MQTT_PASSWORD = "Password1";

export default function DeviceRegisterPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [formData, setFormData] = useState({
    name: "",
    device_id: "",
    mode: "user",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [pendingDevices, setPendingDevices] = useState(new Set());
  const [client, setClient] = useState(null);

  const MQTT_REGISTRATION = `device/register`;
  const MQTT_REGISTRATION_RESPONSE = `device/register/response`;

  useEffect(() => {
    const mqttClient = mqtt.connect(MQTT_BROKER, {
      username: MQTT_USER,
      password: MQTT_PASSWORD,
      protocol: "wss",
      reconnectPeriod: 1000,
    });

    mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker");

      const topics = [MQTT_REGISTRATION, MQTT_REGISTRATION_RESPONSE];
      mqttClient.subscribe(topics, (err) => {
        if (err) console.error("Subscribe error:", err);
      });
    });

    mqttClient.on("message", (topic, payload) => {
      console.log(`Received message from ${topic}:`, payload.toString());
      if (topic == MQTT_REGISTRATION) {
        try {
          // Parse the JSON payload
          const message = JSON.parse(payload.toString());

          // Extract the device_id from the parsed object
          const deviceId = message.device_id;

          // Check if device_id is valid and add it to the set
          if (deviceId) {
            // Create a new set with the previous devices and add the new one
            setPendingDevices((prev) => {
              const updatedSet = new Set(prev);
              updatedSet.add(deviceId);
              return updatedSet;
            });
          } else {
            console.error(
              "Received message does not contain a valid device_id"
            );
          }
        } catch (error) {
          console.error("Failed to parse MQTT message:", error);
        }
      }
      console.log("Pending Devices: ", pendingDevices);
    });

    mqttClient.on("error", (err) => {
      console.error("MQTT error:", err);
    });

    setClient(mqttClient);

    return () => {
      mqttClient.end();
    };
  }, []);

  const sendCommand = (topic, command, callback) => {
    if (client) {
      client.publish(topic, command, (err) => {
        if (err) {
          console.error(`Error publishing to ${topic}:`, err);
          setError("Failed to send command.");
        } else {
          console.log(`Published ${command} to ${topic}`);
          if (callback) callback();
        }
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!formData.name) {
      setError("Device name is required.");
      setIsSubmitting(false);
      return;
    }

    if (!session?.user?.id) {
      setError("User ID not found. Please sign in again.");
      setIsSubmitting(false);
      return;
    }

    if (!pendingDevices.has(formData.device_id)) {
      setError("Device is not pending for registration.");
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await fetch(`/api/device/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userId: session.user.id,
        }),
      });

      console.log("response: ", response);

      if (response.ok) {
        sendCommand(
          MQTT_REGISTRATION_RESPONSE,
          JSON.stringify({
            device_id: formData.device_id,
            status: "registered",
          }),
          () => {
            setSuccessMessage("Device registered successfully!");
            setFormData({
              name: "",
              device_id: "",
              mode: "user",
            });

            // Redirect to devices page after a short delay
            setTimeout(() => {
              router.push("/devices");
            }, 2000);
          }
        );
      } else {
        const data = await response.json();
        setError(
          data.message || "Failed to register device. Please try again."
        );
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Register New Device
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Connect your Raspberry Pi device to DataSense for real-time
            monitoring and data visualization.
          </p>
        </div>

        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          {successMessage && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12.5l3 3 5-5m9-4a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              {successMessage}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm text-gray-800 font-medium mb-2 block">
                Device Name*
              </label>
              <input
                name="name"
                type="text"
                required
                className="bg-white w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-none border border-gray-300 focus:border-[#1456BC] focus:ring-2 focus:ring-blue-100"
                placeholder="Enter a name for your device (e.g., Living Room Sensor)"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="text-sm text-gray-800 font-medium mb-2 block">
                Device ID*
              </label>
              <input
                name="device_id"
                type="text"
                required
                className="bg-white w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-none border border-gray-300 focus:border-[#1456BC] focus:ring-2 focus:ring-blue-100"
                placeholder="Enter your Raspberry Pi device ID"
                value={formData.device_id}
                onChange={handleInputChange}
              />
              <p className="mt-1 text-xs text-gray-500">
                The Device ID can be found on your Raspberry Pi device or in the
                documentation.
              </p>
            </div>

            <div>
              <label className="text-sm text-gray-800 font-medium mb-2 block">
                Mode
              </label>
              <select
                name="mode"
                value={formData.mode}
                onChange={handleInputChange}
                className="bg-white w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-none border border-gray-300 focus:border-[#1456BC] focus:ring-2 focus:ring-blue-100"
              >
                <option value="user">User Mode</option>
                <option value="admin">Admin Mode</option>
                <option value="viewer">Viewer Mode</option>
              </select>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 text-sm font-semibold rounded-md text-white bg-[#1456BC] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Registering...
                  </span>
                ) : (
                  "Register Device"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/devices"
              className="text-sm text-[#1456BC] hover:text-blue-800 font-medium"
            >
              Back to Devices
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-12 mx-auto max-w-2xl bg-blue-50 rounded-lg p-4 border border-blue-100">
          <h3 className="font-medium text-blue-800 text-sm mb-2">
            Need Help with Registration?
          </h3>
          <p className="text-sm text-blue-700">
            Check our{" "}
            <Link href="/faq" className="underline font-medium">
              FAQ
            </Link>{" "}
            for step-by-step instructions on how to register your Raspberry Pi
            device and connect it to DataSense.
          </p>
        </div>
      </div>
    </main>
  );
}
