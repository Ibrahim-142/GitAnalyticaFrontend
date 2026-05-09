import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

const SearchBar = ({ onSearch, isLoading }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
        </div>
        <input
          type="text"
          className="input-field pl-12 pr-32 py-4 text-lg shadow-xl shadow-primary/5"
          placeholder="Enter GitHub username (e.g. torvalds)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !username.trim()}
          className="absolute right-2 top-2 bottom-2 px-6 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            'Analyze'
          )}
        </button>
      </form>
      <p className="mt-4 text-sm text-slate-500 text-center">
        Uncover developer insights, scores, and AI-powered summaries in seconds.
      </p>
    </div>
  );
};

export default SearchBar;
