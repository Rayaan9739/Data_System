import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar({ onNavigate, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  return (
    <header>
      {/* Logo */}
      <div className="logo">
        <img src="/images/colleg.png" alt="Logo" className="w-8 h-8 object-contain" />
        <span>College Data System</span>
      </div>

      {/* Desktop Menu */}
      <nav className="desktop-menu">
        <button onClick={() => onNavigate("dashboard")}>Dashboard</button>
        <button onClick={() => onNavigate("staff")}>Staff Form</button>
        <button
          onClick={onLogout}
          className="border-2 border-blue-500 rounded-full px-3 py-1 hover:bg-blue-500 hover:text-white transition"
        >
          Logout
        </button>
      </nav>

      {/* Hamburger for Mobile */}
      <div className="hamburger" onClick={toggleMobileMenu}>
        {mobileOpen ? <HiX /> : <HiMenu />}
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? "active" : ""}`}>
        <button
          onClick={() => {
            onNavigate("dashboard");
            setMobileOpen(false);
          }}
        >
          Dashboard
        </button>
        <button
          onClick={() => {
            onNavigate("staff");
            setMobileOpen(false);
          }}
        >
          Staff Form
        </button>
        <button
          onClick={() => {
            onLogout();
            setMobileOpen(false);
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
