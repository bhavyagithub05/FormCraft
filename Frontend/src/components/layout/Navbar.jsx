import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Layout, LogOut, Menu, X, User } from 'lucide-react'; // Added User icon
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

  if (location.pathname.startsWith('/form/')) {
    return null;
  }

  return (
    <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 shadow-sm sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center group">
            <div className="p-1.5 bg-blue-600 rounded-lg mr-2 group-hover:bg-blue-700 transition-colors">
              <Layout className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Form<span className="text-blue-600">Craft</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-600 dark:text-gray-300">
            
            {/* NEW: User Info Badge (Desktop) */}
            {user && (
              <div className="flex items-center space-x-3 pr-4 border-r border-gray-200 dark:border-slate-700">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-slate-700 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <User className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-900 dark:text-white font-semibold leading-tight capitalize">
                    {user.name}
                  </span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
                    {user.email}
                  </span>
                </div>
              </div>
            )}

            <ThemeBtn />
            {user ? (
              <>
                <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Dashboard</Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-1.5" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Login</Link>
                <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Right Side */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeBtn />
            <button 
              onClick={toggleMenu}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700 px-4 py-4 space-y-4 shadow-xl">
          
          {/* NEW: User Info Header (Mobile) */}
          {user && (
            <div className="pb-4 mb-2 border-b border-gray-100 dark:border-slate-700 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <User className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-bold capitalize">{user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
            </div>
          )}

          {user ? (
            <>
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium"
              >
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center text-red-500 hover:text-red-700 font-medium w-full text-left"
              >
                <LogOut className="w-5 h-5 mr-2" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;