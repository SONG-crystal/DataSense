import connectToDatabase from "@/lib/mongodb";
import { parseIncomingData } from "@/lib/parse";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { RaspberryPi } from "@/models/raspberryPi";
import { SensorData } from "@/models/sensorData";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

// Handles GET request for fetching device data based on deviceId
export async function GET(req, { params }) {
  try {
    const response = await fetch(`http://10.0.0.131/api/device/live-data`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to send data");
    }

    const data = await response.json();
    console.log("Response: ", data);
  } catch (error) {
    console.error("Error sending GET request:", error);
  }

  return NextResponse.json({ message: "ok" }, { status: 201 });
}

// This handles the POST request for saving or updating the device data
export async function POST(req, { params }) {
  try {
    const { deviceId } = await params; // Get the deviceid from the route parameters

    try {
      const response = await fetch(`http://10.0.0.131/api/device/live-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          endpoint: `http://localhost:3000/api/device/data/${deviceId}/live`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send data");
      }

      const data = await response.json();
      console.log("Response: ", data);
    } catch (error) {
      console.error("Error sending POST request:", error);
    }

    return NextResponse.json({ message: "ok" }, { status: 201 });
  } catch (error) {
    console.error("Error saving sensor data:", error);
    return NextResponse.json(
      { message: "Error saving sensor data" },
      { status: 500 }
    );
  }
}
