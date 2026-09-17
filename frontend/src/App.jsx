import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ReportForm from './components/ReportForm';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cream flex flex-col font-sans selection:bg-primary-500 selection:text-white relative overflow-hidden">
        
        {/* Soft Orange Glowing Background Orbs */}
        <div className="absolute top-0 -left-20 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 pointer-events-none"></div>

        {/* Navigation Bar */}
        <nav className="glass-panel sticky top-0 z-50 border-b border-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-[72px]">
              <div className="flex items-center space-x-3">
                {/* Logo Gradient Icon */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 shadow-lg shadow-primary-500/20 flex items-center justify-center text-white font-extrabold text-xl">
                  J
                </div>
                <Link to="/" className="text-2xl font-extrabold text-slate-800 tracking-tight">
                  Justi<span className="text-primary-600">core</span>
                </Link>
              </div>
              <div className="flex items-center space-x-8">
                <Link to="/" className="text-sm font-bold text-slate-500 hover:text-primary-600 transition-colors duration-200">
                  Report Incident
                </Link>
                <Link to="/login" className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold py-2.5 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-grow flex flex-col w-full relative z-10">
          <Routes>
            <Route path="/" element={<ReportForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
