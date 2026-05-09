import React from 'react';
import { Users, BookText, GitBranch, MapPin, Link as LinkIcon } from 'lucide-react';

const ProfileCard = ({ data }) => {
  const { username, name, bio, followers, following, public_repos } = data;

  return (
    <div className="glass-card p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
      <div className="relative">
        <img
          src={`https://github.com/${username}.png`}
          alt={name || username}
          className="w-32 h-32 rounded-2xl shadow-2xl border-4 border-white object-cover"
        />
        <div className="absolute -bottom-2 -right-2 bg-primary text-white p-1.5 rounded-lg shadow-lg">
          <GitBranch size={16} />
        </div>
      </div>

      <div className="flex-1 text-center md:text-left">
        <div className="mb-4">
          <h2 className="text-3xl font-bold text-slate-900">{name || username}</h2>
          <p className="text-lg text-primary font-medium">@{username}</p>
        </div>
        
        {bio && (
          <p className="text-slate-600 mb-6 max-w-xl leading-relaxed">
            {bio}
          </p>
        )}

        <div className="flex flex-wrap justify-center md:justify-start gap-6">
          <div className="flex items-center gap-2 text-slate-600 bg-slate-100/50 px-3 py-1.5 rounded-lg">
            <Users size={18} className="text-primary" />
            <span className="font-semibold">{followers.toLocaleString()}</span>
            <span className="text-sm">Followers</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 bg-slate-100/50 px-3 py-1.5 rounded-lg">
            <Users size={18} className="text-secondary" />
            <span className="font-semibold">{following.toLocaleString()}</span>
            <span className="text-sm">Following</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 bg-slate-100/50 px-3 py-1.5 rounded-lg">
            <BookText size={18} className="text-accent" />
            <span className="font-semibold">{public_repos.toLocaleString()}</span>
            <span className="text-sm">Repos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
