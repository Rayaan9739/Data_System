import React from "react";

export default function Navbar({ onNavigate, onLogout }) {
  return (
    <header className="fixed top-0 left-0 w-full px-4 py-3 bg-white shadow-md flex flex-col sm:flex-row items-center justify-between z-50">
      {/* Logo */}
      <div className="flex items-center space-x-3 mb-2 sm:mb-0">
        <span className="text-xl font-bold text-blue-900">College DB</span>
      </div>

      {/* Menu */}
      <nav className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 w-full sm:w-auto">
        <button
          onClick={() => onNavigate("dashboard")}
          className="text-gray-700 hover:text-blue-900 font-medium transition text-sm sm:text-base w-full sm:w-auto"
        >
          Dashboard
        </button>
        <button
          onClick={() => onNavigate("staff")}
          className="text-gray-700 hover:text-blue-900 font-medium transition text-sm sm:text-base w-full sm:w-auto"
        >
          Staff Form
        </button>
        <button
          onClick={onLogout}
          className="border-2 border-blue-500 text-blue-500 py-1 px-3 sm:py-1.5 sm:px-4 rounded-full hover:bg-blue-500 hover:text-white transition text-sm sm:text-base w-full sm:w-auto"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
