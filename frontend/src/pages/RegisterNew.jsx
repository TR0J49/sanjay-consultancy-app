import React, { useState } from 'react';
import { registerUser } from '../api';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    name: '',
    passportNumber: '',
    dateOfBirth: '',
    designation: '',
    ppType: '',
    mobileNumber: '',
    village: '',
    remark: '',
  });

  const [files, setFiles] = useState({
    photo: null,
    cv: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    if (fileList && fileList[0]) {
      setFiles((prev) => ({
        ...prev,
        [name]: fileList[0],
      }));
    }
  };

  const validateStep = () => {
    setError('');
    if (currentStep === 1) {
      if (!formData.name || !formData.passportNumber || !formData.dateOfBirth) {
        setError('Please fill all fields in this step');
        return false;
      }
    } else if (currentStep === 2) {
      if (!formData.designation || !formData.ppType || !formData.mobileNumber || !formData.village) {
        setError('Please fill all fields in this step');
        return false;
      }
    } else if (currentStep === 3) {
      if (!files.photo || !files.cv) {
        setError('Both photo and CV are required');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateStep()) return;

    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      data.append('photo', files.photo);
      data.append('cv', files.cv);

      await registerUser(data);
      setSuccess('✅ Registration successful! Redirecting...');
      setTimeout(() => {
        navigate('/register');
        window.location.reload();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
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

      <div className="max-w-3xl mx-auto relative z-10 py-12 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-3xl font-bold">SC</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Sanjay Consultancy
              </h1>
              <p className="text-sm text-gray-300">Passport & Visa Services</p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
          <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/50">
            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                User Registration
              </h2>
              <p className="text-gray-300">Step {currentStep} of {totalSteps}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-3">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`flex-1 h-2 mx-1 rounded-full transition ${
                      step <= currentStep
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600'
                        : 'bg-gray-600'
                    }`}
                  ></div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Personal</span>
                <span>Professional</span>
                <span>Documents</span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-300 rounded-xl flex items-center gap-3">
                <span className="text-xl">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 text-green-300 rounded-xl flex items-center gap-3">
                <span className="text-xl">✅</span>
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* STEP 1 */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-cyan-300 mb-4">📝 Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-cyan-500/30 rounded-lg bg-slate-700/50 text-white placeholder-gray-400 focus:bg-slate-700 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Passport Number *</label>
                      <input
                        type="text"
                        name="passportNumber"
                        value={formData.passportNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-cyan-500/30 rounded-lg bg-slate-700/50 text-white placeholder-gray-400 focus:bg-slate-700 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                        placeholder="Enter passport number"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth *</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-cyan-500/30 rounded-lg bg-slate-700/50 text-white focus:bg-slate-700 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-300 mb-4">💼 Professional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Designation *</label>
                      <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-blue-500/30 rounded-lg bg-slate-700/50 text-white placeholder-gray-400 focus:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="Enter your designation"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">PP Type *</label>
                      <input
                        type="text"
                        name="ppType"
                        value={formData.ppType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-blue-500/30 rounded-lg bg-slate-700/50 text-white placeholder-gray-400 focus:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="Enter PP type"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Mobile Number *</label>
                      <input
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-blue-500/30 rounded-lg bg-slate-700/50 text-white placeholder-gray-400 focus:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="Enter mobile number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Village/Town *</label>
                      <input
                        type="text"
                        name="village"
                        value={formData.village}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-blue-500/30 rounded-lg bg-slate-700/50 text-white placeholder-gray-400 focus:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="Enter village/town"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-purple-300 mb-4">📄 Documents & Remarks</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Remark</label>
                      <textarea
                        name="remark"
                        value={formData.remark}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-purple-500/30 rounded-lg bg-slate-700/50 text-white placeholder-gray-400 focus:bg-slate-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
                        placeholder="Enter any remarks (optional)"
                        rows="3"
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Photo (JPG/PNG) *</label>
                        <label className="flex items-center justify-center px-4 py-6 border border-purple-500/30 rounded-lg bg-slate-700/50 cursor-pointer hover:bg-slate-700 transition">
                          <div className="text-center">
                            <span className="text-2xl mb-2">📷</span>
                            <span className="text-sm text-gray-300">{files.photo ? files.photo.name : 'Choose photo'}</span>
                          </div>
                          <input
                            type="file"
                            name="photo"
                            accept="image/jpeg,image/png"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">CV (PDF/DOC/DOCX) *</label>
                        <label className="flex items-center justify-center px-4 py-6 border border-purple-500/30 rounded-lg bg-slate-700/50 cursor-pointer hover:bg-slate-700 transition">
                          <div className="text-center">
                            <span className="text-2xl mb-2">📄</span>
                            <span className="text-sm text-gray-300">{files.cv ? files.cv.name : 'Choose CV'}</span>
                          </div>
                          <input
                            type="file"
                            name="cv"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-6">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition transform hover:scale-105"
                  >
                    ← Previous
                  </button>
                )}
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition transform hover:scale-105"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold rounded-lg transition transform hover:scale-105"
                  >
                    {loading ? '⏳ Registering...' : '✓ Register'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
