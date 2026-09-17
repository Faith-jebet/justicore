import React, { useState, useEffect } from 'react';
import { 
  ChartBarIcon, 
  DocumentTextIcon, 
  ExclamationCircleIcon,
  CheckBadgeIcon,
  ShieldCheckIcon
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
    { name: 'Active Cases', value: activeCases.toString(), icon: ExclamationCircleIcon, color: 'text-amber-500', bg: 'bg-amber-100' },
    { name: 'Reports Received', value: totalReports.toString(), icon: DocumentTextIcon, color: 'text-blue-500', bg: 'bg-blue-100' },
    { name: 'Resolved', value: resolvedCases.toString(), icon: CheckBadgeIcon, color: 'text-emerald-500', bg: 'bg-emerald-100' },
    { name: 'Resolution Rate', value: resolutionRate, icon: ChartBarIcon, color: 'text-indigo-500', bg: 'bg-indigo-100' },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Case Officer Dashboard</h1>
          <p className="text-slate-500 mt-1">Overview of recent reports and platform activity.</p>
        </div>
        <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg font-medium shadow-sm transition-colors text-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Export Data
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{stat.name}</p>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Cases List */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-lg text-slate-800">Recent Cases</h3>
            <button className="text-primary-600 text-sm font-semibold hover:text-primary-700">View All</button>
          </div>
          
          <div className="divide-y divide-slate-100 min-h-[300px]">
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : reports.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-slate-500">
                <DocumentTextIcon className="w-10 h-10 mb-2 opacity-50" />
                <p>No reports received yet.</p>
              </div>
            ) : (
              reports.map((c) => (
                <div key={c.id} className="px-6 py-5 hover:bg-slate-50 transition-colors cursor-pointer group flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-medium text-xs group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                      {c.id}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 group-hover:text-primary-700 transition-colors truncate max-w-sm">
                        {c.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        ID: REP-{c.id.toString().padStart(3, '0')} • {new Date(c.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${c.status === 'resolved' || c.status === 'closed' ? 'bg-emerald-100 text-emerald-700' : 
                        c.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : 
                        'bg-amber-100 text-amber-700'}`}>
                      {c.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Action Panel */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl h-fit">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-10 translate-x-10 pointer-events-none"></div>
          
          <h3 className="text-xl font-bold mb-2">Quick Actions</h3>
          <p className="text-slate-400 text-sm mb-8">Manage the platform and coordinate responses.</p>
          
          <div className="space-y-3">
            <button className="w-full bg-white/10 hover:bg-white/20 border border-white/10 text-left px-5 py-4 rounded-xl transition-colors flex items-center gap-3">
              <div className="p-2 bg-primary-500 rounded-lg">
                <DocumentTextIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-sm">Assign Triage</div>
                <div className="text-xs text-slate-400">{activeCases} unassigned reports</div>
              </div>
            </button>
            
            <button className="w-full bg-white/10 hover:bg-white/20 border border-white/10 text-left px-5 py-4 rounded-xl transition-colors flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <ShieldCheckIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-sm">Corporate Portal</div>
                <div className="text-xs text-slate-400">View partner responses</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
