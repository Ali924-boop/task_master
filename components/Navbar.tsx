/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiBell, FiUser } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState<{ message: string }[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    }
  }, []);

  // Fetch notifications from backend (optional)
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!isLoggedIn) return;
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("/api/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setNotifications(data);
        }
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      }
    };
    fetchNotifications();
  }, [isLoggedIn]);

  // Active link highlighting
  const activeClass = (path: string) =>
    pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-700 dark:text-gray-200 hover:text-blue-600 transition";

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
          TaskMaster
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className={activeClass("/")}>
            Dashboard
          </Link>
          <Link href="/tasks/create" className={activeClass("/tasks/create")}>
            Create Task
          </Link>
          <Link href="/tasks/alltasks" className={activeClass("/tasks")}>
            All Tasks
          </Link>

          {isLoggedIn && (
            <Link href="/profile" className={activeClass("/profile") + " flex items-center"}>
              <FiUser className="mr-1" /> Profile
            </Link>
          )}

          {/* Notification */}
          {isLoggedIn && (
            <div className="relative">
              <button
                onClick={() => setShowNotifications((prev) => !prev)}
                className="relative"
              >
                <FiBell className="text-gray-700 dark:text-gray-200 text-xl hover:text-blue-600 transition" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border rounded shadow-lg z-50">
                  {notifications.length === 0 ? (
                    <p className="p-4 text-gray-500 text-sm">No notifications</p>
                  ) : (
                    <ul>
                      {notifications.map((n, idx) => (
                        <li
                          key={idx}
                          className="px-4 py-2 border-b hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-gray-200"
                        >
                          {n.message}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          )}

          {!isLoggedIn ? (
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-6 py-4 space-y-4 shadow-lg">
          <Link href="/" className={activeClass("/") + " block"}>
            Dashboard
          </Link>
          <Link href="/tasks/create" className={activeClass("/tasks/create") + " block"}>
            Create Task
          </Link>
          <Link href="/tasks/alltasks" className={activeClass("/tasks") + " block"}>
            All Tasks
          </Link>
          {isLoggedIn && (
            <Link href="/profile" className={activeClass("/profile") + " block"}>
              Profile
            </Link>
          )}
          {!isLoggedIn ? (
            <Link
              href="/login"
              className="block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
