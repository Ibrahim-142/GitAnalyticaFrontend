import { useState } from 'react';
import { analyzeUser, compareUsers, reviewPR } from './services/github';
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard';
import ScoreCard from './components/ScoreCard';
import SummaryBox from './components/SummaryBox';
import LanguagesChart from './components/LanguagesChart';
import RepoTable from './components/RepoTable';
import { AlertCircle, Sparkles, Terminal, Users, GitPullRequest } from 'lucide-react';
import { GithubIcon } from './components/Icons';

function App() {
  const [view, setView] = useState('home'); // 'home', 'analyze', 'compare', 'review'
  const [activeTab, setActiveTab] = useState('analyze'); // 'analyze', 'compare', 'review'
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // For compare users
  const [compareUser1, setCompareUser1] = useState('');
  const [compareUser2, setCompareUser2] = useState('');
  const [compareError, setCompareError] = useState('');

  // For PR review
  const [prUrl, setPrUrl] = useState('');
  const [prReviewError, setPrReviewError] = useState('');

  const handleAnalyzeSearch = async (username) => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeUser(username);
      setData(result);
      setView('analyze');
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCompare = async (e) => {
    e.preventDefault();
    if (!compareUser1 || !compareUser2) {
      setCompareError('Please enter both usernames');
      return;
    }
    
    setLoading(true);
    setCompareError(null);
    setError(null);
    try {
      const result = await compareUsers(compareUser1, compareUser2);
      setData(result);
      setView('compare');
    } catch (err) {
      setCompareError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handlePRReview = async (e) => {
    e.preventDefault();
    if (!prUrl) {
      setPrReviewError('Please enter a PR URL');
      return;
    }
    
    setLoading(true);
    setPrReviewError(null);
    setError(null);
    try {
      const result = await reviewPR(prUrl);
      setData(result);
      setView('review');
    } catch (err) {
      setPrReviewError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setView('home');
    setActiveTab('analyze');
    setData(null);
    setError(null);
    setCompareError('');
    setPrReviewError('');
    setCompareUser1('');
    setCompareUser2('');
    setPrUrl('');
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
            {view !== 'home' && (
              <button 
                onClick={handleReset}
                className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Sparkles size={16} />
                New Analysis
              </button>
            )}
            <div className="h-4 w-px bg-slate-200 hidden md:block"></div>
            <a href="https://github.com" target="_blank" className="hover:text-primary transition-colors">
              API Docs
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-12">
        {/* Home / Search Section */}
        {view === 'home' && (
          <section className="text-center py-20 animate-in fade-in zoom-in duration-500">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles size={14} />
              AI-Powered Analysis
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
              Uncover the <span className="text-primary">DNA</span> of any <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-secondary to-accent">
                GitHub Developer
              </span>
            </h2>

            {/* Tabs for different features */}
            <div className="flex justify-center gap-2 mb-8">
              <button
                onClick={() => setActiveTab('analyze')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'analyze'
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Terminal size={16} />
                  Analyze User
                </div>
              </button>
              <button
                onClick={() => setActiveTab('compare')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'compare'
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  Compare Users
                </div>
              </button>
              <button
                onClick={() => setActiveTab('review')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'review'
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <GitPullRequest size={16} />
                  Review PR
                </div>
              </button>
            </div>

            {/* Analyze User Tab */}
            {activeTab === 'analyze' && (
              <div className="max-w-2xl mx-auto">
                <SearchBar onSearch={handleAnalyzeSearch} isLoading={loading} />
                {error && (
                  <div className="max-w-2xl mx-auto mt-8">
                    <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl flex items-center gap-4 text-rose-800 shadow-sm">
                      <AlertCircle className="text-rose-500 h-5 w-5 shrink-0" />
                      <p className="text-sm font-medium">{error}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Compare Users Tab */}
            {activeTab === 'compare' && (
              <form onSubmit={handleCompare} className="max-w-2xl mx-auto">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Username 1"
                      value={compareUser1}
                      onChange={(e) => setCompareUser1(e.target.value)}
                      className="px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg font-semibold text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <input
                      type="text"
                      placeholder="Username 2"
                      value={compareUser2}
                      onChange={(e) => setCompareUser2(e.target.value)}
                      className="px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg font-semibold text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-8 py-3 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {loading ? 'Comparing...' : 'Compare'}
                  </button>
                </div>
                {compareError && (
                  <div className="mt-4 bg-rose-50 border border-rose-200 p-4 rounded-xl flex items-center gap-4 text-rose-800 shadow-sm">
                    <AlertCircle className="text-rose-500 h-5 w-5 shrink-0" />
                    <p className="text-sm font-medium">{compareError}</p>
                  </div>
                )}
              </form>
            )}

            {/* Review PR Tab */}
            {activeTab === 'review' && (
              <form onSubmit={handlePRReview} className="max-w-2xl mx-auto">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="PR URL (e.g., https://github.com/user/repo/pull/123)"
                    value={prUrl}
                    onChange={(e) => setPrUrl(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg font-semibold text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-8 py-3 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {loading ? 'Reviewing...' : 'Review PR'}
                  </button>
                </div>
                {prReviewError && (
                  <div className="mt-4 bg-rose-50 border border-rose-200 p-4 rounded-xl flex items-center gap-4 text-rose-800 shadow-sm">
                    <AlertCircle className="text-rose-500 h-5 w-5 shrink-0" />
                    <p className="text-sm font-medium">{prReviewError}</p>
                  </div>
                )}
              </form>
            )}

            <div className="max-w-4xl mx-auto mt-20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {[
                  { title: 'Quick Insight', desc: 'Get a comprehensive developer overview in seconds.' },
                  { title: 'Score Matrix', desc: 'Advanced scoring algorithm based on real Git data.' },
                  { title: 'AI Summary', desc: 'Personalized career analysis generated by Groq AI.' }
                ].map((item, i) => (
                  <div key={i} className="p-6">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                      <Sparkles className="text-slate-400 h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Analyze Dashboard */}
        {view === 'analyze' && data && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-7xl mx-auto">
            {/* Back button for mobile */}
            <button 
              onClick={handleReset}
              className="md:hidden flex items-center gap-2 text-slate-500 font-bold text-sm mb-4"
            >
              ← Back to search
            </button>
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
            <RepoTable topRepos={data.top_repos} allRepos={data.all_repos} username={data.username} />
          </div>
        )}

        {/* Compare Dashboard */}
        {view === 'compare' && data && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-7xl mx-auto">
            <button 
              onClick={handleReset}
              className="md:hidden flex items-center gap-2 text-slate-500 font-bold text-sm mb-4"
            >
              ← Back
            </button>
            <h2 className="text-3xl font-black text-slate-900 mb-8">Comparison Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.user1 && (
                <div className="glass-card p-6 bg-blue-50 border-blue-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{data.user1.name || data.user1.username}</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Score:</span>
                      <span className="font-bold text-blue-600">{Math.floor(data.user1.score)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Public Repos:</span>
                      <span className="font-bold">{data.user1.repos}</span>
                    </div>
                   
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total Stars:</span>
                      <span className="font-bold">{data.user1.
                      stars || 0}</span>
                    </div>
                  </div>
                </div>
              )}
              {data.user2 && (
                <div className="glass-card p-6 bg-green-50 border-green-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{data.user2.name || data.user2.username}</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Score:</span>
                      <span className="font-bold text-green-600">{Math.floor(data.user2.score)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Public Repos:</span>
                      <span className="font-bold">{data.user2.repos}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total Stars:</span>
                      <span className="font-bold">{data.user2.stars || 0}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {data.analysis && (
              <div className="glass-card p-6 bg-slate-900 text-white">
                <h3 className="text-xl font-bold mb-4">AI Analysis</h3>
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{data.analysis}</p>
              </div>
            )}
          </div>
        )}

        {/* PR Review Dashboard */}
        {view === 'review' && data && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-7xl mx-auto">
            <button 
              onClick={handleReset}
              className="md:hidden flex items-center gap-2 text-slate-500 font-bold text-sm mb-4"
            >
              ← Back
            </button>
            <h2 className="text-3xl font-black text-slate-900 mb-8">PR Review</h2>
            <div className="grid grid-cols-1 gap-8">
              <div className="glass-card p-6 bg-slate-50">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Repository: {data.repo}</h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <p><span className="font-semibold">PR Number:</span> #{data.pr}</p>
                  <p><span className="font-semibold">Files Reviewed:</span> {data.files_reviewed}</p>
                </div>
              </div>
              <div className="glass-card p-6 bg-slate-900 text-white">
                <h3 className="text-xl font-bold mb-4">Review</h3>
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{data.review}</p>
              </div>
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
