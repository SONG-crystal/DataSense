"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useDevices } from "@/app/context/deviceContext";
import Link from "next/link";

export default function DevicesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  // Ensure user is authenticated
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

  // Access the devices and loading state from the context
  const { devices, isLoading } = useDevices();

  // Handle device registration
  const handleRegisterDevice = () => {
    router.push("/device/register");
  };

  // Handle device selection
  const handleDeviceClick = (deviceId) => {
    router.push(`/device/${deviceId}`);
  };

  // Show a loading state while fetching data
  if (status === "loading" || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#1456BC] border-r-transparent"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">
            Loading your devices...
          </p>
        </div>
      </div>
    );
  }

  // Filter devices based on search term
  const filteredDevices =
    devices?.filter(
      (device) =>
        device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.serialId.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <main className="min-h-screen bg-gray-50 pb-12">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Your Devices
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your connected DataSense devices. Monitor real-time data,
            configure settings, and register new devices.
          </p>
        </div>

        {/* Actions Row */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search devices..."
            />
          </div>

          {/* Register Device Button */}
          <button
            onClick={handleRegisterDevice}
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-[#1456BC] rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <svg
              className="w-4 h-4 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
            Register New Device
          </button>
        </div>

        {/* Devices Grid */}
        {filteredDevices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevices.map((device) => (
              <div
                key={device.serialId}
                onClick={() => handleDeviceClick(device.serialId)}
                className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-[#1456BC] rounded-full p-2">
                      <svg
                        className="w-6 h-6 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 14H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v1M5 19h5m-9-9h5m4-4h8a1 1 0 0 1 1 1v12H8a1 1 0 0 1-1-1V8Z"
                        />
                      </svg>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                        device.status === "online"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {device.status || "Unknown"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {device.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    ID: {device.serialId}
                  </p>

                  <div className="flex justify-between text-sm text-gray-600">
                    <div>
                      <p className="font-medium">Last Seen:</p>
                      <p>
                        {device.lastActive
                          ? new Date(device.lastActive).toLocaleString()
                          : "Never"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Data Points:</p>
                      <p>{device.dataCount || "0"}</p>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs text-gray-500">View Details</span>
                    <svg
                      className="w-5 h-5 text-[#1456BC]"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 15.005V15m0-13.97v9.97M3.235 14.665c-.71.71-1.34 1.087-1.415 1.01l-.16-.16c-.069-.066.325-.711 1.035-1.42 1.764-1.767 3.315-1.412 4.2-.527 1.066 1.066 1.066 2.575 0 3.642a2.575 2.575 0 0 1-3.641 0m5.7-3.64c1.765-1.765 4.611-1.765 6.376 0A4.505 4.505 0 0 1 15.997 15"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No devices found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm
                ? "No devices match your search criteria. Try a different search term."
                : "You don't have any registered devices yet."}
            </p>
            <div className="mt-6">
              <button
                onClick={handleRegisterDevice}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#1456BC] rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
                Register a Device
              </button>
            </div>
          </div>
        )}

        {/* Help Text */}
        <div className="mt-12 mx-auto max-w-2xl bg-blue-50 rounded-lg p-4 border border-blue-100">
          <h3 className="font-medium text-blue-800 text-sm mb-2">Need Help?</h3>
          <p className="text-sm text-blue-700">
            Visit our{" "}
            <Link href="/faq" className="underline font-medium">
              FAQ
            </Link>{" "}
            for information on how to register and configure your devices, or{" "}
            <Link href="/#contact" className="underline font-medium">
              contact our support team
            </Link>{" "}
            for personalized assistance.
          </p>
        </div>
      </div>
    </main>
  );
}
