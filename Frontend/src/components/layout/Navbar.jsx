import { Link, useNavigate } from 'react-router-dom';
import { Layout, LogOut } from 'lucide-react'; // Added LogOut icon
import ThemeBtn from './ThemeBtn'; 
import { useAuth } from '../../context/AuthContext'; // Import Auth context

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 shadow-sm sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <Link to="/" className="flex items-center group">
          <div className="p-1.5 bg-blue-600 rounded-lg mr-3 group-hover:bg-blue-700 transition-colors">
            <Layout className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Form<span className="text-blue-600">Craft</span>
          </span>
        </Link>

        <div className="flex items-center space-x-6 text-sm font-medium text-gray-600 dark:text-gray-300">
            {/* Theme Toggle Button (Always visible) */}
            <ThemeBtn />
            
            {/* Conditional Auth Rendering */}
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
      </div>
    </nav>
  );
};

export default Navbar;