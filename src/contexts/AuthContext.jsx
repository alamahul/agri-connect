import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Mock users data
const mockUsers = [
  { id: 1, email: 'petani@agriconnect.com', passwordHash: 'password', role: 'petani', fullName: 'Budi Petani' },
  { id: 2, email: 'pembeli@agriconnect.com', passwordHash: 'password', role: 'pembeli', fullName: 'Siti Pembeli' },
  { id: 3, email: 'admin@agriconnect.com', passwordHash: 'password', role: 'admin', fullName: 'Agri Admin' },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for session
    const storedUser = localStorage.getItem('agriconnect_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = mockUsers.find((u) => u.email === email && u.passwordHash === password);
        if (foundUser) {
          const userData = { id: foundUser.id, email: foundUser.email, role: foundUser.role, fullName: foundUser.fullName };
          setUser(userData);
          localStorage.setItem('agriconnect_user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 800); // Simulate network delay
    });
  };

  const register = async (email, password, role, fullName) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUser = mockUsers.find((u) => u.email === email);
        if (existingUser) {
          reject(new Error('Email already registered'));
        } else {
          const newUser = { id: Date.now(), email, passwordHash: password, role, fullName };
          mockUsers.push(newUser); // Note: This resets on reload since it's just a local array, but it's fine for mock
          const userData = { id: newUser.id, email: newUser.email, role: newUser.role, fullName: newUser.fullName };
          resolve(userData);
        }
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agriconnect_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
