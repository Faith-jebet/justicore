import React, { useState } from 'react';
import { ShieldCheckIcon, LockClosedIcon, MapPinIcon, ExclamationTriangleIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

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
      const response = await fetch('https://justicore-backend.onrender.com/reports/', {
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
      <div className="max-w-2xl mx-auto mt-20">
        <div className="bg-white/80 glass-panel rounded-[2rem] p-12 text-center shadow-2xl shadow-primary-500/10 border border-white">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm">
            <ShieldCheckIcon className="w-12 h-12 text-emerald-600" />
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Report Received Securely</h2>
          <p className="text-slate-600 mb-10 text-lg leading-relaxed font-medium">
            Your report has been submitted to a trusted Justicore Case Officer. 
            {formData.isAnonymous ? " Your identity is completely hidden." : " They will contact you shortly through the secure channel."}
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Submit Another Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-bold text-primary-700 bg-primary-100 rounded-full">
          <LockClosedIcon className="w-4 h-4 mr-2" />
          End-to-End Encrypted
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
          Safe, Secure <br />Reporting.
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
          You are protected. Use this form to securely report an incident. Your data is handled only by authorised Case Officers.
        </p>
      </div>

      <div className="bg-white/80 glass-panel rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-white p-8 md:p-12 relative overflow-visible">
        
        <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-extrabold text-slate-700 flex items-center gap-2">
                <ExclamationTriangleIcon className="w-5 h-5 text-primary-500" />
                Incident Title
              </label>
              <input 
                type="text" 
                required
                className="w-full bg-cream-dark/50 border border-slate-200 rounded-xl px-5 py-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all duration-200 shadow-sm"
                placeholder="Brief summary of what happened"
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-extrabold text-slate-700 flex items-center gap-2">
                <MapPinIcon className="w-5 h-5 text-primary-500" />
                Estate / Location
              </label>
              <input 
                type="text" 
                required
                className="w-full bg-cream-dark/50 border border-slate-200 rounded-xl px-5 py-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all duration-200 shadow-sm"
                placeholder="Start typing your county or estate..."
                onChange={e => setFormData({...formData, estate: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-extrabold text-slate-700">Detailed Description</label>
            <textarea 
              required
              rows="6"
              className="w-full bg-cream-dark/50 border border-slate-200 rounded-xl px-5 py-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all duration-200 resize-none shadow-sm"
              placeholder="Please provide as much detail as you feel safe sharing..."
              onChange={e => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <div className="bg-primary-50/50 rounded-2xl p-6 border border-primary-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-5">
              <div className="flex-shrink-0 mt-0.5">
                <LockClosedIcon className="w-7 h-7 text-primary-600" />
              </div>
              <div className="flex-1">
                <label className="flex items-center space-x-3 cursor-pointer mb-2">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      className="w-6 h-6 rounded-md border-slate-300 text-primary-600 focus:ring-primary-500 transition-colors cursor-pointer"
                      onChange={e => setFormData({...formData, isAnonymous: e.target.checked})}
                    />
                  </div>
                  <span className="text-base font-extrabold text-slate-900">Protect my identity (Report Anonymously)</span>
                </label>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  If selected, your name and contact details will be stripped from this report before it reaches the Case Officer. A secure PIN will be generated for you to check the status later.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-extrabold text-lg py-5 px-8 rounded-xl shadow-xl shadow-primary-500/20 hover:shadow-primary-500/40 hover-lift transition-all duration-300 flex justify-center items-center group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  Send Report
                  <PaperAirplaneIcon className="w-6 h-6 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
            <p className="text-center text-xs text-slate-400 font-bold mt-4">By sending this report, you agree to our secure data handling policy.</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
