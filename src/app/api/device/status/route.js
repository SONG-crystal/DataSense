// app/api/device/status/route.js
import { NextResponse } from "next/server";
import { RaspberryPi } from "@/models/raspberryPi";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const device_id = searchParams.get("device_id");

    if (!device_id) {
      return NextResponse.json(
        { error: "Missing device_id parameter" },
        { status: 400 }
      );
    }

    // Await the database check
    const isRegistered = await checkDeviceRegistration(device_id);

    return NextResponse.json({ registered: isRegistered });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

// Check database for device registration
async function checkDeviceRegistration(device_id) {
  const registered = await RaspberryPi.findOne({ serialId: device_id });
  return registered ? true : false;
}
