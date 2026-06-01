import  { useState } from 'react';
import { Star, GitFork, ExternalLink, ChevronDown, ChevronUp, Calendar } from 'lucide-react';

const RepoRow = ({ repo, username }) => (
  <tr className="hover:bg-slate-50/80 transition-colors border-b border-slate-100 last:border-0">
    <td className="py-4 px-4">
      <div className="flex flex-col">
        <span className="font-bold text-slate-900 group flex items-center gap-1">
          {repo.name}
          <a href={`https://github.com/${repo.full_name || `${username}/${repo.name}`}`} target="_blank" rel="noreferrer">
            <ExternalLink size={14} className="text-slate-400 hover:text-primary transition-colors" />
          </a>
        </span>
        <span className="text-xs text-slate-500 line-clamp-1">{repo.description}</span>
      </div>
    </td>
    <td className="py-4 px-4">
      <div className="flex items-center gap-1 text-amber-500 font-semibold">
        <Star size={16} fill="currentColor" />
        {repo.stars || 0}
      </div>
    </td>
    <td className="py-4 px-4 text-slate-600 font-medium">
      <div className="flex items-center gap-1">
        <GitFork size={16} />
        {repo.forks || 0}
      </div>
    </td>
    <td className="py-4 px-4">
      {repo.language && (
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
          {repo.language}
        </span>
      )}
    </td>
    <td className="py-4 px-4 text-slate-500 text-sm whitespace-nowrap">
      <div className="flex items-center gap-1">
        <Calendar size={14} />
        {new Date(repo.updated_at).toLocaleDateString()}
      </div>
    </td>
  </tr>
);

const RepoTable = ({ topRepos, allRepos, username }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="space-y-8">
      <div className="glass-card overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-white">
          <h3 className="text-xl font-bold text-slate-900">Top Performing Repositories</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider font-bold">
                <th className="py-3 px-4">Repository</th>
                <th className="py-3 px-4">Stars</th>
                <th className="py-3 px-4">Forks</th>
                <th className="py-3 px-4">Language</th>
                <th className="py-3 px-4">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {topRepos.map((repo, idx) => (
                <RepoRow key={repo.name + idx} repo={repo} username={username} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {allRepos && allRepos.length > 0 && (
        <div className="flex flex-col items-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-6 py-2 rounded-full border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-all shadow-sm"
          >
            {showAll ? (
              <>
                <ChevronUp size={20} />
                Hide All Repositories
              </>
            ) : (
              <>
                <ChevronDown size={20} />
                View All {allRepos.length} Repositories
              </>
            )}
          </button>

          {showAll && (
            <div className="w-full mt-6 glass-card overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider font-bold">
                      <th className="py-3 px-4">Repository</th>
                      <th className="py-3 px-4">Stars</th>
                      <th className="py-3 px-4">Forks</th>
                      <th className="py-3 px-4">Language</th>
                      <th className="py-3 px-4">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allRepos.map((repo, idx) => (
                      <RepoRow key={repo.name + idx} repo={repo} username={username} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RepoTable;
