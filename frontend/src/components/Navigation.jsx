import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = localStorage.getItem('adminToken');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-cyan-500/30 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Company Name */}
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition"
        >
          {/* Circular Logo Container */}
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-500/50 shadow-lg hover:shadow-cyan-500/50 transition flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
            <img
              src="/logo.png"
              alt="Sanjay Consultancy Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="48" fill="none" stroke="#0891b2" strokeWidth="1" opacity="0.3"/><path d="M 35 30 Q 40 25 45 30 Q 50 35 45 40 Q 40 45 35 50 Q 30 55 35 60 Q 40 65 45 70" fill="none" stroke="#0891b2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M 50 30 Q 55 25 60 30 Q 65 35 60 40 Q 55 45 50 50 Q 45 55 50 60 Q 55 65 60 70" fill="none" stroke="#e5e7eb" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>';
              }}
            />
          </div>

          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Sanjay
            </h1>
            <p className="text-xs text-gray-400">Consultancy</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="/"
            className={`px-4 py-2 rounded-lg transition ${
              isActive('/')
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                : 'text-gray-300 hover:text-cyan-400'
            }`}
          >
            🏠 Home
          </a>

          <a
            href="/register"
            className={`px-4 py-2 rounded-lg transition ${
              isActive('/register')
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                : 'text-gray-300 hover:text-cyan-400'
            }`}
          >
            📝 Register
          </a>

          {token ? (
            <>
              <a
                href="/admin/dashboard"
                className={`px-4 py-2 rounded-lg transition ${
                  isActive('/admin/dashboard')
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                    : 'text-gray-300 hover:text-cyan-400'
                }`}
              >
                📊 Dashboard
              </a>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition transform hover:scale-105"
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/admin')}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition transform hover:scale-105"
            >
              🔐 Admin
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-cyan-400 hover:text-cyan-300 transition"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800/95 border-t border-cyan-500/30 p-4 space-y-3">
          <a
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="block px-4 py-2 text-gray-300 hover:text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition"
          >
            🏠 Home
          </a>
          <a
            href="/register"
            onClick={() => setIsMenuOpen(false)}
            className="block px-4 py-2 text-gray-300 hover:text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition"
          >
            📝 Register
          </a>
          {token ? (
            <>
              <a
                href="/admin/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-gray-300 hover:text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition"
              >
                📊 Dashboard
              </a>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                navigate('/admin');
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition"
            >
              🔐 Admin
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
