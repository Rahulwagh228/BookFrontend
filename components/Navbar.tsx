"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("Booktoken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("Booktoken");
    setIsLoggedIn(false);
    router.push("/auth");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gray-600 cursor-pointer">
              BookStack 
            </span>
          </Link>
          <div className=" md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-gray-900 font-semibold"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-white hover:text-red-500 hover:border-red-500 border border-transparent transition-all shadow-lg cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                className="bg-gray-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-white hover:text-gray-600 border border-transparent hover:border-gray-600 transition-all shadow-lg "
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
