import SessionProvider from "./components/SessionProvider";
import connectToDatabase from "@/lib/mongodb";
import Navbar from "./components/navbar/navbar";
import { DevicesContextWrapper } from "./components/context/deviceContextWrapper";
import { Geist, Geist_Mono } from "next/font/google";
import Head from 'next/head'; 
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({ children }) {
  await connectToDatabase();

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <DevicesContextWrapper>
            <Navbar />
            {children}
          </DevicesContextWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
