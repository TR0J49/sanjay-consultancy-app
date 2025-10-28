import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../components/Navigation';

const AdminAuth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('All fields are required');
        setLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      const response = await axios.post('http://localhost:5000/api/admin/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      setSuccess('Registration successful! Please login with your credentials.');
      setTimeout(() => {
        setIsLogin(true);
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!formData.username || !formData.password) {
        setError('Username and password are required');
        setLoading(false);
        return;
      }

      const response = await axios.post('http://localhost:5000/api/admin/login', {
        username: formData.username,
        password: formData.password,
      });

      localStorage.setItem('adminToken', response.data.token);
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Grid background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(6, 182, 212, .05) 25%, rgba(6, 182, 212, .05) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, .05) 75%, rgba(6, 182, 212, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(6, 182, 212, .05) 25%, rgba(6, 182, 212, .05) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, .05) 75%, rgba(6, 182, 212, .05) 76%, transparent 77%, transparent)',
        backgroundSize: '50px 50px'
      }}></div>

      {/* Navigation */}
      <Navigation />

      <div className="min-h-screen flex items-center justify-center px-4 relative">
        <div className="w-full max-w-md relative z-10">
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-cyan-500/50">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block w-20 h-20 rounded-full overflow-hidden border-3 border-cyan-500/50 shadow-lg mb-4 flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900">
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
              {isLogin ? 'Admin Login' : 'Admin Registration'}
            </h1>
            <p className="text-gray-300">
              {isLogin ? 'Access your admin dashboard' : 'Create your admin account'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50/80 border border-red-300 text-red-700 rounded-xl flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50/80 border border-green-300 text-green-700 rounded-xl flex items-center gap-3">
              <span className="text-xl">✅</span>
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                👤 Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                placeholder="Enter username"
              />
            </div>

            {/* Email (Registration only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📧 Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="Enter email"
                />
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔑 Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                placeholder="Enter password"
              />
            </div>

            {/* Confirm Password (Registration only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ✓ Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="Confirm password"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105 mt-6"
            >
              {loading ? '⏳ Processing...' : isLogin ? '✓ Login' : '✓ Register'}
            </button>
          </form>

          {/* Toggle between Login and Register */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setSuccess('');
                  setFormData({ username: '', email: '', password: '', confirmPassword: '' });
                }}
                className="text-purple-600 hover:text-purple-700 font-semibold transition"
              >
                {isLogin ? 'Register' : 'Login'}
              </button>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <a href="/" className="text-gray-600 hover:text-gray-700 font-medium transition">
              ← Back to Home
            </a>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
