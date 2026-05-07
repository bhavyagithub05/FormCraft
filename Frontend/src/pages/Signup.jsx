import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Loader2, Mail, Lock, User, CheckCircle2, Sparkles, Layout, ArrowRight } from 'lucide-react';
import ThemeBtn from '../components/layout/ThemeBtn';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await register({ name, email, password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#fafafa] dark:bg-[#020617] transition-colors duration-500 overflow-hidden">

      
      
      {/* --- LEFT SIDE: THE CONTENT & VISUALS (Fills the Emptiness) --- */}
      <div className="hidden lg:flex w-[45%] relative flex-col justify-between p-16 overflow-hidden">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-blue-600/10 dark:bg-blue-500/10 rounded-full blur-[120px] animate-mesh" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 dark:bg-indigo-500/10 rounded-full blur-[120px] animate-mesh animation-delay-2000" />
        </div>

        {/* Logo Section */}
        <div className="relative z-10 flex items-center group">
          <div className="p-2 bg-blue-600 rounded-xl mr-3 shadow-lg shadow-blue-500/30">
            <Layout className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
            Form<span className="text-blue-600">Craft</span>
          </span>
        </div>

        {/* Feature Highlights */}
        <div className="relative z-10 space-y-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest">
              <Sparkles size={14} />
              <span>Free Forever Plan</span>
            </div>
            <h2 className="text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              Start building <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-400">smarter forms.</span>
            </h2>
          </div>

          <div className="space-y-6">
            {[
              "Drag-and-drop intuitive builder",
              "Real-time submission analytics",
              "100+ Premium form templates"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-slate-600 dark:text-slate-300 font-semibold text-lg">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Simple Footer Link */}
        <div className="relative z-10 text-slate-400 dark:text-slate-600 font-bold text-sm uppercase tracking-widest">
          Join 20k+ creators today.
        </div>
      </div>

      {/* --- RIGHT SIDE: THE SIGNUP CARD --- */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 relative bg-white dark:bg-slate-950/50 shadow-[-50px_0_100px_rgba(0,0,0,0.03)] dark:shadow-none">
        
        {/* Mobile Logo Only */}
        <div className="lg:hidden absolute top-8 left-8 flex items-center gap-2">
          <div className="p-1.5 bg-blue-600 rounded-lg">
            <Layout className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold dark:text-white tracking-tighter">FormCraft</span>
        </div>

        <div className="absolute top-8 right-8">
          <ThemeBtn />
        </div>

        <div className="w-full max-w-md">
          <div className="mb-2 mt-10 text-center lg:text-left">
            <h1 className="text-3xl font-black font-light text-slate-900 dark:text-white mb-3">Create Account</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium italic">"The fastest way to build web forms."</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border-l-4 border-red-500 text-red-600 dark:text-red-400 text-sm font-bold animate-in fade-in slide-in-from-top-1">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text" required value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                  placeholder="Enter your name"
                />  
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Work Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                  placeholder="••••••••"
                />
                <button 
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            {/* Submit Button */}
            <button 
              type="submit" disabled={isLoading}
              className="w-full bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-black py-3 rounded-2xl transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3 group mt-6"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : 'Get Started Now'}
              {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <p className="text-center text-slate-500 dark:text-slate-400 text-sm mt-10 font-semibold">
            Already a member? <Link to="/login" className="text-blue-600 hover:underline">Log in to dashboard</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;