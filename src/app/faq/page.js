import React from "react";

export const metadata = {
  title: "FAQ | DataSense",
  description: "Frequently Asked Questions about DataSense",
};

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Frequently Asked Questions
      </h1>

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">What is DataSense?</h3>
          <p className="text-gray-700">
            DataSense is a platform for real-time environmental monitoring using
            Raspberry Pi sensors. It allows you to collect, analyze, and
            visualize data to make informed decisions for your smart
            environment.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">
            How do I register a new device?
          </h3>
          <p className="text-gray-700">
            To register a new device, log in to your account, navigate to the
            Devices page, and click on the "Register New Device" button. Follow
            the instructions to connect your Raspberry Pi device.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">
            What types of sensors are supported?
          </h3>
          <p className="text-gray-700">
            DataSense supports a wide range of sensors including temperature,
            humidity, pressure, light, motion, air quality, and many other
            environmental sensors compatible with Raspberry Pi.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">
            How often is sensor data updated?
          </h3>
          <p className="text-gray-700">
            By default, sensor data is updated every 5 minutes, but you can
            configure your devices to send data at custom intervals ranging from
            real-time to daily updates depending on your needs.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">
            Is there an API available?
          </h3>
          <p className="text-gray-700">
            Yes, DataSense offers a comprehensive API that allows you to access
            your data programmatically and integrate with other systems and
            applications.
          </p>
        </div>
      </div>
    </div>
  );
}
