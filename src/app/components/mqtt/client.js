"use client";

import Chart from "../charts/line";
import { useState, useEffect } from "react";
import mqtt from "mqtt";

const MQTT_BROKER =
  "wss://9f153fb50aea4234875db6b86d42af5b.s1.eu.hivemq.cloud:8884/mqtt";
const MQTT_USER = "pico-w";
const MQTT_PASSWORD = "Password1";
// const MQTT_TOPIC_SENSOR = "sensor";
// const MQTT_TOPIC_CONTROL = "control";
const MQTT_TOPIC_SENSOR = "device/e66180109f399025/live-data";
const MQTT_TOPIC_CONTROL = "device/e66180109f399025/control";

export default function MqttSubscriber() {
  const [message, setMessage] = useState("");
  const [client, setClient] = useState(null);
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [moistureData, setMoistureData] = useState([]);

  useEffect(() => {
    const mqttClient = mqtt.connect(MQTT_BROKER, {
      username: MQTT_USER,
      password: MQTT_PASSWORD,
      protocol: "wss",
      reconnectPeriod: 1000,
    });

    mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker");
      mqttClient.subscribe(MQTT_TOPIC_SENSOR, (err) => {
        if (err) console.error("Subscribe error:", err);
      });
    });

    mqttClient.on("message", (topic, payload) => {
      if (topic === MQTT_TOPIC_SENSOR) {
        const newData = payload.toString();
        setMessage(newData);

        // Parse the incoming message and add it to the appropriate sensor data array
        try {
          const parsedData = JSON.parse(newData);
          const timestamp = new Date(parsedData.time * 1000).toISOString();

          // Add data to the respective arrays for each sensor type
          setTemperatureData((prevData) => [
            ...prevData,
            { timestamp, temperature: parsedData.temperature },
          ]);
          setHumidityData((prevData) => [
            ...prevData,
            { timestamp, humidity: parsedData.humidity },
          ]);
          setMoistureData((prevData) => [
            ...prevData,
            { timestamp, moisture: parsedData.moisture },
          ]);
        } catch (error) {
          console.error("Error parsing sensor data:", error);
        }
      }
    });

    mqttClient.on("error", (err) => {
      console.error("MQTT error:", err);
    });

    setClient(mqttClient);

    return () => {
      mqttClient.end();
    };
  }, []);

  const sendCommand = (command) => {
    if (client) {
      client.publish(MQTT_TOPIC_CONTROL, command);
      console.log(`Sent command: ${command}`);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white text-center">
      <h2 className="text-xl font-bold">Live Sensor Data</h2>
      <p className="mt-2">Received Message: {message}</p>
      <div className="mt-4 flex gap-4 justify-center">
        <button
          onClick={() => sendCommand("start")}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Start
        </button>
        <button
          onClick={() => sendCommand("stop")}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Stop
        </button>
      </div>

      <div className="mt-6"></div>
      <Chart
        temperatureData={temperatureData}
        humidityData={humidityData}
        moistureData={moistureData}
      />
    </div>
  );
}
