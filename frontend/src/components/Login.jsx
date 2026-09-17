import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/24/outline';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="flex w-full min-h-[calc(100vh-72px)] bg-cream">
      {/* Left Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md bg-white/70 glass-panel rounded-3xl p-10 shadow-2xl shadow-slate-200/50">
          
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Case Officer Portal</h1>
            <p className="text-slate-500 mt-2 font-medium">Securely access Justicore workspace.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Officer ID</label>
              <input 
                type="text" 
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your assigned ID"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Security Passcode</label>
              <input 
                type="password" 
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500 transition-colors" />
                <span className="text-sm font-bold text-slate-600">Remember device</span>
              </label>
              <a href="#" className="text-sm font-bold text-primary-600 hover:text-primary-700">Forgot Passcode?</a>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex justify-center items-center group disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  <LockClosedIcon className="w-5 h-5 mr-2" />
                  Authenticate
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right Image Side */}
      <div className="hidden lg:block w-1/2 relative bg-slate-900 overflow-hidden">
        <img 
          src="/tea_estate_login.jpg" 
          alt="Tea Estate Sunrise" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
        <div className="absolute inset-0 bg-primary-900/30 mix-blend-multiply"></div>
        
        <div className="absolute bottom-16 left-16 max-w-lg">
          <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Protecting every voice in the estate.
          </h2>
          <p className="text-primary-100/80 text-lg font-medium leading-relaxed">
            The Justicore platform secures worker identities and streamlines the accountability pipeline for managers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
