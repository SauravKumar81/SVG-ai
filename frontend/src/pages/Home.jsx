import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Image as ImageIcon, Zap, Code, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const features = [
    { title: 'Text to Vector', desc: 'Describe your vision in natural language and watch as Claude AI turns it into flawless SVG code.', icon: Zap, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { title: 'Infinite Scalability', desc: 'Unlike generated PNGs, our SVGs can scale to any size without losing a single pixel of quality.', icon: ImageIcon, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { title: 'Clean Markup', desc: 'Get production-ready, cleanly formatted XML/SVG code that you can immediately embed in your projects.', icon: Code, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col justify-center pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full pb-20">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto space-y-8 animate-fade-in relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-4 shadow-[0_0_20px_rgba(34,211,238,0.15)]"
          >
            <Sparkles className="w-4 h-4" />
            Empowered by Claude 3.5 Sonnet
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-cyan-500 pb-2"
          >
            Imagine. <br/>
            <span className="gradient-text text-glow">Vectorize.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            The world's most advanced AI Vector Generator. 
            Turn your text prompts into beautiful, scalable, and production-ready SVG graphics in seconds.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
          >
            <Link to="/generate" className="group relative w-full sm:w-auto overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 p-[1px] shadow-[0_0_40px_rgba(14,165,233,0.3)] transition-all hover:shadow-[0_0_60px_rgba(14,165,233,0.5)] active:scale-95">
              <span className="flex h-14 items-center justify-center gap-2 rounded-xl bg-slate-950/50 backdrop-blur-sm px-8 text-lg font-semibold text-white transition-all group-hover:bg-transparent">
                <Sparkles className="w-5 h-5 text-white/80" />
                Start Generating <span className="font-light text-white/70">Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link to="/gallery" className="group flex h-14 w-full sm:w-auto py-3 px-8 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 backdrop-blur-md text-lg font-medium text-slate-300 transition-all hover:bg-slate-700/50 hover:text-white">
              <Compass className="w-5 h-5 text-slate-400 group-hover:text-cyan-400" />
              Explore Gallery
            </Link>
          </motion.div>
        </div>

        {/* Features Grids */}
        <div className="grid md:grid-cols-3 gap-6 mt-32">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + (idx * 0.1) }}
                className="glass-card p-8 rounded-2xl border border-slate-700/50 hover:border-cyan-500/30 transition-colors group"
              >
                <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-6 border border-white/5`}>
                  <Icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-cyan-300 transition-colors">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            )
          })}
        </div>

      </div>
    </div>
  );
}
