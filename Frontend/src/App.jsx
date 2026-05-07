import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext'; 

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; 
import Login from './pages/Login';
import Signup from './pages/Signup';

import Dashboard from './pages/Dashboard';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FormBuilder from './pages/FormBuilder';
import FormResponses from './pages/FormResponses';
import LiveForm from './pages/LiveForm';

// 1. Create a sub-component to handle the routing logic and layout
const AppContent = () => {
  const location = useLocation();

  // Define logic for showing footer
  const showFooterPaths = ['/', '/dashboard'];
  const isResponsesPage = location.pathname.startsWith('/responses');
  const shouldShowFooter = showFooterPaths.includes(location.pathname) || isResponsesPage;

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-900 transition-colors duration-300">
      <Navbar />

      <main className="grow">
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/form/:formId" element={<LiveForm />} />
          
          {/* PROTECTED ROUTES */}
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/builder" element={<ProtectedRoute><FormBuilder /></ProtectedRoute>} />
          <Route path="/builder/:formId" element={<ProtectedRoute><FormBuilder /></ProtectedRoute>} />
          <Route path="/responses/:formId" element={<ProtectedRoute><FormResponses /></ProtectedRoute>} />
        </Routes>
      </main>

      {/* Footer now has access to useLocation because it is inside <Router> */}
      {shouldShowFooter && <Footer/>}
    </div>
  );
};

// 2. The main App component just provides the Context and Router
function App() {
  const [themeMode, setThemeMode] = useState("light");

  const lightTheme = () => setThemeMode("light");
  const darkTheme = () => setThemeMode("dark");

  useEffect(() => {
    const html = document.querySelector('html');
    html.classList.remove("light", "dark");
    html.classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;