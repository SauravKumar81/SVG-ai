import React, { useState, useEffect } from 'react';
import { User, Key, Clock, Settings, Copy, CheckCircle2, LogOut, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
export default function Dashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('settings');
  const [copiedKey, setCopiedKey] = useState(false);
  const [historyItems, setHistoryItems] = useState([]);
  const apiKey = "svg_live_q8d73k2ld98fj4mf03n5vx8s";

  useEffect(() => {
    if (activeTab === 'history') {
      api.get('/svg/history')
        .then(res => setHistoryItems(res.data))
        .catch(err => console.error(err));
    }
  }, [activeTab]);

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const downloadHistorySvg = (svgCode, id) => {
    if (!svgCode) return;
    const blob = new Blob([svgCode], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `svg-ai-${id}.svg`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 200);
  };

  const tabs = [
    { id: 'history', label: 'Generation History', icon: Clock },
    { id: 'settings', label: 'Account Settings', icon: User },
    { id: 'api', label: 'API Keys', icon: Key },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 text-slate-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        
        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-xl font-bold border-2 border-white/20 shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              S
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{user ? user.name : 'Unknown'}</h2>
              <p className="text-sm text-cyan-400 font-medium tracking-wide outline outline-1 outline-cyan-500/50 bg-cyan-500/10 rounded-full px-2 py-0.5 mt-1 inline-block">PRO PLAN</p>
            </div>
          </div>
          
          <nav className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 custom-scrollbar">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium whitespace-nowrap ${isActive ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'}`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              )
            })}
          </nav>

          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 font-medium text-sm transition-all md:mt-12 hidden md:flex">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </aside>

        {/* Content Area */}
        <main className="glass-card rounded-3xl border border-slate-700/50 p-8 min-h-[500px]">
          
          {activeTab === 'settings' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-1">Profile Details</h3>
                <p className="text-slate-400">Update your account information.</p>
              </div>
              
              <div className="grid gap-6 max-w-xl">
                <div className="space-y-2">
                  <label className="text-sm font-medium tracking-wide text-slate-300">Name</label>
                  <input type="text" readOnly value={user ? user.name : ''} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all text-white font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium tracking-wide text-slate-300">Email Address</label>
                  <input type="email" readOnly value={user ? user.email : ''} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all text-white font-medium" />
                </div>
              </div>
              
              <div className="pt-6 border-t border-slate-700/50 flex gap-4">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-[0_4px_15px_rgba(37,99,235,0.3)] transition-all">Save Changes</button>
              </div>
            </motion.div>
          )}

          {activeTab === 'api' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-1 flex items-center gap-2"><Key className="w-6 h-6 text-yellow-400" /> API Access</h3>
                <p className="text-slate-400">Manage your secret keys for generating vector graphics programmatically.</p>
              </div>

              <div className="bg-slate-900/50 border border-slate-700 p-6 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 blur-3xl rounded-full" />
                <h4 className="text-lg font-semibold mb-4 text-white">Default Environment Key</h4>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-2">
                  <div className="relative flex-1">
                    <input 
                      type="password" 
                      readOnly 
                      value={apiKey} 
                      className="w-full bg-black/40 border border-slate-600 rounded-xl pl-4 pr-12 py-3 text-emerald-400 font-mono text-sm shadow-inner"
                    />
                    <button 
                      onClick={copyKey}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                    >
                      <AnimatePresence mode="wait">
                        {copiedKey ? 
                          <motion.div key="c1" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><CheckCircle2 className="w-5 h-5 text-emerald-400" /></motion.div> : 
                          <motion.div key="c2" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Copy className="w-5 h-5" /></motion.div>}
                      </AnimatePresence>
                    </button>
                  </div>
                  <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-medium rounded-xl transition-all whitespace-nowrap">
                    Roll Key
                  </button>
                </div>
                <p className="text-xs text-slate-500">Do not share your API key in publicly accessible areas such as GitHub, client-side code, and so forth.</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              
              {historyItems.length > 0 ? historyItems.map(item => (
                 <div key={item._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 gap-4">
                  <div className="flex items-center gap-4 w-full sm:w-auto overflow-hidden">
                    <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)] shrink-0 overflow-hidden p-1 [&>svg]:w-full [&>svg]:h-full" dangerouslySetInnerHTML={{__html: item.svgCode}} />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-lg text-white truncate w-full" title={item.text}>{item.text}</h4>
                      <p className="text-xs text-slate-400 font-mono mt-1">Generated: {new Date(item.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <button onClick={() => downloadHistorySvg(item.svgCode, item._id)} className="px-4 py-2 bg-slate-700 hover:bg-cyan-600 hover:text-white text-slate-300 font-medium rounded-lg text-sm transition-all flex items-center gap-2 whitespace-nowrap">
                    <Download className="w-4 h-4" /> Download SVG
                  </button>
                </div>
              )) : (
                <div className="text-center py-10 opacity-50">
                  <p>You haven't generated any SVGs yet.</p>
                </div>
              )}
              
            </motion.div>
          )}

        </main>
      </div>
    </div>
  );
}
