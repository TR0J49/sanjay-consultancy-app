import React, { useState } from 'react';
import { adminLogin } from '../api';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await adminLogin(credentials.username, credentials.password);
      localStorage.setItem('adminToken', response.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-lg mb-4">
              <span className="text-white text-2xl">🔐</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Admin Portal
            </h1>
            <p className="text-gray-600">Secure access to dashboard</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50/80 border border-red-300 text-red-700 rounded-xl flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                👤 Username
              </label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                placeholder="Enter username"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔑 Password
              </label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                placeholder="Enter password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105 mt-6"
            >
              {loading ? '⏳ Logging in...' : '✓ Login'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl">
            <p className="text-sm text-gray-700 font-semibold mb-3 flex items-center gap-2">
              <span>💡</span> Demo Credentials
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Username:</span> <span className="font-mono bg-white px-2 py-1 rounded">Kuldeep R</span>
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Password:</span> <span className="font-mono bg-white px-2 py-1 rounded">kuldeep@123</span>
              </p>
            </div>
          </div>

          {/* Back to Register */}
          <div className="mt-6 text-center">
            <a href="/register" className="text-purple-600 hover:text-purple-700 font-medium transition flex items-center justify-center gap-2">
              ← Back to Registration
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
