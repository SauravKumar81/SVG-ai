import React, { useState } from 'react';
import { Download, Copy, Sparkles, AlertCircle, RefreshCw, Layers, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axiosInstance';
export default function Generate() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [svgCode, setSvgCode] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const testSvg = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cyber" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0ea5e9" />
        <stop offset="100%" stop-color="#8b5cf6" />
      </linearGradient>
    </defs>
    <path fill="url(#cyber)" d="M45.7,-76.3C58.9,-69.3,69.1,-55.3,77.2,-40.5C85.3,-25.7,91.3,-10.1,88.7,4.3C86.1,18.7,75,31.9,64.3,44.2C53.6,56.5,43.3,67.9,29.8,75.1C16.3,82.3,-0.4,85.3,-16.9,82C-33.4,78.7,-49.7,69.1,-60.9,56.3C-72.1,43.5,-78.2,27.5,-81.4,11.2C-84.6,-5.1,-84.9,-21.7,-78.3,-35.6C-71.7,-49.5,-58.2,-60.7,-43.8,-67.2C-29.4,-73.7,-14.7,-75.5,1.2,-77.1C17.1,-78.7,34.2,-80.1,45.7,-76.3Z" transform="translate(100 100)" />
  </svg>`;


  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    setSvgCode(null);
    
    try {
      const { data } = await api.post('/svg/generate', { prompt });
      setSvgCode(data.svgCode);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'Generation failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (svgCode) {
      navigator.clipboard.writeText(svgCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadSvg = () => {
    if (!svgCode) return;
    const blob = new Blob([svgCode], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `svg-ai-${Date.now()}.svg`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 200);
  };

  return (
    <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 h-[calc(100vh-4rem)] flex flex-col pt-24 text-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 flex-1 min-h-0">
        
        {/* Left Column: Prompting */}
        <div className="flex flex-col gap-4 overflow-y-auto pr-2 pb-10 custom-scrollbar">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6 rounded-2xl border border-slate-700/50 flex flex-col gap-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full" />
            <div className="flex items-center gap-3 text-cyan-400 font-semibold text-lg drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
              <Sparkles className="w-5 h-5" /> Vector Architect
            </div>
            
            <p className="text-sm text-slate-400">Describe the SVG graphic you want to generate in detail.</p>
            
            <div className="relative flex-1 min-h-[250px]">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. A futuristic neon city skyline at night, simple curves, glowing colors..."
                className="w-full h-full bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 text-slate-200 placeholder-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all resize-none font-medium custom-scrollbar"
              />
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-xl shadow-[0_4px_20px_rgba(14,165,233,0.3)] hover:shadow-[0_4px_30px_rgba(14,165,233,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2 group/btn"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                  Generate Graphic
                </>
              )}
            </button>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-xl flex items-start gap-2 text-sm mt-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 rounded-2xl border border-slate-700/50 opacity-50">
            <h3 className="font-semibold text-slate-300 flex items-center gap-2 mb-2"><Layers className="w-4 h-4" /> Generation Settings</h3>
            <p className="text-xs text-slate-500">Advanced modifier settings locked. Professional tier required.</p>
          </motion.div>
        </div>

        {/* Right Column: Canvas Preview */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-2xl border border-slate-700/50 flex flex-col overflow-hidden">
          <div className="bg-slate-900/80 px-4 py-3 border-b border-slate-700/50 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-400 ml-4 font-semibold tracking-wider">WORKSPACE</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={copyToClipboard}
                disabled={!svgCode}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-600 font-medium text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <AnimatePresence mode="wait">
                  {copied ? 
                    <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><CheckCircle2 className="w-4 h-4 text-emerald-400" /></motion.div> : 
                    <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Copy className="w-4 h-4" /></motion.div>}
                </AnimatePresence>
                {copied ? 'Copied XML' : 'Copy XML'}
              </button>
              <button 
                onClick={downloadSvg}
                disabled={!svgCode}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-sm text-white bg-slate-700 hover:bg-slate-600 transition-all shadow-[0_2px_10px_rgba(0,0,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
          
          <div className="flex-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTIwIDBoLTIwdjIwaDIwdi0yMHptLTE5IDF2MThoMThWMWgtMTh6IiBmaWxsPSIjMWUyOTNiIiBmaWxsLW9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==')] relative flex items-center justify-center p-8 overflow-hidden min-h-[400px]">
            {loading && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-slate-700 border-t-cyan-500 rounded-full animate-spin shadow-[0_0_30px_rgba(34,211,238,0.2)] mb-4" />
                <p className="text-cyan-400 font-medium animate-pulse">Running Neural Rendering Engine...</p>
              </div>
            )}
            
            {!svgCode && !loading && (
              <div className="text-center text-slate-500 flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-slate-800/50 flex flex-wrap items-center justify-center border border-slate-700 animate-pulse">
                  <Sparkles className="w-8 h-8 text-slate-600" />
                </div>
                <p>Waiting for prompt instructions</p>
              </div>
            )}

            {svgCode && !loading && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="w-full h-full max-w-2xl max-h-[800px] flex items-center justify-center drop-shadow-[0_0_40px_rgba(255,255,255,0.05)]"
                dangerouslySetInnerHTML={{ __html: svgCode }}
              />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
