"use client";
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
            <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gray-600">
              BookStack 
            </span>
          <div className="hidden md:flex items-center space-x-4">
         
            <Link
              href="/auth"
              className="bg-gray-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-white hover:text-gray-600 transition-all shadow-lg "
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
