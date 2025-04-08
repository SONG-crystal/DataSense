"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    // Check if user was redirected from purchase page
    const purchaseRedirect = searchParams.get("purchaseRedirect");
    if (purchaseRedirect === "true") {
      setInfoMessage(
        "Please sign in or create an account to purchase your device."
      );
    }
  }, [searchParams]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        // Check if user was redirected from purchase page
        const purchaseRedirect = searchParams.get("purchaseRedirect");
        if (purchaseRedirect === "true") {
          router.push("/purchase");
        } else {
          router.push("/");
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Check if user was redirected from purchase page
      const purchaseRedirect = searchParams.get("purchaseRedirect");
      if (purchaseRedirect === "true") {
        await signIn("google", { callbackUrl: "/purchase" });
      } else {
        await signIn("google", { callbackUrl: "/" });
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-900">
      <div className="w-full max-w-md bg-gray-50 p-6 rounded-lg shadow-md">
        <h3 className="text-gray-900 lg:text-3xl text-2xl font-bold mb-8">
          Sign in
        </h3>

        {error && (
          <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {infoMessage && (
          <div className="mb-6 p-3 bg-blue-100 text-blue-700 rounded-md">
            {infoMessage}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleEmailLogin}>
          <div>
            <label className="text-sm text-gray-800 font-medium mb-2 block">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-none border border-gray-300 focus:border-blue-600 focus:bg-white"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-gray-800 font-medium mb-2 block">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-none border border-gray-300 focus:border-blue-600 focus:bg-white"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-3 block text-sm text-gray-600"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div className="mt-12">
            <button
              type="submit"
              className="w-full shadow-md py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Log in
            </button>
          </div>
        </form>

        <div className="my-6 flex items-center gap-4">
          <hr className="w-full border-gray-300" />
          <p className="text-sm text-gray-800 text-center">or</p>
          <hr className="w-full border-gray-300" />
        </div>

        <div className="space-x-6 flex justify-center">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 shadow-md py-2.5 px-4 text-sm font-medium rounded text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none"
          >
            <svg
              width="18"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
            Log in with Google
          </button>
        </div>

        <p className="text-sm mt-12 text-gray-600 text-center">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 font-medium hover:underline ml-1"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
