import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, animate } from 'framer-motion';
import { Trophy, AlertCircle, CheckCircle2 } from 'lucide-react';

const ScoreCard = ({ score }) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const controls = animate(0, score, {
      duration: 2,
      onUpdate: (value) => setDisplayScore(Math.round(value)),
      ease: "easeOut"
    });
    return () => controls.stop();
  }, [score]);

  const getColor = () => {
    if (score <= 40) return 'text-red-500 bg-red-50 border-red-200 shadow-red-200/50';
    if (score <= 70) return 'text-amber-500 bg-amber-50 border-amber-200 shadow-amber-200/50';
    return 'text-emerald-500 bg-emerald-50 border-emerald-200 shadow-emerald-200/50';
  };

  const getIcon = () => {
    if (score <= 40) return <AlertCircle className="w-8 h-8" />;
    if (score <= 70) return <Trophy className="w-8 h-8 text-amber-400" />;
    return <CheckCircle2 className="w-8 h-8" />;
  };

  const getLabel = () => {
    if (score <= 40) return 'Junior Level';
    if (score <= 70) return 'Mid-Senior Level';
    return 'Elite Contributor';
  };

  return (
    <div className={`glass-card p-8 flex flex-col items-center justify-center text-center border-2 transition-colors duration-500 ${getColor().split(' ').slice(1).join(' ')}`}>
      <h3 className="text-slate-500 font-semibold uppercase tracking-wider text-sm mb-4">Developer Score</h3>
      
      <div className="relative mb-6">
        <svg className="w-40 h-40 transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-slate-200"
          />
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={440}
            initial={{ strokeDashoffset: 440 }}
            animate={{ strokeDashoffset: 440 - (440 * score) / 100 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className={getColor().split(' ')[0]}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-5xl font-black ${getColor().split(' ')[0]}`}>
            {displayScore}
          </span>
          <span className="text-slate-400 text-xs font-bold">/ 100</span>
        </div>
      </div>

      <div className={`flex items-center gap-2 mb-2 ${getColor().split(' ')[0]}`}>
        {getIcon()}
        <span className="text-xl font-bold">{getLabel()}</span>
      </div>
      
      <p className="text-slate-500 text-sm max-w-[200px]">
        Based on contributions, repo quality, and engagement.
      </p>
    </div>
  );
};

export default ScoreCard;
