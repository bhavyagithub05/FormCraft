import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Loader2, Mail, Lock, ArrowRight, Zap, Layout } from 'lucide-react';
import ThemeBtn from '../components/layout/ThemeBtn';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-[#020617] relative overflow-hidden transition-colors duration-500">
      
      {/* Mobile-Specific Radial Overlay: Adds depth on small screens */}
      <div className="absolute inset-0 z-0 block lg:hidden bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.05),transparent_70%)]" />

      {/* Brand Logo - Repositioned for Mobile vs Desktop */}
      <div className="absolute top-6 left-6 lg:top-8 lg:left-8 flex items-center gap-2 z-20">
        <div className="w-9 h-9 lg:w-10 lg:h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/40">
          <Layout className="w-6 h-6 text-white" />
        </div>
        <span className="text-lg lg:text-xl font-black tracking-tighter dark:text-white uppercase">
          Form<span className="text-blue-600">Craft</span>
        </span>
      </div>

      {/* --- ANIMATED MESH BACKGROUND (Enhanced for Mobile) --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Increased size and opacity slightly for mobile visibility */}
        <div className="absolute top-[-5%] left-[-10%] w-[80%] lg:w-[60%] h-[50%] bg-blue-500/30 dark:bg-blue-600/20 rounded-full blur-[80px] lg:blur-[120px] animate-mesh" />
        <div className="absolute bottom-[5%] right-[-10%] w-[80%] lg:w-[50%] h-[50%] bg-indigo-500/30 dark:bg-indigo-600/20 rounded-full blur-[80px] lg:blur-[120px] animate-mesh animation-delay-2000" />
      </div>

      <div className="fixed top-6 right-6 lg:top-8 lg:right-8 z-50">
        <ThemeBtn />
      </div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between px-6 gap-12">
        
        {/* Left Side: Branding (Desktop Only) */}
        <div className="hidden lg:block w-1/2 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/50 dark:bg-white/5 border border-white/20 backdrop-blur-md mb-4">
            <Zap className="w-5 h-5 text-blue-600 fill-current" />
            <span className="text-sm font-bold dark:text-white uppercase tracking-tighter">Version 2.0 is live</span>
          </div>
          <h1 className="text-7xl font-black text-slate-900 dark:text-white leading-tight tracking-tighter">
            Build the <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-400">Future.</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium max-w-sm">
            Sign in to access your dashboard and manage your dynamic forms with ease.
          </p>
        </div>

        {/* Right Side: The Card */}
        <div className="w-full max-w-md">
          {/* 
            MOBILE TWEAKS: 
            - Removed absolute 'backdrop-blur-3xl' for performance on older phones 
            - Added 'bg-white/40' for better contrast on mobile background blobs
            - Kept border and padding only for Desktop (LG)
          */}
          <div className=" dark:xl:bg-slate-900/40 xl:backdrop-blur-3xl xl:border xl:border-white dark:xl:border-white/10 xl:p-10 rounded-[2.5rem] xl:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] p-0 border-none shadow-none">
            
            <div className="mb-8 mt-12 lg:mt-0 flex flex-col items-center lg:items-start">
              <h2 className="text-4xl font-light lg:text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Sign In</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Welcome back, let's get to work.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-4 bg-red-500/10 text-red-600 text-xs font-bold rounded-2xl border border-red-500/20 text-center uppercase tracking-widest animate-pulse">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Identity</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-2 lg:py-3 bg-white/80 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Secret</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-2 lg:py-3 bg-white/80 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm"
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <button 
                type="submit" disabled={isLoading}
                className="mt-10 w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 lg:py-4 rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 group active:scale-95"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : 'Enter Dashboard'}
                {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            <div className="mt-10 flex flex-col items-center gap-4">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                New user? <Link to="/signup" className="text-blue-600 font-black hover:underline underline-offset-4">Create account</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;