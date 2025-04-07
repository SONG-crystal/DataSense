"use client";

import { useDevices } from "@/app/context/deviceContext";
import { useState, useEffect, use } from "react";
import Chart from "@/app/components/charts/line";
import Link from "next/link";

export default function DevicePage({ params }) {
  const { deviceId } = use(params);

  const { devices, setDevices } = useDevices();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true); // Set loading state

    try {
      const response = await fetch(`/api/device/data/${deviceId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch devices");
      }

      const data = await response.json();
      setData(data); // Set the devices from the response
      console.log("data: ", data);
    } catch (error) {
      console.error("Error fetching devices:", error);
    } finally {
      setIsLoading(false); // Set loading to false once the fetch is complete
    }
  };

  useEffect(() => {
    fetchData();
  }, [deviceId]);

  // console.log(devices);
  // check if device belongs to user
  const userOwns = devices.some((device) => device.serialId == deviceId);

  if (!userOwns) {
    return <h1>Device: {deviceId} does not belong to you.</h1>;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Device ID: {deviceId}</h1>
      
      <div className="mt-4">
        <Link href={`/device/${deviceId}/live`} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          View Live Data
        </Link>
      </div>

      <div className="mt-6">
        <Chart
          temperatureData={data.temperature}
          humidityData={data.humidity}
          moistureData={data.moisture}
        />
      </div>
    </div>
  );
}
