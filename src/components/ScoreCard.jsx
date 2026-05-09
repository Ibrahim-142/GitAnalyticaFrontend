import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, animate } from 'framer-motion';
import { Trophy, AlertCircle, CheckCircle2 } from 'lucide-react';

const ScoreCard = ({ score }) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const controls = animate(0, score, {
      duration: 2,
      onUpdate: (value) => setDisplayScore(Math.round(value)),
      ease: [0.34, 1.56, 0.64, 1] // Custom elastic ease
    });
    return () => controls.stop();
  }, [score]);

  const getStyle = () => {
    if (score <= 40) return {
      color: 'text-rose-500',
      bg: 'bg-rose-50',
      border: 'border-rose-100',
      shadow: 'shadow-rose-100',
      label: 'Emerging Developer',
      desc: 'Significant growth potential identified.'
    };
    if (score <= 70) return {
      color: 'text-amber-500',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
      shadow: 'shadow-amber-100',
      label: 'Established Professional',
      desc: 'Consistent and reliable contributor.'
    };
    return {
      color: 'text-emerald-500',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
      shadow: 'shadow-emerald-100',
      label: 'Elite Tech Lead',
      desc: 'Exceptional technical leadership skills.'
    };
  };

  const style = getStyle();

  return (
    <div className={`glass-card p-8 h-full flex flex-col items-center justify-between relative overflow-hidden group`}>
      <div className={`absolute top-0 left-0 w-full h-1 ${style.bg.replace('bg-', 'bg-')}`}></div>
      
      <div className="text-center">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8">
          Developer Score
        </h3>
        
        <div className="relative mb-8 flex justify-center">
          <svg className="w-48 h-48 transform -rotate-90 drop-shadow-sm">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              className="text-slate-100"
            />
            <motion.circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              fill="transparent"
              strokeDasharray={553}
              initial={{ strokeDashoffset: 553 }}
              animate={{ strokeDashoffset: 553 - (553 * score) / 100 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              className={style.color}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`text-6xl font-black tracking-tighter ${style.color}`}
            >
              {displayScore}
            </motion.span>
            <span className="text-slate-400 text-xs font-bold mt-1">PERCENTILE</span>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className={`p-4 rounded-2xl ${style.bg} border ${style.border} text-center transition-all duration-500 group-hover:shadow-lg ${style.shadow}`}>
          <div className={`text-sm font-black uppercase tracking-wider mb-1 ${style.color}`}>
            {style.label}
          </div>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            {style.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
