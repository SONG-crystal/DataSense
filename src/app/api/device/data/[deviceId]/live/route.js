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
  // const session = await getServerSession(authOptions);

  // const { deviceId } = await params; // Get deviceId from route parameters

  // // Connect to the database
  // await connectToDatabase();

  // // Check if device belongs to user
  // const user = await User.findOne({ email: session.user.email });
  // if (!user) {
  //   return NextResponse.json({ error: "User not found" }, { status: 404 });
  // }

  // // Fetch device data by deviceId
  // const device = await RaspberryPi.findOne({ serialId: deviceId });

  // if (!device) {
  //   return NextResponse.json(
  //     { message: "Device not found" },
  //     { status: 404 }
  //   );
  // }

  // if (!device.userId.equals(user._id)) {
  //   return NextResponse.json(
  //     { message: "Device  belong to user" },
  //     { status: 403 }
  //   );
  // }

  try {
    const response = await fetch(`http://10.0.0.131/api/device/live-data`, {
      // make a server call
      method: "GET",
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
}

// This handles the POST request for saving or updating the device data
export async function POST(req, { params }) {
  try {
    const { deviceId } = await params; // Get the deviceid from the route parameters

    // Check if device is registered (i.e. exists in db)
    // Device cannot be registered if it DNE in db
    // const device = await RaspberryPi.findOne({ serialId: deviceId });

    // if (!device) {
    //   return NextResponse.json(
    //     { message: "Device not found" },
    //     { status: 404 }
    //   );
    // }

    try {
      const response = await fetch(`http://10.0.0.131/api/device/live-data`, {
        // make a server call
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
