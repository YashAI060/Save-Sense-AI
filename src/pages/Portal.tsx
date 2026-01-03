import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';

export default function Portal() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  const [dailySaving, setDailySaving] = useState('');
  const [isNewUser, setIsNewUser] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || 
             localStorage.getItem('theme') === 'dark';
    }
    return false;
  });
  const navigate = useNavigate();

  const MIN_SAVING = 50;
  const MAX_SAVING = 10000;

  // Handle theme toggle
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

  const generateUniqueId = () => {
    const random = Math.floor(100000 + Math.random() * 900000);
    return `SS-${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const savingAmount = parseInt(dailySaving);
    if (!dailySaving || isNaN(savingAmount)) {
      setError('Please enter your daily saving amount.');
      setIsLoading(false);
      return;
    }
    if (savingAmount < MIN_SAVING) {
      setError(`Minimum daily saving is ${MIN_SAVING} PKR.`);
      setIsLoading(false);
      return;
    }
    if (savingAmount > MAX_SAVING) {
      setError(`Maximum daily saving is ${MAX_SAVING.toLocaleString()} PKR.`);
      setIsLoading(false);
      return;
    }

    if (firstName.trim() && lastName.trim()) {
      const fullName = `${firstName.trim()} ${lastName.trim()}`;
      let finalUniqueId = uniqueId.trim();

      if (isNewUser) {
        finalUniqueId = generateUniqueId();
        try {
          await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ unique_id: finalUniqueId, full_name: fullName }),
          });
        } catch (err) {
          console.error('Registration error:', err);
        }
        localStorage.setItem('user_name', fullName);
        localStorage.setItem('unique_id', finalUniqueId);
        localStorage.setItem('daily_saving', savingAmount.toString());
        localStorage.setItem('saving_start_date', new Date().toISOString());
        setIsLoading(false);
        navigate('/');
      } else {
        if (!finalUniqueId) {
          setError('Please enter your unique ID for existing account.');
          setIsLoading(false);
          return;
        }
        
        try {
          const response = await fetch('http://localhost:8000/api/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ unique_id: finalUniqueId, full_name: fullName }),
          });
          const result = await response.json();
          
          if (result.success) {
            localStorage.setItem('user_name', fullName);
            localStorage.setItem('unique_id', finalUniqueId);
            localStorage.setItem('daily_saving', savingAmount.toString());
            if (!localStorage.getItem('saving_start_date')) {
              localStorage.setItem('saving_start_date', new Date().toISOString());
            }
            navigate('/');
          } else {
            setError(result.message);
          }
        } catch (err) {
          setError('Could not verify credentials. Please try again.');
        }
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8eef5] to-[#dce4ed] dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4 transition-colors duration-300">
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 p-3 rounded-2xl bg-white dark:bg-slate-900 neumorphic text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-lg z-50"
        aria-label="Toggle theme"
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <div className="neumorphic p-8 w-full max-w-md bg-white dark:bg-slate-900 border border-white/50 dark:border-slate-800">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Save Sense AI Portal</h1>
          <p className="text-gray-600 dark:text-gray-400">Secure access to your savings dashboard</p>
        </div>

        <div className="flex mb-8 p-1 neumorphic-inset rounded-xl">
          <button
            onClick={() => setIsNewUser(true)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              isNewUser ? 'neumorphic text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            New User
          </button>
          <button
            onClick={() => setIsNewUser(false)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              !isNewUser ? 'neumorphic text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Returning User
          </button>
        </div>
        
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">First Name</label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 neumorphic-inset bg-transparent border-none focus:outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Enter first name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Last Name</label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 neumorphic-inset bg-transparent border-none focus:outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Enter last name"
                required
              />
            </div>

            {!isNewUser && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                  <label htmlFor="uniqueId" className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Unique ID</label>
                  <input
                    id="uniqueId"
                    type="text"
                    value={uniqueId}
                    onChange={(e) => setUniqueId(e.target.value)}
                    className="w-full px-4 py-3 neumorphic-inset bg-transparent border-none focus:outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Enter your Unique ID (e.g. SS-123456)"
                    required
                  />
                </div>
              )}

            <div className="space-y-2">
              <label htmlFor="dailySaving" className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
                How much can you save daily? (PKR)
              </label>
              <input
                id="dailySaving"
                type="number"
                value={dailySaving}
                onChange={(e) => setDailySaving(e.target.value)}
                className="w-full px-4 py-3 neumorphic-inset bg-transparent border-none focus:outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Enter amount (50 - 10,000 PKR)"
                min={MIN_SAVING}
                max={MAX_SAVING}
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 ml-1">Min: {MIN_SAVING} PKR | Max: {MAX_SAVING.toLocaleString()} PKR</p>
            </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm text-center">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 mt-4 neumorphic-button text-blue-600 dark:text-blue-400 font-bold text-lg hover:text-blue-700 dark:hover:text-blue-300 active:scale-95 transition-all disabled:opacity-50"
              >
                {isLoading ? 'Please wait...' : (isNewUser ? 'Create Account' : 'Access Account')}
              </button>
          </form>

        <p className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
          {isNewUser 
            ? 'We will generate a Unique ID for you on the next page.' 
            : 'Enter your name and ID exactly as they appear in your account.'}
        </p>
      </div>
    </div>
  );
}
