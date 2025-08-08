import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/providers/ToastProvider";
import TokenProvider from "@/providers/TokenProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pro Gym",
  description: "Pro Gym"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white`}
      >
        <TokenProvider>
          <ToastProvider/>
            {children}
        </TokenProvider>
    </body>
    </html>
  );
}
