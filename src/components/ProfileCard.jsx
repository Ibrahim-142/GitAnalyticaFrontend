import { Users, BookText } from 'lucide-react';
import { GithubIcon } from './Icons';


const ProfileCard = ({ data }) => {
  const { username, name, bio, followers, following, public_repos } = data;

  return (
    <div className="glass-card overflow-hidden group">
      <div className="h-24 bg-linear-to-r from-primary/20 via-secondary/20 to-accent/20 w-full"></div>
      <div className="px-8 pb-8 -mt-12">
        <div className="flex flex-col md:flex-row items-end gap-6 mb-8">
          <div className="relative shrink-0">
            <img
              src={`https://github.com/${username}.png`}
              alt={name || username}
              className="w-32 h-32 rounded-3xl shadow-2xl border-4 border-white object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
            <div className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-2 rounded-xl shadow-lg border-2 border-white">
              <GithubIcon className="w-5 h-5" />
            </div>
          </div>
          
          <div className="flex-1 pb-2">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-2">
              {name || username}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold text-lg">@{username}</span>
              <span className="h-1 w-1 rounded-full bg-slate-300"></span>
              <span className="text-slate-500 font-medium">Developer Intelligence Analysis</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Professional Bio</h3>
            <p className="text-slate-600 leading-relaxed text-lg italic">
              {bio || "This developer hasn't provided a bio yet, but their code speaks volumes."}
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Followers', value: followers, icon: Users, color: 'text-blue-500 bg-blue-50' },
              { label: 'Following', value: following, icon: Users, color: 'text-purple-500 bg-purple-50' },
              { label: 'Repos', value: public_repos, icon: BookText, color: 'text-emerald-500 bg-emerald-50' }
            ].map((stat, i) => (
              <div key={i} className={`p-4 rounded-2xl ${stat.color} flex flex-col items-center justify-center transition-transform hover:scale-105`}>
                <stat.icon className="mb-2 h-5 w-5 opacity-70" />
                <span className="text-xl font-black">{stat.value.toLocaleString()}</span>
                <span className="text-[10px] uppercase font-bold opacity-60 tracking-tighter">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
