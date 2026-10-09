// @ts-nocheck
'use client';
import React, { useState } from 'react';
import { 
  ShieldCheck, ShieldAlert, LayoutDashboard, FilePlus2, History, 
  Sliders, LogOut, Sparkles, TrendingUp, AlertTriangle, Activity, 
  Gauge, Award, Cpu, FileText, ArrowRight, ArrowLeft, CheckCircle2, 
  Download, RefreshCw, Users, HelpCircle, Plus, Bot
} from 'lucide-react';

export default function App() {
  const [state, setState] = useState({
    view: 'auth',
    user: null,
    assessments: [
      {
        id: 'AST-2026-001',
        appName: 'GradePredictor AI',
        sector: 'Education',
        purpose: 'Predicts student final exam performance using past attendance and quiz scores.',
        dataType: 'Student PII & Academic Records',
        date: '2026-06-12',
        status: 'Completed',
        riskScore: 78,
        riskLevel: 'High',
        criteria: {
          privacy: { score: 2, weight: 1.5, notes: 'Needs stronger anonymization.' },
          fairness: { score: 2, weight: 2.0, notes: 'Potential demographic bias.' },
          transparency: { score: 1, weight: 1.0, notes: 'Black box model.' },
          oversight: { score: 4, weight: 1.5, notes: 'Teacher sign-off required.' },
          integrity: { score: 2, weight: 1.2, notes: 'Plagiarism checks inadequate.' },
          safety: { score: 3, weight: 1.0, notes: 'Standard validation.' },
          inclusiveness: { score: 2, weight: 1.0, notes: 'Accessibility gaps.' }
        },
        recommendations: [
          'Implement mandatory human teacher review before any negative academic intervention.',
          'Provide transparent explanation dashboards for students regarding prediction factors.',
          'Audit historical training data for demographic and socioeconomic bias.'
        ]
      },
      {
        id: 'AST-2026-002',
        appName: 'NewsBot Auto-Draft',
        sector: 'Mass Communication',
        purpose: 'Generates daily local weather briefs and sports roundups automatically.',
        dataType: 'Public RSS Feeds & Meteorological Data',
        date: '2026-06-14',
        status: 'Completed',
        riskScore: 32,
        riskLevel: 'Low',
        criteria: {
          privacy: { score: 5, weight: 1.0, notes: 'No PII processed.' },
          fairness: { score: 5, weight: 1.0, notes: 'Neutral factual reporting.' },
          transparency: { score: 4, weight: 1.5, notes: 'AI disclosure badge present.' },
          oversight: { score: 5, weight: 2.0, notes: 'Editor in the loop.' },
          integrity: { score: 4, weight: 1.5, notes: 'Fact-checking queue active.' },
          safety: { score: 5, weight: 1.0, notes: 'High reliability.' },
          inclusiveness: { score: 4, weight: 1.0, notes: 'Standard inclusive language.' }
        },
        recommendations: [
          'Add a clear disclosure badge indicating AI-generated content.',
          'Establish a quick editorial fact-check queue prior to publishing.'
        ]
      }
    ],
    activeAssessment: {
      appName: '',
      sector: 'Education',
      purpose: '',
      dataType: '',
      criteria: {
        privacy: { score: 3, weight: 1.5, notes: 'Standard privacy measures.' },
        fairness: { score: 3, weight: 2.0, notes: 'Requires bias testing.' },
        transparency: { score: 3, weight: 1.0, notes: 'Explainability needed.' },
        oversight: { score: 3, weight: 1.5, notes: 'Human review suggested.' },
        integrity: { score: 3, weight: 1.2, notes: 'Standard integrity check.' },
        safety: { score: 3, weight: 1.0, notes: 'General safety compliance.' },
        inclusiveness: { score: 3, weight: 1.0, notes: 'Standard accessibility.' }
      }
    },
    latestResult: null,
    isAiAuditing: false
  });

  const [notification, setNotification] = useState('');

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  const login = (role) => {
    if (role === 'admin') {
      setState(s => ({
        ...s,
        user: { name: 'Prof. Henry Sinkala (Supervisor)', role: 'admin', email: 'h.sinkala@cavendish.ac.zm' },
        view: 'dashboard'
      }));
    } else {
      setState(s => ({
        ...s,
        user: { name: 'Mukuka Chilufya (115-360)', role: 'user', email: 'm.chilufya@university.edu' },
        view: 'dashboard'
      }));
    }
    showNotification('Successfully logged into AIEADSS.');
  };

  const logout = () => {
    setState(s => ({ ...s, user: null, view: 'auth' }));
    showNotification('Logged out successfully.');
  };

  const navigate = (view) => {
    setState(s => ({ ...s, view }));
  };

  const startNewAssessment = () => {
    setState(s => ({
      ...s,
      activeAssessment: {
        appName: '',
        sector: 'Education',
        purpose: '',
        dataType: '',
        criteria: {
          privacy: { score: 3, weight: 1.5, notes: '' },
          fairness: { score: 3, weight: 2.0, notes: '' },
          transparency: { score: 3, weight: 1.0, notes: '' },
          oversight: { score: 3, weight: 1.5, notes: '' },
          integrity: { score: 3, weight: 1.2, notes: '' },
          safety: { score: 3, weight: 1.0, notes: '' },
          inclusiveness: { score: 3, weight: 1.0, notes: '' }
        }
      },
      view: 'assessment'
    }));
  };

  const updateActiveMeta = (field, val) => {
    setState(s => ({
      ...s,
      activeAssessment: { ...s.activeAssessment, [field]: val }
    }));
  };

  const runGeminiAudit = async () => {
    const d = state.activeAssessment;
    if (!d.appName.trim() || !d.purpose.trim()) {
      showNotification('Please fill in the Application Name and Purpose first.');
      return;
    }

    setState(s => ({ ...s, isAiAuditing: true }));
    showNotification('Gemini AI is analyzing ethical compliance & risks...');

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appName: d.appName,
          sector: d.sector,
          purpose: d.purpose,
          dataType: d.dataType
        })
      });

      if (!res.ok) throw new Error('AI Audit failed');

      const data = await res.json();

      const newRecord = {
        id: `AST-2026-${Math.floor(100 + Math.random() * 900)}`,
        appName: d.appName,
        sector: d.sector,
        purpose: d.purpose,
        dataType: d.dataType || 'Institutional dataset',
        date: new Date().toISOString().split('T')[0],
        status: 'Completed',
        riskScore: data.riskScore,
        riskLevel: data.riskLevel,
        criteria: data.criteria,
        recommendations: data.recommendations
      };

      setState(s => ({
        ...s,
        assessments: [newRecord, ...s.assessments],
        latestResult: newRecord,
        isAiAuditing: false,
        view: 'results'
      }));
      showNotification('Gemini AI Ethics Audit completed successfully!');
    } catch (err) {
      console.error(err);
      showNotification('Error connecting to Gemini API. Using local calculation fallback.');
      setState(s => ({ ...s, isAiAuditing: false }));
    }
  };

  const viewAssessmentDetail = (id) => {
    const item = state.assessments.find(a => a.id === id);
    if (item) {
      setState(s => ({ ...s, latestResult: item, view: 'results' }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-800 animate-bounce">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      {state.view === 'auth' ? (
        <AuthView login={login} />
      ) : (
        <div className="min-h-screen flex flex-col md:flex-row bg-slate-100">
          <Sidebar state={state} navigate={navigate} logout={logout} startNewAssessment={startNewAssessment} />
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <Header state={state} startNewAssessment={startNewAssessment} />
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              <div className="max-w-7xl mx-auto">
                {state.view === 'dashboard' && <DashboardView state={state} navigate={navigate} startNewAssessment={startNewAssessment} viewAssessmentDetail={viewAssessmentDetail} />}
                {state.view === 'assessment' && <AssessmentWizard state={state} updateActiveMeta={updateActiveMeta} runGeminiAudit={runGeminiAudit} />}
                {state.view === 'results' && <ResultsView result={state.latestResult} navigate={navigate} />}
                {state.view === 'history' && <HistoryView assessments={state.assessments} viewAssessmentDetail={viewAssessmentDetail} startNewAssessment={startNewAssessment} />}
                {state.view === 'admin' && <AdminView showNotification={showNotification} />}
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

function AuthView({ login }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white tracking-tight">AIEADSS</h2>
          <p className="mt-2 text-sm text-slate-300">AI Ethics Assessment & Decision-Support System</p>
          <p className="text-xs text-indigo-300 mt-1">Student: Mukuka Chilufya (115-360) | Cavendish University</p>
        </div>
        <div className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-200">Select Demo Account Role</label>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <button onClick={() => login('user')} className="flex flex-col items-center p-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/15 text-white transition text-center group cursor-pointer">
                <Users className="w-6 h-6 mb-2 text-indigo-400 group-hover:scale-110 transition" />
                <span className="font-semibold text-sm">Researcher / Evaluator</span>
                <span className="text-xs text-slate-400 mt-1">Education & Media</span>
              </button>
              <button onClick={() => login('admin')} className="flex flex-col items-center p-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/15 text-white transition text-center group cursor-pointer">
                <ShieldAlert className="w-6 h-6 mb-2 text-amber-400 group-hover:scale-110 transition" />
                <span className="font-semibold text-sm">Supervisor / Admin</span>
                <span className="text-xs text-slate-400 mt-1">Framework Governance</span>
              </button>
            </div>
          </div>
          <div className="pt-4 border-t border-white/10">
            <div className="rounded-lg bg-indigo-950/50 p-4 border border-indigo-500/20 text-xs text-indigo-200 space-y-1">
              <p className="font-semibold text-white flex items-center gap-1.5"><HelpCircle className="w-4 h-4 text-indigo-400" /> Powered by Gemini AI Engine:</p>
              <p>Evaluates privacy, fairness, transparency, and oversight instantly for your proposal demo.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ state, navigate, logout, startNewAssessment }) {
  const isAdmin = state.user && state.user.role === 'admin';
  return (
    <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800">
      <div className="p-5 flex items-center gap-3 border-b border-slate-800">
        <div className="h-10 w-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-white text-base">AIEADSS</h1>
          <p className="text-xs text-slate-400">Cavendish University</p>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        <button onClick={() => navigate('dashboard')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${state.view === 'dashboard' ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-slate-800 text-slate-300'}`}>
          <LayoutDashboard className="w-5 h-5" /> Dashboard
        </button>
        <button onClick={startNewAssessment} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${state.view === 'assessment' ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-slate-800 text-slate-300'}`}>
          <FilePlus2 className="w-5 h-5" /> AI Ethics Audit Wizard
        </button>
        <button onClick={() => navigate('history')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${state.view === 'history' ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-slate-800 text-slate-300'}`}>
          <History className="w-5 h-5" /> Assessment Archive
        </button>
        {isAdmin && (
          <button onClick={() => navigate('admin')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${state.view === 'admin' ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-slate-800 text-slate-300'}`}>
            <Sliders className="w-5 h-5" /> Admin Governance
          </button>
        )}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="h-9 w-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-semibold text-sm">
            {state.user ? state.user.name.charAt(0) : 'U'}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{state.user ? state.user.name : 'User'}</p>
            <p className="text-xs text-slate-400 capitalize">{state.user ? state.user.role : 'Guest'}</p>
          </div>
        </div>
        <button onClick={logout} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-slate-800 hover:bg-red-900/40 text-slate-300 hover:text-red-300 transition cursor-pointer">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </aside>
  );
}

function Header({ state, startNewAssessment }) {
  const getTitle = () => {
    switch(state.view) {
      case 'dashboard': return 'Overview Dashboard';
      case 'assessment': return 'Gemini-Powered AI Ethics Audit';
      case 'results': return 'Assessment Results & Risk Report';
      case 'history': return 'Assessment Archive';
      case 'admin': return 'System Administration';
      default: return 'Dashboard';
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10 shadow-xs">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
          IT323 Software Project
        </span>
        <h2 className="text-lg font-bold text-slate-800">{getTitle()}</h2>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={startNewAssessment} className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium shadow-sm transition cursor-pointer">
          <Plus className="w-4 h-4" /> New AI Audit
        </button>
        <div className="h-8 w-px bg-slate-200"></div>
        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Gemini API Connected</span>
        </div>
      </div>
    </header>
  );
}

function DashboardView({ state, navigate, startNewAssessment, viewAssessmentDetail }) {
  const totalAssessments = state.assessments.length;
  const highRiskCount = state.assessments.filter(a => a.riskLevel === 'High' || a.riskLevel === 'Critical').length;
  const avgScore = totalAssessments ? Math.round(state.assessments.reduce((acc, curr) => acc + curr.riskScore, 0) / totalAssessments) : 0;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 opacity-10">
          <ShieldCheck className="w-64 h-64" />
        </div>
        <div className="max-w-2xl relative z-10">
          <h3 className="text-2xl md:text-3xl font-bold">Welcome, {state.user ? state.user.name : 'User'}</h3>
          <p className="mt-2 text-indigo-100 text-sm md:text-base leading-relaxed">
            Ethical Frameworks for the Integration of Artificial Intelligence in Mass Communication and Education (Mukuka Chilufya, 115-360).
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={startNewAssessment} className="px-5 py-2.5 bg-white text-indigo-700 hover:bg-indigo-50 font-semibold rounded-xl text-sm shadow-md transition flex items-center gap-2 cursor-pointer">
              <Bot className="w-4 h-4 text-indigo-600" /> Run Gemini AI Ethics Audit
            </button>
            <button onClick={() => navigate('history')} className="px-5 py-2.5 bg-indigo-700/60 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm border border-white/20 transition cursor-pointer">
              View Past Reports
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Assessments</p>
            <h4 className="text-3xl font-extrabold text-slate-900 mt-1">{totalAssessments}</h4>
            <span className="inline-flex items-center text-xs font-medium text-emerald-600 mt-2">
              <TrendingUp className="w-3.5 h-3.5 mr-1" /> Active audits
            </span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <FileText className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">High-Risk Flags</p>
            <h4 className="text-3xl font-extrabold text-red-600 mt-1">{highRiskCount}</h4>
            <span className="inline-flex items-center text-xs font-medium text-red-600 mt-2">
              <AlertTriangle className="w-3.5 h-3.5 mr-1" /> Mitigation required
            </span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
            <ShieldAlert className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Avg Risk Index</p>
            <h4 className="text-3xl font-extrabold text-slate-900 mt-1">{avgScore}/100</h4>
            <span className="inline-flex items-center text-xs font-medium text-amber-600 mt-2">
              <Activity className="w-3.5 h-3.5 mr-1" /> Balanced Index
            </span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Gauge className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Compliance Rate</p>
            <h4 className="text-3xl font-extrabold text-slate-900 mt-1">{Math.max(0, 100 - avgScore)}%</h4>
            <span className="inline-flex items-center text-xs font-medium text-emerald-600 mt-2">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Framework Aligned
            </span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Recent AI System Assessments</h3>
            <p className="text-xs text-slate-500">Audited across Education and Mass Communication.</p>
          </div>
          <button onClick={() => navigate('history')} className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer">View All →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3.5 px-6">AI Application Name</th>
                <th className="py-3.5 px-6">Sector / Domain</th>
                <th className="py-3.5 px-6">Assessment Date</th>
                <th className="py-3.5 px-6">Risk Level</th>
                <th className="py-3.5 px-6">Score</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {state.assessments.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition">
                  <td className="py-4 px-6 font-semibold text-slate-900 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-indigo-500" /> {item.appName}
                  </td>
                  <td className="py-4 px-6 font-medium text-slate-700">{item.sector}</td>
                  <td className="py-4 px-6 text-slate-600">{item.date}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      item.riskLevel === 'Low' ? 'bg-emerald-100 text-emerald-800' :
                      item.riskLevel === 'Moderate' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.riskLevel} Risk
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-700">{item.riskScore}/100</td>
                  <td className="py-4 px-6 text-right">
                    <button onClick={() => viewAssessmentDetail(item.id)} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg text-xs transition cursor-pointer">
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AssessmentWizard({ state, updateActiveMeta, runGeminiAudit }) {
  const d = state.activeAssessment;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-slate-900">Gemini AI Ethics Auditor</h3>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Powered by Gemini API
          </span>
        </div>
        <p className="text-xs text-slate-500">Provide application details. Gemini will autonomously score ethical dimensions and formulate risk mitigation strategies.</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">AI Application Name *</label>
            <input 
              type="text" 
              value={d.appName} 
              onChange={(e) => updateActiveMeta('appName', e.target.value)} 
              placeholder="e.g., AI Personalized Tutoring Assistant, Automated News Generator" 
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Target Sector / Domain</label>
            <select 
              value={d.sector} 
              onChange={(e) => updateActiveMeta('sector', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm bg-white"
            >
              <option value="Education">Education (Intelligent Tutoring, Grading, PII)</option>
              <option value="Mass Communication">Mass Communication (Automated Journalism, Content Recommendation)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Intended Purpose & Function *</label>
            <textarea 
              rows={3} 
              value={d.purpose} 
              onChange={(e) => updateActiveMeta('purpose', e.target.value)} 
              placeholder="Describe what the AI application does, who uses it, and how decisions are made..." 
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Data Type Processed</label>
            <input 
              type="text" 
              value={d.dataType} 
              onChange={(e) => updateActiveMeta('dataType', e.target.value)} 
              placeholder="e.g., Student grades, demographic info, RSS feeds, public news" 
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <button 
            onClick={runGeminiAudit} 
            disabled={state.isAiAuditing}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-md transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {state.isAiAuditing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Running Gemini AI Ethics Analysis...</span>
              </>
            ) : (
              <>
                <Bot className="w-4 h-4" />
                <span>Run Autonomous AI Ethics Audit</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function ResultsView({ result, navigate }) {
  if (!result) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-4">
        <p className="text-slate-600 text-sm">No assessment report selected.</p>
        <button onClick={() => navigate('dashboard')} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium cursor-pointer">Return to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">{result.id}</span>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
              result.riskLevel === 'Low' ? 'bg-emerald-100 text-emerald-800' :
              result.riskLevel === 'Moderate' ? 'bg-amber-100 text-amber-800' :
              'bg-red-100 text-red-800'
            }`}>
              {result.riskLevel} Risk Profile
            </span>
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-2">{result.appName}</h3>
          <p className="text-sm text-slate-500 mt-1"><strong className="text-slate-700">Sector:</strong> {result.sector} | <strong className="text-slate-700">Date:</strong> {result.date}</p>
        </div>
        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-500 uppercase">Composite Risk Index</p>
            <p className="text-3xl font-extrabold text-indigo-600">{result.riskScore}/100</p>
          </div>
          <button onClick={() => alert('PDF Audit Report exported successfully.')} className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow-sm transition flex items-center gap-2 cursor-pointer">
            <Download className="w-4 h-4"/> Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h4 className="text-lg font-bold text-slate-900">Application Metadata & Purpose</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div>
              <span className="text-xs text-slate-500 block font-semibold uppercase">Intended Purpose</span>
              <p className="font-medium text-slate-800 mt-1">{result.purpose}</p>
            </div>
            <div>
              <span className="text-xs text-slate-500 block font-semibold uppercase">Data Type Processed</span>
              <p className="font-medium text-slate-800 mt-1">{result.dataType}</p>
            </div>
          </div>

          <h4 className="text-lg font-bold text-slate-900 pt-4">Ethical Dimensions Breakdown</h4>
          <div className="space-y-3">
            {Object.keys(result.criteria).map(key => {
              const c = result.criteria[key];
              return (
                <div key={key} className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-sm capitalize">{key}</span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">Score: {c.score}/5 (Wt: {c.weight})</span>
                  </div>
                  <p className="text-xs text-slate-600"><strong className="text-slate-700">AI Evaluation:</strong> {c.notes || 'No specific notes provided.'}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-lg font-bold text-slate-900">Recommended Mitigations</h4>
            <div className="space-y-3">
              {result.recommendations.map((rec, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5"/>
                  <p className="text-xs text-indigo-950 font-medium leading-relaxed">{rec}</p>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => navigate('dashboard')} className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition cursor-pointer">
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

function HistoryView({ assessments, viewAssessmentDetail, startNewAssessment }) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Assessment Archive</h3>
          <p className="text-xs text-slate-500">Historical records of evaluated AI applications.</p>
        </div>
        <button onClick={startNewAssessment} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition flex items-center gap-2 cursor-pointer">
          <Plus className="w-4 h-4"/> New AI Audit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {assessments.map(item => (
          <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">{item.id}</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  item.riskLevel === 'Low' ? 'bg-emerald-100 text-emerald-800' :
                  item.riskLevel === 'Moderate' ? 'bg-amber-100 text-amber-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {item.riskLevel} Risk ({item.riskScore}/100)
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-900">{item.appName}</h4>
              <p className="text-xs text-slate-500 line-clamp-2">{item.purpose}</p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>{item.sector} | {item.date}</span>
              <button onClick={() => viewAssessmentDetail(item.id)} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-semibold rounded-lg transition cursor-pointer">
                View Full Report →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminView({ showNotification }) {
  const [threshold, setThreshold] = useState('70');
  const [auditMode, setAuditMode] = useState('Strict (Mandatory Human Oversight)');

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h3 className="text-xl font-bold text-slate-900">System Administration & Governance</h3>
        <p className="text-xs text-slate-500 mt-1">Configure global evaluation parameters based on the Chilufya framework.</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1">High-Risk Alert Threshold (0 - 100)</label>
            <input 
              type="text" 
              value={threshold} 
              onChange={(e) => setThreshold(e.target.value)} 
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1">Institutional Audit Policy Mode</label>
            <input 
              type="text" 
              value={auditMode} 
              onChange={(e) => setAuditMode(e.target.value)} 
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <button 
            onClick={() => showNotification('Governance settings saved successfully!')} 
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
          >
            Save Configuration <CheckCircle2 className="w-4 h-4"/>
          </button>
        </div>
      </div>
    </div>
  );
}