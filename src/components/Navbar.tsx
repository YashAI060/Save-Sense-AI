import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Sparkles, Landmark, TrendingUp, Home, Calculator, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  userName?: string;
  userAvatar?: string;
}

export function Navbar({ userName, userAvatar }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || 
             localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);
  
  const handleLogout = () => {
    localStorage.removeItem('user_name');
    localStorage.removeItem('unique_id');
    navigate('/portal');
  };

    const displayName = userName || localStorage.getItem('user_name') || "User";
    const uniqueId = localStorage.getItem('unique_id') || "";
    
    const navItems = [
    { name: 'Daily Tracker', path: '/tracker', icon: <Calculator className="w-4 h-4" /> },
    { name: 'AI Assistant', path: '/ai-assistant', icon: <Sparkles className="w-4 h-4" /> },
    { name: 'Banking', path: '/banking', icon: <Landmark className="w-4 h-4" /> },
    { name: 'Investment', path: '/investment', icon: <TrendingUp className="w-4 h-4" /> },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path === '/tracker' && (location.pathname === '/tracker' || location.pathname === '/')) return true;
    return location.pathname === path;
  };

  return (
    <nav className="neumorphic px-4 sm:px-6 py-4 mx-3 sm:mx-6 mt-4 sm:mt-6 mb-6 sm:mb-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-6 z-[100]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 lg:gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">Save Sense AI</h1>
          </div>
          
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "px-4 py-2 text-sm font-bold rounded-xl transition-all flex items-center gap-2",
                  isActive(item.path)
                    ? "neumorphic-button active text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-800"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={toggleTheme}
              className="neumorphic-button p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-3 group relative cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{displayName}</p>
                {uniqueId && (
                  <div className="bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] font-mono text-gray-500 dark:text-gray-400 mt-1 neumorphic-inset">
                    ID: {uniqueId}
                  </div>
                )}
              </div>

              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden shadow-md relative border-2 border-white dark:border-slate-700">
                {userAvatar ? (
                  <img src={userAvatar} alt={displayName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-xs font-bold">
                    {displayName.split(' ').map(n => n[0]).join('')}
                  </span>
                )}
              </div>

              {/* Logout Dropdown */}
              <div className="absolute right-0 top-full pt-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 scale-95 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto z-50">
                <div className="neumorphic bg-white dark:bg-slate-900 p-2 rounded-2xl border border-gray-100 dark:border-slate-800 min-w-[120px] shadow-2xl">
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-sm font-bold text-red-500 flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
              
              <button
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-gray-600 dark:text-gray-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 pt-4 border-t border-gray-100 dark:border-slate-800 animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-3 text-sm font-bold rounded-xl transition-all flex items-center gap-3",
                  isActive(item.path)
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-800"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
