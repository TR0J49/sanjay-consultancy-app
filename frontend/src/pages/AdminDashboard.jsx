import React, { useState } from 'react';
import { searchUsers, getUserDetails, downloadCV } from '../api';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSelectedUser(null);

    try {
      if (!searchQuery.trim()) {
        setError('Please enter a name or mobile number');
        setLoading(false);
        return;
      }

      const response = await searchUsers(searchQuery);
      setSearchResults(response.data);

      if (response.data.length === 0) {
        setError('No users found');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectUser = async (userId) => {
    try {
      const response = await getUserDetails(userId);
      console.log('User details:', response.data);
      console.log('Photo path:', response.data.photoPath);
      setSelectedUser(response.data);
    } catch (err) {
      console.error('Error loading user details:', err);
      setError('Failed to load user details');
    }
  };

  const handleDownloadCV = async (userId) => {
    try {
      const response = await downloadCV(userId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${selectedUser.name}-CV.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      setError('Failed to download CV');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Grid background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(6, 182, 212, .05) 25%, rgba(6, 182, 212, .05) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, .05) 75%, rgba(6, 182, 212, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(6, 182, 212, .05) 25%, rgba(6, 182, 212, .05) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, .05) 75%, rgba(6, 182, 212, .05) 76%, transparent 77%, transparent)',
        backgroundSize: '50px 50px'
      }}></div>

      {/* Navigation */}
      <Navigation />

      <div className="max-w-6xl mx-auto relative z-10 py-12 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            📊 Admin Dashboard
          </h1>
          <p className="text-gray-300">Manage and search user records</p>
        </div>

        {/* Search Section */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 mb-8 border border-white/20">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            🔍 Search Users
          </h2>
          <form onSubmit={handleSearch} className="flex gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or mobile number..."
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 px-8 rounded-lg transition transform hover:scale-105"
            >
              {loading ? '⏳ Searching...' : '✓ Search'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50/80 border border-red-300 text-red-700 rounded-xl flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search Results */}
          <div className="lg:col-span-1">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/20">
              <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                📋 Results ({searchResults.length})
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {searchResults.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-8">No results to display</p>
                ) : (
                  searchResults.map((user) => (
                    <button
                      key={user._id}
                      onClick={() => handleSelectUser(user._id)}
                      className={`w-full text-left p-3 rounded-lg transition transform hover:scale-105 ${
                        selectedUser?._id === user._id
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                    >
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm opacity-75">{user.mobileNumber}</p>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* User Details */}
          <div className="lg:col-span-2">
            {selectedUser ? (
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
                  👤 User Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Photo Preview */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Photo
                    </label>
                    {selectedUser.photoPath ? (
                      <>
                        <img
                          src={`http://localhost:5000/uploads/photos/${selectedUser.photoPath}`}
                          alt="User Photo"
                          onLoad={() => {
                            console.log('✅ Photo loaded successfully:', selectedUser.photoPath);
                          }}
                          onError={(e) => {
                            console.error('❌ Photo load error:', selectedUser.photoPath);
                            console.error('URL attempted:', `http://localhost:5000/uploads/photos/${selectedUser.photoPath}`);
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="20" fill="%23999"%3EPhoto Not Found%3C/text%3E%3C/svg%3E';
                          }}
                          className="w-full h-64 object-cover rounded-lg border border-gray-300"
                        />
                        <p className="text-xs text-gray-500 mt-2">Path: {selectedUser.photoPath}</p>
                      </>
                    ) : (
                      <div className="w-full h-64 bg-gray-200 rounded-lg border border-gray-300 flex items-center justify-center">
                        <span className="text-gray-500">No photo available</span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="text-gray-800 mb-4">{selectedUser.name}</p>

                    <label className="block text-sm font-medium text-gray-700">Passport No.</label>
                    <p className="text-gray-800 mb-4">{selectedUser.passportNumber}</p>

                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <p className="text-gray-800 mb-4">
                      {new Date(selectedUser.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Designation</label>
                    <p className="text-gray-800 mb-4">{selectedUser.designation}</p>

                    <label className="block text-sm font-medium text-gray-700">PP Type</label>
                    <p className="text-gray-800 mb-4">{selectedUser.ppType}</p>

                    <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                    <p className="text-gray-800 mb-4">{selectedUser.mobileNumber}</p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Village/Town</label>
                    <p className="text-gray-800 mb-4">{selectedUser.village}</p>

                    <label className="block text-sm font-medium text-gray-700">Remark</label>
                    <p className="text-gray-800 mb-4">{selectedUser.remark || 'N/A'}</p>
                  </div>

                  {/* CV Download */}
                  <div className="md:col-span-2">
                    <button
                      onClick={() => handleDownloadCV(selectedUser._id)}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105"
                    >
                      📥 Download CV
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/20 text-center">
                <p className="text-gray-500 text-lg">Select a user from the results to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
