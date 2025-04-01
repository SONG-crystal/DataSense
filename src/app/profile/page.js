"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  console.log("session: ", session);
  console.log("status: ", status);

  if (status === "loading") return <p>Loading session...</p>;

  return (
    <div className=" dark:bg-gray-900 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      {status === "authenticated" ? (
        <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Welcome, {session.user.name}!</h1>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="text-gray-800 dark:text-white font-medium">Name</p>
              <p className="text-gray-600 dark:text-gray-300">{session.user.name}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-800 dark:text-white font-medium">Email</p>
              <p className="text-gray-600 dark:text-gray-300">{session.user.email}</p>
            </div>
          </div>
          <div className="mt-6 text-center">
          </div>
        </div>
      ) : (
        <>
        </>
      )}
    </div>
  );
}
