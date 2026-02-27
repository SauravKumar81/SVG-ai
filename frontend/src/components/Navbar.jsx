import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, User, Image, Compass, Settings, LogOut, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navItems = [
    { name: 'Generate', path: '/generate', icon: Sparkles },
    { name: 'Gallery', path: '/gallery', icon: Compass },
    { name: 'Pricing', path: '/pricing', icon: Image },
  ];

  return (
    <nav className="fixed w-full z-50 glass border-b border-white/5 top-0 transition-all duration-300 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.5)] transition-shadow">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-300 transition-all">
                SVG <span className="font-light">AI</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const active = isActive(item.path);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group flex items-center gap-2
                      ${active ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-cyan-400' : 'text-slate-500 group-hover:text-cyan-400'} transition-colors`} />
                    {item.name}
                    {active && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* User Profile Dropdown (simplified) */}
            <Link to="/dashboard" className="flex items-center gap-3 px-3 py-1.5 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-slate-400" />
              </div>
              <span className="text-sm font-medium text-slate-300 hidden sm:block">Saurav</span>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
