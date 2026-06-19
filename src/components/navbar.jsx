"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const linkClass = (path) =>
    `relative transition duration-200 hover:text-yellow-600 ${
      pathname === path
        ? "text-yellow-600 font-semibold after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-yellow-500"
        : "text-gray-700"
    }`;

  return (
    <nav>
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4">

        {/* Logo */}
        <Link href="/" className="text-xl sm:text-2xl font-bold text-blue-600">
          StudyNook
        </Link>

        {/* Menu Links */}
        <ul className="flex flex-wrap items-center gap-4 sm:gap-6 font-medium text-sm sm:text-base">
          <li>
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>
          </li>

          <li>
            <Link href="/rooms" className={linkClass("/rooms")}>
              Rooms
            </Link>
          </li>
        </ul>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Link
            href="/login"
            className={`px-3 sm:px-4 py-1 border rounded transition text-sm sm:text-base ${
              pathname === "/login"
                ? "bg-yellow-100 text-yellow-700 border-yellow-400"
                : "text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            Login
          </Link>

          <Link
            href="/register"
            className={`px-3 sm:px-4 py-1 rounded transition text-sm sm:text-base ${
              pathname === "/register"
                ? "bg-yellow-500 text-white hover:bg-yellow-600"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Register
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;