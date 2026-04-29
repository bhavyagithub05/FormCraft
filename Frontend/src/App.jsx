import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext'; 

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // <-- 1. Import it here
import Login from './pages/Login';
import Signup from './pages/Signup';

import Dashboard from './pages/Dashboard';
import Navbar from './components/layout/Navbar';
import FormBuilder from './pages/FormBuilder';
import FormResponses from './pages/FormResponses';
import LiveForm from './pages/LiveForm';

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
          <div className="min-h-screen flex flex-col font-sans text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-900 transition-colors duration-300">
            <Navbar />

            <main className="grow">
              <Routes>
                {/* PUBLIC ROUTES (Anyone can access these) */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* PUBLIC LIVE FORM (Anyone can fill out a form) */}
                <Route path="/form/:formId" element={<LiveForm />} />
                
                {/* PROTECTED ROUTES (Must be logged in) */}
                <Route 
                  path="/" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/builder" 
                  element={
                    <ProtectedRoute>
                      <FormBuilder />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/builder/:formId" 
                  element={
                    <ProtectedRoute>
                      <FormBuilder />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/responses/:formId" 
                  element={
                    <ProtectedRoute>
                      <FormResponses />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;