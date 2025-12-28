import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";

export const metadata = {
  title: "TaskMaster",
  description: "Manage your tasks efficiently and professionally",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 font-sans">
        {/* Navbar */}
        <Navbar />

        {/* Content wrapper with padding for fixed navbar */}
        <main className="min-h-screen pt-18">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
