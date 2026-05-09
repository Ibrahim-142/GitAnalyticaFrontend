import React from 'react';
import { Code2 } from 'lucide-react';

const LanguagesChart = ({ languages }) => {
  if (!languages || Object.keys(languages).length === 0) return null;

  // Convert object to array and sort by count
  const sortedLanguages = Object.entries(languages)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8); // Top 8 languages

  const maxCount = Math.max(...sortedLanguages.map(l => l.count));

  const colors = [
    'bg-primary', 'bg-secondary', 'bg-accent', 
    'bg-blue-500', 'bg-emerald-500', 'bg-amber-500',
    'bg-rose-500', 'bg-slate-500'
  ];

  return (
    <div className="glass-card p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Code2 className="text-primary h-5 w-5" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Language Distribution</h3>
      </div>

      <div className="space-y-6">
        {sortedLanguages.map((lang, index) => {
          const percentage = (lang.count / maxCount) * 100;
          return (
            <div key={lang.name} className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-700">{lang.name}</span>
                <span className="text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded">
                  {lang.count} repos
                </span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${colors[index % colors.length]} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LanguagesChart;
