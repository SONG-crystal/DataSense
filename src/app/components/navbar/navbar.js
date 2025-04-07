"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login"); // Redirect to login page after sign-out
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="DataSense Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <span className="text-xl font-bold">
                <span className="text-[#1456BC]">Data</span>
                <span className="text-[#FF8C42]">Sense</span>
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger Icon */}
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close Icon */}
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:space-x-8 sm:items-center">
            <Link
              href="/"
              className="text-gray-700 hover:text-[#1456BC] px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-[#1456BC] px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </Link>
            {/* Conditional Rendering for Authenticated Users */}
            {status === "authenticated" ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-[#1456BC] px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>

                <Link
                  href="/devices"
                  className="text-gray-700 hover:text-[#1456BC] px-3 py-2 rounded-md text-sm font-medium"
                >
                  Devices
                </Link>
                <button
                  onClick={handleSignOut}
                  className="bg-[#FF8C42] text-white hover:bg-[#e67e35] px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-[#1456BC] text-white hover:bg-[#0f4299] px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${isOpen ? "block" : "hidden"} sm:hidden bg-white border-t`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className="block text-gray-700 hover:text-[#1456BC] px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block text-gray-700 hover:text-[#1456BC] px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </Link>
          {/* Conditional Rendering for Authenticated Users */}
          {status === "authenticated" ? (
            <>
              <Link
                href="/dashboard"
                className="block text-gray-700 hover:text-[#1456BC] px-3 py-2 rounded-md text-base font-medium"
              >
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full text-left bg-[#FF8C42] text-white hover:bg-[#e67e35] px-4 py-2 rounded-md text-base font-medium transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="block bg-[#1456BC] text-white hover:bg-[#0f4299] px-4 py-2 rounded-md text-base font-medium transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
