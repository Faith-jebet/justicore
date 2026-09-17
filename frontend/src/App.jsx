import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ReportForm from './components/ReportForm';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-primary-500 selection:text-white">
        {/* Navigation Bar */}
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center space-x-3">
                {/* Logo Gradient Icon */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 shadow-lg shadow-primary-500/30 flex items-center justify-center text-white font-bold text-xl">
                  J
                </div>
                <Link to="/" className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-700 to-slate-800">
                  Justicore
                </Link>
              </div>
              <div className="flex items-center space-x-6">
                <Link to="/" className="text-sm font-semibold text-slate-600 hover:text-primary-600 transition-colors duration-200">
                  Report Incident
                </Link>
                <Link to="/dashboard" className="text-sm font-semibold text-slate-600 hover:text-primary-600 transition-colors duration-200">
                  Dashboard
                </Link>
                <button className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-2 px-5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 relative">
          {/* Decorative background blob */}
          <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pointer-events-none"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div>

          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<ReportForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
