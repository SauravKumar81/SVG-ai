import React from 'react';
import { Check, Sparkles, Zap, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      desc: "Perfect for exploring AI vector generation.",
      features: [
        "10 AI generations per month",
        "Standard SVG exports",
        "Community gallery access",
        "Public prompts"
      ],
      icon: ImageIcon,
      popular: false,
      color: "border-slate-700 hover:border-blue-500/50"
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      desc: "Unlimited power for professional designers and developers.",
      features: [
        "Unlimited AI generations",
        "Priority API queue (faster)",
        "Advanced modifier settings",
        "Private prompts",
        "Commercial usage rights"
      ],
      icon: Sparkles,
      popular: true,
      color: "border-cyan-500/50 shadow-[0_0_40px_rgba(34,211,238,0.2)] scale-105"
    },
    {
      name: "API Access",
      price: "Custom",
      desc: "Integrate our vector engine into your own products.",
      features: [
        "High-volume rate limits",
        "Dedicated endpoints",
        "SLA guarantee",
        "Premium support"
      ],
      icon: Zap,
      popular: false,
      color: "border-slate-700 hover:border-purple-500/50"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-32 text-slate-100 min-h-screen flex flex-col items-center justify-center">
      
      <div className="text-center max-w-3xl mb-16 animate-fade-in relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        <h1 className="text-5xl font-black mb-6 tracking-tight drop-shadow-lg text-white">
          Simple, transparent pricing
        </h1>
        <p className="text-xl text-slate-400">
          Unlock the full potential of AI-generated vector graphics. No hidden fees. Cancel anytime.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl relative z-10">
        {plans.map((plan, idx) => {
          const Icon = plan.icon;
          return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`glass-card relative p-8 rounded-3xl border transition-all duration-300 flex flex-col ${plan.color}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full py-1.5 px-4 text-xs font-bold tracking-widest text-white shadow-lg uppercase" style={{ background: 'linear-gradient(90deg, #0ea5e9, #8b5cf6)' }}>
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-white/10 ${plan.popular ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm h-10">{plan.desc}</p>
              </div>
              
              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-5xl font-black">{plan.price}</span>
                {plan.period && <span className="text-slate-400 font-medium">{plan.period}</span>}
              </div>

              <button className={`w-full py-3.5 rounded-xl font-bold transition-all ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-[0_0_20px_rgba(34,211,238,0.3)]' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'}`}>
                {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
              </button>
              
              <div className="mt-8 space-y-4 flex-1">
                {plan.features.map(feat => (
                  <div key={feat} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 shrink-0 ${plan.popular ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <span className="text-slate-300 text-sm">{feat}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
