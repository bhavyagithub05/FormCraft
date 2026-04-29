import { createContext, useContext, useState } from 'react';
import { loginUser, registerUser } from '../services/api';

const AuthContext = createContext();

// FIX 2: Tell Vite's Fast Refresh to ignore this specific export
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // FIX 1: "Lazy Initialization" - Check localStorage instantly on the first load
  // This completely removes the need for the useEffect!
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('formcraft_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

 // REAL LOGIN FUNCTION
  const login = async (credentials) => {
    // This calls your Node.js backend
    const { data } = await loginUser(credentials); 
    
    // Save token and user details
    localStorage.setItem('formcraft_token', data.token);
    localStorage.setItem('formcraft_user', JSON.stringify(data.user));
    setUser(data.user);
  };

  // REAL REGISTER FUNCTION
  const register = async (userData) => {
    // This calls your Node.js backend
    const { data } = await registerUser(userData);
    
    // Automatically log them in after successful signup
    localStorage.setItem('formcraft_token', data.token);
    localStorage.setItem('formcraft_user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('formcraft_user');
    localStorage.removeItem('formcraft_token'); // Make sure to delete the token!
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};