import React, { useState, useEffect } from 'react';
import { 
  ChartBarIcon, 
  DocumentTextIcon, 
  ExclamationCircleIcon,
  CheckBadgeIcon,
  ShieldCheckIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('http://localhost:8000/reports/');
        if (response.ok) {
          const data = await response.json();
          setReports(data.reverse()); // Show newest first
        }
      } catch (error) {
        console.error("Failed to fetch reports", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  // Calculate dynamic stats
  const totalReports = reports.length;
  const activeCases = reports.filter(r => r.status !== 'closed' && r.status !== 'resolved').length;
  const resolvedCases = reports.filter(r => r.status === 'resolved').length;
  const resolutionRate = totalReports === 0 ? '0%' : `${Math.round((resolvedCases / totalReports) * 100)}%`;

  const stats = [
    { name: 'Active Cases', value: activeCases.toString(), icon: ExclamationCircleIcon, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-100' },
    { name: 'Reports Received', value: totalReports.toString(), icon: DocumentTextIcon, color: 'text-primary-600', bg: 'bg-primary-50', border: 'border-primary-100' },
    { name: 'Resolved', value: resolvedCases.toString(), icon: CheckBadgeIcon, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { name: 'Resolution Rate', value: resolutionRate, icon: ChartBarIcon, color: 'text-indigo-500', bg: 'bg-indigo-50', border: 'border-indigo-100' },
  ];

  return (
    <div className="w-full py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Case Officer Dashboard</h1>
          <p className="text-slate-500 mt-2 font-medium text-lg">Overview of recent reports and platform activity.</p>
        </div>
        <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-primary-600 hover:border-primary-200 px-5 py-2.5 rounded-xl font-bold shadow-sm transition-all text-sm flex items-center gap-2 hover-lift">
          <ArrowDownTrayIcon className="w-4 h-4" />
          Export Data
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white/80 glass-panel rounded-2xl p-6 border border-white shadow-xl shadow-slate-200/40 hover-lift">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-extrabold text-slate-500 mb-2 uppercase tracking-wider">{stat.name}</p>
                <p className="text-4xl font-extrabold text-slate-900">{stat.value}</p>
              </div>
              <div className={`p-4 rounded-xl border ${stat.bg} ${stat.border}`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Cases List */}
        <div className="lg:col-span-2 bg-white/80 glass-panel rounded-3xl border border-white shadow-xl shadow-slate-200/40 overflow-hidden flex flex-col">
          <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white/50">
            <h3 className="font-extrabold text-xl text-slate-900">Recent Cases</h3>
            <button className="text-primary-600 text-sm font-bold hover:text-primary-700 bg-primary-50 px-4 py-2 rounded-lg hover:bg-primary-100 transition-colors">View All</button>
          </div>
          
          <div className="divide-y divide-slate-100 flex-grow min-h-[400px]">
            {loading ? (
              <div className="flex justify-center items-center h-full min-h-[300px]">
                <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-primary-600"></div>
              </div>
            ) : reports.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-slate-500">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
                  <DocumentTextIcon className="w-8 h-8 opacity-50" />
                </div>
                <p className="font-bold">No reports received yet.</p>
              </div>
            ) : (
              reports.map((c) => (
                <div key={c.id} className="px-8 py-6 hover:bg-primary-50/50 transition-colors cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-cream-dark border border-slate-100 flex items-center justify-center text-slate-600 font-extrabold text-sm group-hover:bg-primary-100 group-hover:text-primary-700 group-hover:border-primary-200 transition-all shadow-sm">
                      {c.id}
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900 group-hover:text-primary-700 transition-colors truncate max-w-sm">
                        {c.title}
                      </h4>
                      <p className="text-sm text-slate-500 mt-1 font-medium">
                        ID: REP-{c.id.toString().padStart(3, '0')} • {new Date(c.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wide uppercase border
                      ${c.status === 'resolved' || c.status === 'closed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                        c.status === 'in_progress' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                        'bg-amber-50 text-amber-700 border-amber-200'}`}>
                      {c.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Action Panel */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl h-fit">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 opacity-20 rounded-full filter blur-[80px] -translate-y-20 translate-x-20 pointer-events-none"></div>
          
          <h3 className="text-2xl font-extrabold mb-3 relative z-10">Quick Actions</h3>
          <p className="text-slate-400 text-sm mb-8 font-medium relative z-10">Manage the platform and coordinate responses.</p>
          
          <div className="space-y-4 relative z-10">
            <button className="w-full bg-white/10 hover:bg-white/20 border border-white/10 text-left px-6 py-5 rounded-2xl transition-all flex items-center gap-4 group">
              <div className="p-3 bg-primary-500 rounded-xl group-hover:scale-110 transition-transform shadow-lg shadow-primary-500/30">
                <DocumentTextIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-base">Assign Triage</div>
                <div className="text-sm text-slate-400 mt-0.5">{activeCases} unassigned reports</div>
              </div>
            </button>
            
            <button className="w-full bg-white/10 hover:bg-white/20 border border-white/10 text-left px-6 py-5 rounded-2xl transition-all flex items-center gap-4 group">
              <div className="p-3 bg-blue-500 rounded-xl group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/30">
                <ShieldCheckIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-base">Corporate Portal</div>
                <div className="text-sm text-slate-400 mt-0.5">View partner responses</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
