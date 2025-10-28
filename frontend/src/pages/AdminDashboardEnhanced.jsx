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

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

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
    setError('');
    setLoading(true);
    try {
      const response = await getUserDetails(userId);
      setSelectedUser(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load user details');
      console.error('Error loading user details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCV = async (userId) => {
    setError('');
    try {
      const response = await downloadCV(userId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // Get file extension from response headers or default to .pdf
      const contentDisposition = response.headers['content-disposition'];
      let filename = `${selectedUser.name}-CV.pdf`;
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }
      
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to download CV');
      console.error('Error downloading CV:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Grid background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(6, 182, 212, .05) 25%, rgba(6, 182, 212, .05) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, .05) 75%, rgba(6, 182, 212, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(6, 182, 212, .05) 25%, rgba(6, 182, 212, .05) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, .05) 75%, rgba(6, 182, 212, .05) 76%, transparent 77%, transparent)',
        backgroundSize: '50px 50px'
      }}></div>

      <Navigation />

      <div className="max-w-7xl mx-auto relative z-10 py-12 px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            📊 Admin Dashboard
          </h1>
          <p className="text-gray-300 text-lg">Search and manage user registrations</p>
        </div>

        {/* Search Section */}
        <div className="group relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
          <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/50">
            <h2 className="text-2xl font-bold text-cyan-300 mb-6">🔍 Search Users</h2>
            <form onSubmit={handleSearch} className="flex gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or mobile number..."
                className="flex-1 px-4 py-3 border border-cyan-500/30 rounded-lg bg-slate-700/50 text-white placeholder-gray-400 focus:bg-slate-700 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold rounded-lg transition transform hover:scale-105"
              >
                {loading ? '⏳ Searching...' : '✓ Search'}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 text-red-300 rounded-xl flex items-center gap-3">
                <span className="text-xl">⚠️</span>
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* Results and Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search Results */}
          <div className="lg:col-span-1">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/50 h-full">
                <h3 className="text-lg font-bold text-cyan-300 mb-4">
                  📋 Results ({searchResults.length})
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {searchResults.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">No results to display</p>
                  ) : (
                    searchResults.map((user) => (
                      <button
                        key={user._id}
                        onClick={() => handleSelectUser(user._id)}
                        className={`w-full text-left p-4 rounded-lg transition transform hover:scale-105 ${
                          selectedUser?._id === user._id
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                            : 'bg-slate-700/50 hover:bg-slate-700 text-gray-300 border border-slate-600/50'
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
          </div>

          {/* User Details */}
          <div className="lg:col-span-2">
            {selectedUser ? (
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
                <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/50">
                  <h3 className="text-2xl font-bold text-blue-300 mb-6">👤 User Details</h3>

                  {/* Photo Preview */}
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-300 mb-3">📷 Photo</label>
                    {selectedUser.photoPath ? (
                      <div className="relative group/photo">
                        <img
                          src={`http://localhost:5000/uploads/photos/${selectedUser.photoPath}`}
                          alt="User Photo"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23374151" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="20" fill="%239CA3AF"%3EPhoto Not Available%3C/text%3E%3C/svg%3E';
                          }}
                          className="w-full h-64 object-cover rounded-lg border border-blue-500/30 hover:border-blue-500/100 transition"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-64 bg-slate-700/50 rounded-lg border border-blue-500/30 flex items-center justify-center">
                        <span className="text-gray-400">No photo available</span>
                      </div>
                    )}
                  </div>

                  {/* User Information Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-slate-700/30 p-4 rounded-lg border border-blue-500/20">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                      <p className="text-white font-semibold">{selectedUser.name}</p>
                    </div>

                    <div className="bg-slate-700/30 p-4 rounded-lg border border-blue-500/20">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Passport Number</label>
                      <p className="text-white font-semibold">{selectedUser.passportNumber}</p>
                    </div>

                    <div className="bg-slate-700/30 p-4 rounded-lg border border-blue-500/20">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Date of Birth</label>
                      <p className="text-white font-semibold">{new Date(selectedUser.dateOfBirth).toLocaleDateString()}</p>
                    </div>

                    <div className="bg-slate-700/30 p-4 rounded-lg border border-blue-500/20">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Designation</label>
                      <p className="text-white font-semibold">{selectedUser.designation}</p>
                    </div>

                    <div className="bg-slate-700/30 p-4 rounded-lg border border-blue-500/20">
                      <label className="block text-sm font-medium text-gray-400 mb-2">PP Type</label>
                      <p className="text-white font-semibold">{selectedUser.ppType}</p>
                    </div>

                    <div className="bg-slate-700/30 p-4 rounded-lg border border-blue-500/20">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Mobile Number</label>
                      <p className="text-white font-semibold">{selectedUser.mobileNumber}</p>
                    </div>

                    <div className="md:col-span-2 bg-slate-700/30 p-4 rounded-lg border border-blue-500/20">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Village/Town</label>
                      <p className="text-white font-semibold">{selectedUser.village}</p>
                    </div>

                    {selectedUser.remark && (
                      <div className="md:col-span-2 bg-slate-700/30 p-4 rounded-lg border border-blue-500/20">
                        <label className="block text-sm font-medium text-gray-400 mb-2">Remark</label>
                        <p className="text-white">{selectedUser.remark}</p>
                      </div>
                    )}
                  </div>

                  {/* Registration Date */}
                  <div className="mb-8 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 p-4 rounded-lg border border-cyan-500/20">
                    <label className="block text-sm font-medium text-gray-400 mb-2">📅 Registered On</label>
                    <p className="text-white font-semibold">{new Date(selectedUser.createdAt).toLocaleString()}</p>
                  </div>

                  {/* CV Download Button */}
                  <button
                    onClick={() => handleDownloadCV(selectedUser._id)}
                    className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-lg transition transform hover:scale-105 shadow-lg hover:shadow-green-500/50"
                  >
                    📥 Download CV
                  </button>
                </div>
              </div>
            ) : (
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-2xl p-12 border border-blue-500/50 text-center h-full flex items-center justify-center">
                  <div>
                    <p className="text-gray-400 text-lg mb-2">👈 Select a user from the results</p>
                    <p className="text-gray-500 text-sm">to view their complete details</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
