"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { FaBookOpen } from "react-icons/fa";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = (path) =>
    `relative transition duration-200 hover:text-yellow-600 ${pathname === path
      ? "text-yellow-600 font-semibold after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-yellow-500"
      : "text-gray-700"
    }`;

  const mobileLinkClass = (path) =>
    `block px-4 py-3 text-sm font-medium border-b border-gray-100 hover:bg-gray-50 transition ${pathname === path ? "text-yellow-600 font-semibold" : "text-gray-700"
    }`;

  const handleLogout = async () => {
    await signOut();
    setMenuOpen(false);
    router.push("/");
  };

  return (
    <nav className="w-full border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center px-4 sm:px-8 lg:px-35 py-3 justify-between">

        {/* Logo */}
        <Link href="/" className="text-xl flex items-center gap-2 sm:text-2xl font-bold text-blue-600">
          <FaBookOpen />
          StudyNook
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 font-medium text-sm">
          <li><Link href="/" className={linkClass("/")}>Home</Link></li>
          <li><Link href="/rooms" className={linkClass("/rooms")}>Rooms</Link></li>
          {session?.user && (
            <>
              <li><Link href="/add-room" className={linkClass("/add-room")}>Add Room</Link></li>
              <li><Link href="/my-listings" className={linkClass("/my-listings")}>My Listings</Link></li>
              <li><Link href="/my-bookings" className={linkClass("/my-bookings")}>My Bookings</Link></li>
            </>
          )}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {isPending && <span className="text-sm text-gray-500">Loading...</span>}

          {!session?.user && !isPending && (
            <div className="hidden md:flex gap-2">
              <Link href="/login" className={`px-3 py-1 border rounded text-sm ${pathname === "/login" ? "bg-yellow-100 text-yellow-700 border-yellow-400" : "text-gray-700 border-gray-300 hover:bg-gray-100"}`}>
                Login
              </Link>
              <Link href="/register" className={`px-3 py-1 rounded text-sm ${pathname === "/register" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}>
                Register
              </Link>
            </div>
          )}

          {/* Desktop Avatar Dropdown */}
          {session?.user && (
            <div className="relative group hidden md:block">
              <button className="flex items-center gap-2">
                <img
                  src={session?.user?.image || "/avatar.png"}
                  alt="avatar"
                  className="w-9 h-9 rounded-full object-cover border"
                />
                <span className="hidden sm:block text-sm font-medium">{session?.user?.name}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200">
                <Link href="/my-listings" className="block px-4 py-2 hover:bg-gray-100">My Listings</Link>
                <Link href="/my-bookings" className="block px-4 py-2 hover:bg-gray-100">My Bookings</Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600">
                  Logout
                </button>
              </div>
            </div>
          )}

          {/* Hamburger Button — mobile only */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t">
          {session?.user && (
            <div className="flex items-center gap-3 px-4 py-3 border-b bg-gray-50">
              <img
                src={session?.user?.image || "/avatar.png"}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover border"
              />
              <span className="text-sm font-medium">{session?.user?.name}</span>
            </div>
          )}

          <Link href="/" className={mobileLinkClass("/")} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/rooms" className={mobileLinkClass("/rooms")} onClick={() => setMenuOpen(false)}>Rooms</Link>

          {session?.user && (
            <>
              <Link href="/add-room" className={mobileLinkClass("/add-room")} onClick={() => setMenuOpen(false)}>Add Room</Link>
              <Link href="/my-listings" className={mobileLinkClass("/my-listings")} onClick={() => setMenuOpen(false)}>My Listings</Link>
              <Link href="/my-bookings" className={mobileLinkClass("/my-bookings")} onClick={() => setMenuOpen(false)}>My Bookings</Link>
            </>
          )}

          {!session?.user && !isPending && (
            <div className="flex gap-2 px-4 py-3">
              <Link href="/login" onClick={() => setMenuOpen(false)} className="flex-1 text-center px-3 py-2 border rounded text-sm text-gray-700 border-gray-300 hover:bg-gray-100">Login</Link>
              <Link href="/register" onClick={() => setMenuOpen(false)} className="flex-1 text-center px-3 py-2 rounded text-sm bg-blue-600 text-white hover:bg-blue-700">Register</Link>
            </div>
          )}

          {session?.user && (
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50"
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