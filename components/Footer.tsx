import React from "react";
import Link from "next/link";
import { FiFacebook, FiTwitter, FiLinkedin, FiGithub } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">TaskMaster</h2>
          <p className="text-gray-700 dark:text-gray-300">
            TaskMaster helps you manage your daily tasks efficiently and professionally. Premium design, secure and fully responsive.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/tasks/create" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                Create Task
              </Link>
            </li>
            <li>
              <Link href="/tasks" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                All Tasks
              </Link>
            </li>
            <li>
              <Link href="/profile" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Follow Us</h3>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              <FiFacebook size={24} />
            </Link>
            <Link href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              <FiTwitter size={24} />
            </Link>
            <Link href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              <FiLinkedin size={24} />
            </Link>
            <Link href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              <FiGithub size={24} />
            </Link>
          </div>
          <p className="mt-6 text-gray-600 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} TaskMaster. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
