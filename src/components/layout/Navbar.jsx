import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Keyboard, BarChart2, Settings, Flame } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const NAV_ITEMS = [
  { path: '/',         label: 'होम',      labelEn: 'Home',     icon: Home },
  { path: '/lessons',  label: 'पाठ',       labelEn: 'Lessons',  icon: BookOpen },
  { path: '/practice', label: 'अभ्यास',    labelEn: 'Practice', icon: Keyboard },
  { path: '/progress', label: 'प्रगति',    labelEn: 'Progress', icon: BarChart2 },
  { path: '/settings', label: 'सेटिंग्स', labelEn: 'Settings', icon: Settings },
];

export default function Navbar() {
  const location = useLocation();
  const { state } = useApp();
  const { streak } = state.stats;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10"
         style={{ background: 'rgba(15,15,26,0.85)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl font-bold"
               style={{ background: 'linear-gradient(135deg, #f97316, #a855f7)' }}>
            द
          </div>
          <span className="font-bold text-lg hidden sm:block">
            <span className="text-white">देवनागरी</span>
            <span className="text-orange-400 ml-1">टाइपर</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path;
            return (
              <Link key={path} to={path}
                    className={`nav-link flex items-center gap-2 ${active ? 'active' : ''}`}>
                <Icon size={16} />
                <span className="hindi-text">{label}</span>
              </Link>
            );
          })}
        </div>

        {/* Streak badge */}
        <div className="flex items-center gap-3">
          {streak > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold"
                 style={{ background: 'rgba(249,115,22,0.2)', border: '1px solid rgba(249,115,22,0.4)' }}>
              <Flame size={14} className="text-orange-400" />
              <span className="text-orange-300">{streak}</span>
            </div>
          )}
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden border-t border-white/10 flex z-50"
           style={{ background: 'rgba(15,15,26,0.95)', backdropFilter: 'blur(20px)' }}>
        {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <Link key={path} to={path}
                  className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs transition-colors
                  ${active ? 'text-orange-400' : 'text-slate-500'}`}>
              <Icon size={20} />
              <span className="hindi-text text-[10px]">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
