import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-5"></div>
      </div>

      {/* Grid background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(6, 182, 212, .05) 25%, rgba(6, 182, 212, .05) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, .05) 75%, rgba(6, 182, 212, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(6, 182, 212, .05) 25%, rgba(6, 182, 212, .05) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, .05) 75%, rgba(6, 182, 212, .05) 76%, transparent 77%, transparent)',
        backgroundSize: '50px 50px'
      }}></div>

      {/* Navigation */}
      <Navigation />
      

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 pt-8">
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Sanjay Consultancy
          </h2>
          <p className="text-2xl text-cyan-300 mb-4 font-semibold">
            Your Gateway to Global Opportunities
          </p>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Professional passport and visa services with cutting-edge technology and expert consultation for travelers worldwide.
          </p>
        </div>

        {/* CTA Section */}
        <div className="relative group mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
          <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-2xl p-12 border border-cyan-500/50 text-center">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
              Ready to Get Started?
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              Register now and begin your passport application process with us.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-lg rounded-lg transition transform hover:scale-105 shadow-lg hover:shadow-cyan-500/50"
              >
                👤 User Registration
              </button>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Service 1 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/30 group-hover:border-cyan-500/100 transition">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-cyan-300 mb-3">Passport Services</h3>
              <p className="text-gray-400">
                Complete passport application assistance and document verification services.
              </p>
            </div>
          </div>

          {/* Service 2 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/30 group-hover:border-blue-500/100 transition">
              <div className="text-5xl mb-4">✈️</div>
              <h3 className="text-xl font-bold text-blue-300 mb-3">Visa Consultation</h3>
              <p className="text-gray-400">
                Expert guidance for visa applications to multiple countries.
              </p>
            </div>
          </div>

          {/* Service 3 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-600 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30 group-hover:border-purple-500/100 transition">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-purple-300 mb-3">Online Registration</h3>
              <p className="text-gray-400">
                Easy online registration and document submission process.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="relative border-t border-cyan-500/30 mt-20 py-8 bg-gradient-to-r from-slate-900/50 via-slate-800/50 to-slate-900/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-300 font-semibold">&copy; 2025 Sanjay Consultancy. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-2">Professional Passport & Visa Services | Powered by Advanced Technology</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
