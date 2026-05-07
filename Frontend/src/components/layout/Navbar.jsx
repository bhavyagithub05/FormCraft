import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Layout, LogOut, Menu, X, User } from 'lucide-react';
import ThemeBtn from './ThemeBtn'; 
import { useAuth } from '../../context/AuthContext'; 

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/login');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Define paths where the Navbar should be hidden
  const hideNavbarPaths = ['/login', '/signup'];
  const isAuthPage = hideNavbarPaths.includes(location.pathname);
  const isFormPage = location.pathname.startsWith('/form/');

  // Do not render Navbar on Auth or Form-filling pages
  if (isAuthPage || isFormPage) {
    return null;
  }

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center group">
            <div className="p-2 bg-blue-600 rounded-xl mr-2.5 group-hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
              <Layout className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Form<span className="text-blue-600">Craft</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <ThemeBtn />
            
            {user ? (
              <div className="flex items-center gap-6">
                <Link 
                  to="/" 
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === '/' 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-blue-600'
                  }`}
                >
                  Dashboard
                </Link>

                {/* User Profile Dropdown Placeholder / Info */}
                <div className="flex items-center pl-6 border-l border-slate-200 dark:border-slate-800 gap-3">
                  <div className="flex flex-col text-right">
                    <span className="text-sm font-bold text-slate-900 dark:text-white capitalize leading-none">
                      {user.name}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {user.email}
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                    <User className="w-5 h-5" />
                  </div>
                  
                  <button 
                    onClick={handleLogout}
                    className="ml-2 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="px-5 py-2.5 bg-slate-900 dark:bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-blue-700 transition-all shadow-md active:scale-95"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle & Theme */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeBtn />
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-4 pt-2 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          {user && (
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0">
                <User className="w-7 h-7" />
              </div>
              <div className="overflow-hidden">
                <p className="text-slate-900 dark:text-white font-bold truncate capitalize">{user.name}</p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
            </div>
          )}

          <div className="space-y-1">
            {user ? (
              <>
                <Link 
                  to="/" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center w-full px-4 py-3 text-slate-700 dark:text-slate-200 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 rounded-xl transition-colors"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                >
                  <LogOut className="w-5 h-5 mr-3" /> Logout
                </button>
              </>
            ) : (
              <div className="grid grid-cols-1 gap-2 pt-2">
                <Link 
                  to="/login" 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-center px-4 py-3 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-center px-4 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg"
                >
                  Sign Up Free
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;