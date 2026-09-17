import React, { useState } from 'react';
import { ShieldCheckIcon, LockClosedIcon, UserIcon, MapPinIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const ReportForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    estate: '',
    isAnonymous: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:8000/reports/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: `Estate: ${formData.estate}\n\n${formData.description}\n\nAnonymous: ${formData.isAnonymous}`,
        }),
      });
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        console.error("Failed to submit report");
        alert("Failed to submit report. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Network error. Please make sure the backend is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto mt-10">
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-10 shadow-2xl shadow-primary-900/5 text-center border border-white/50">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheckIcon className="w-10 h-10 text-primary-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Report Received Securely</h2>
          <p className="text-slate-600 mb-8 text-lg leading-relaxed">
            Your report has been submitted to a trusted Justicore Case Officer. 
            {formData.isAnonymous ? " Your identity is hidden." : " They will contact you shortly through the secure channel."}
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-primary-600/30"
          >
            Submit Another Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Safe, Secure Reporting.
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          You are protected. Use this form to securely report an incident. Your data is encrypted and handled only by authorised Case Officers.
        </p>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-200/50 border border-white p-8 md:p-10 relative overflow-hidden">
        {/* Subtle decorative gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-100 to-transparent rounded-bl-full opacity-50 pointer-events-none"></div>

        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <ExclamationTriangleIcon className="w-4 h-4 text-slate-400" />
                Incident Title
              </label>
              <input 
                type="text" 
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="Brief summary of what happened"
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <MapPinIcon className="w-4 h-4 text-slate-400" />
                Estate / Location
              </label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 appearance-none"
                onChange={e => setFormData({...formData, estate: e.target.value})}
              >
                <option value="">Select an Estate...</option>
                <option value="estate_a">Kericho Estate Alpha</option>
                <option value="estate_b">Bomet Tea Estate</option>
                <option value="other">Other / Unknown</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Detailed Description</label>
            <textarea 
              required
              rows="5"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Please provide as much detail as you feel safe sharing..."
              onChange={e => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-100">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <LockClosedIcon className="w-6 h-6 text-primary-600" />
              </div>
              <div className="flex-1">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500 transition-colors"
                    onChange={e => setFormData({...formData, isAnonymous: e.target.checked})}
                  />
                  <span className="text-sm font-bold text-slate-800">Report Anonymously</span>
                </label>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  If selected, your identity will be stripped from this report. A secure PIN will be generated for you to check the status later via USSD. Note: Anonymity may limit the extent of investigation possible.
                </p>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-primary-500/30 transition-all duration-300 flex justify-center items-center group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                Submit Report Securely
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
