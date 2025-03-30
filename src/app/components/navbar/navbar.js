"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isDropdownOpen, setDropdownOpen] = useState(false); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login"); // Redirect to login page after sign-out
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <nav >
      <div className="max-w-8xl mx-auto">
        <div className="flex justify-between h-23 py-4">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center pl-37">
            <Link href="/" className="font-ore text-xl font-bold text-gray-800">
             <img src="/logo.png" alt="Data Sense" className="w-55 h-15"/>
            </Link>
          </div> 

          <div className="flex items-center space-x-4 pr-40">
            {status === "authenticated" ? (
              <>
                <div style={{ position: "relative" }}>
                <i
                  className="fa-solid fa-user"
                  onClick={toggleDropdown}
                  style={{ cursor: "pointer", fontSize: "25px" }}  //icon size
                ></i>

                {isDropdownOpen && ( //icon dropdown
                  <div className="userDropdown">
                    <button className="userBtn"
                      onClick={() => {
                        router.push("/profile"); 
                        setDropdownOpen(false);
                      }}
                    >
                      Profile
                    </button>

                    <button className="userBtn"
                      onClick={() => {
                        handleSignOut();
                        setDropdownOpen(false);
                      }}
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
              </>
            ) : (
              <>
                <button onClick={() => window.location.href = '/login'}   className="rounded-full bg-transparent hover:bg-gray-600 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded">
                  Log in
                </button> 

                <button onClick={() => window.location.href = '/signup'}  className="rounded-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 ">
                  Get started
                </button>
              </>
            )}
          </div>
        </div>


          {/* Mobile Menu Button */}
          {/* <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span> */}
              {/* Hamburger Icon */}
              {/* <svg
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
              </svg> */}
              {/* Close Icon */}
              {/* <svg
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
          </div> */}

          {/* middle nav-line */}
          <div className="w-full border-t border-gray-300"></div> 

          {/* Desktop Menu */}
          <div className="flex justify-start h-16 py-4 pl-37">
            <Link
              href="/about"
              className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </Link>
            <Link
              href="/faq"
              className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              FAQ
            </Link>

            {status === "authenticated" ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>

                <Link
                  href="/devices"
                  className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Devices
                </Link>

                {/* <button
                  onClick={handleSignOut}
                  className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Out
                </button> */}
              </>
            ) : (
              <>
              </>
          )}
          </div>

          {/* bottom nav-line */}
          <div className="w-full border-t border-gray-300"></div> 

      </div>

      {/* Mobile Menu */}
      {/* <div className={`${isOpen ? "block" : "hidden"} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className="block text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </Link> */}
          {/* Conditional Rendering for Authenticated Users */}
          {/* {status === "authenticated" ? (
            <>
              <Link
                href="/dashboard"
                className="block text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="block text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="block text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
            >
              Login
            </Link>
          )}
        </div> */}
      {/* </div> */}
    </nav>
  );
}
