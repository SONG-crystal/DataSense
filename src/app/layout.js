import SessionProvider from "./components/SessionProvider";
import connectToDatabase from "@/lib/mongodb";
import { DevicesContextWrapper } from "./components/context/deviceContextWrapper";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "DataSense | IoT Data Collection & Analysis",
  description: "Real-time environmental monitoring with Raspberry Pi sensors",
  generator: "Next.js",
  icons: {
    icon: [
      { url: "/logo-transparent.png" },
      { url: "/logo-transparent.png", sizes: "16x16", type: "image/png" },
      { url: "/logo-transparent.png", sizes: "32x32", type: "image/png" },
      { url: "/logo-transparent.png", sizes: "192x192", type: "image/png" },
      { url: "/logo-transparent.png", sizes: "512x512", type: "image/png" },
    ],
    apple: { url: "/logo-transparent.png" },
    shortcut: { url: "/logo-transparent.png" },
  },
};

export default async function RootLayout({ children }) {
  await connectToDatabase();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground flex flex-col`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SessionProvider>
            <DevicesContextWrapper>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
            </DevicesContextWrapper>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
