import React, { useState } from "react";

export default function Navbar({ onNavigate, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-500 rounded-full text-white font-bold text-lg">
            C
          </div>
          <span className="text-xl font-bold text-blue-900">College DB</span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => onNavigate("dashboard")}
            className="text-gray-700 hover:text-blue-900 font-medium transition"
          >
            Dashboard
          </button>
          <button
            onClick={() => onNavigate("staff")}
            className="text-gray-700 hover:text-blue-900 font-medium transition"
          >
            Staff Form
          </button>
          <button
            onClick={onLogout}
            className="border-2 border-blue-500 text-blue-500 py-1 px-4 rounded-full hover:bg-blue-500 hover:text-white transition"
          >
            Logout
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 hover:text-blue-900 focus:outline-none text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200 flex flex-col">
          <button
            onClick={() => {
              onNavigate("dashboard");
              setIsOpen(false);
            }}
            className="block w-full text-left px-6 py-3 hover:bg-blue-50 transition font-medium"
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              onNavigate("staff");
              setIsOpen(false);
            }}
            className="block w-full text-left px-6 py-3 hover:bg-blue-50 transition font-medium"
          >
            Staff Form
          </button>
          <button
            onClick={() => {
              onLogout();
              setIsOpen(false);
            }}
            className="block w-full text-left px-6 py-3 border-t border-gray-200 text-blue-500 hover:bg-blue-500 hover:text-white transition font-medium"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
