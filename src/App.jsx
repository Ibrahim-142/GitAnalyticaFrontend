import React, { useState } from 'react';
import { analyzeUser } from './services/github';
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard';
import ScoreCard from './components/ScoreCard';
import SummaryBox from './components/SummaryBox';
import LanguagesChart from './components/LanguagesChart';
import RepoTable from './components/RepoTable';
import { AlertCircle, Sparkles, Terminal } from 'lucide-react';

const GithubIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (username) => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeUser(username);
      setData(result);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Navbar / Header */}
      <header className="bg-white/50 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 p-2 rounded-lg">
              <GithubIcon className="text-white h-5 w-5" />
            </div>
            <h1 className="text-xl font-black tracking-tight text-slate-900">
              Git<span className="text-primary">Analytica</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 text-sm font-semibold text-slate-600">
            <span className="hidden md:block">GitHub Developer Intelligence</span>
            <div className="h-4 w-px bg-slate-200 hidden md:block"></div>
            <a href="https://github.com" target="_blank" className="hover:text-primary transition-colors">
              API Docs
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-12">
        {/* Search Section */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles size={14} />
            AI-Powered Analysis
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Analyze any GitHub <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
              Developer Profile
            </span>
          </h2>
          <SearchBar onSearch={handleSearch} isLoading={loading} />
        </section>

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-rose-50 border border-rose-200 p-6 rounded-2xl flex items-center gap-4 text-rose-800 shadow-lg shadow-rose-200/20">
              <div className="bg-rose-500 p-3 rounded-xl shadow-lg shadow-rose-500/20">
                <AlertCircle className="text-white h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Analysis Failed</h3>
                <p className="text-rose-600/80">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Content */}
        {data && !loading && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Top Row: Profile & Score */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ProfileCard data={data} />
              </div>
              <div className="lg:col-span-1">
                <ScoreCard score={data.developer_score} />
              </div>
            </div>

            {/* AI Summary */}
            <SummaryBox summary={data.summary} />

            {/* Middle Row: Languages & More */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <LanguagesChart languages={data.languages} />
              </div>
              <div className="lg:col-span-2">
                <div className="glass-card p-8 h-full flex flex-col justify-center bg-slate-900 text-white border-none shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Terminal size={120} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Terminal className="text-primary" />
                    Technical Overview
                  </h3>
                  <div className="grid grid-cols-2 gap-6 mt-4">
                    <div className="space-y-1">
                      <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Public Repos</span>
                      <p className="text-3xl font-black">{data.public_repos}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Followers</span>
                      <p className="text-3xl font-black">{data.followers}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Following</span>
                      <p className="text-3xl font-black">{data.following}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Developer Score</span>
                      <p className="text-3xl font-black">#{Math.floor(data.developer_score)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Repositories Table */}
            <RepoTable topRepos={data.top_repos} allRepos={data.all_repos} />
          </div>
        )}

        {/* Empty State */}
        {!data && !loading && !error && (
          <div className="max-w-4xl mx-auto mt-20 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Quick Insight', desc: 'Get a comprehensive developer overview in seconds.' },
                { title: 'Score Matrix', desc: 'Advanced scoring algorithm based on real Git data.' },
                { title: 'AI Summary', desc: 'Personalized career analysis generated by GPT-4.' }
              ].map((item, i) => (
                <div key={i} className="glass-card p-8 group hover:border-primary/30 transition-all duration-300">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/10 transition-colors">
                    <Sparkles className="text-slate-400 group-hover:text-primary h-6 w-6 transition-colors" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="mt-32 border-t border-slate-200 pt-12 text-center text-slate-400 text-sm">
        <p>© 2026 GitAnalytica Intelligence Dashboard. Built with React & FastAPI.</p>
      </footer>
    </div>
  );
}

export default App;
