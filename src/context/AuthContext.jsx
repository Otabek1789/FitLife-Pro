import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('fitlife_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login'); // 'login' | 'register'

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('fitlife_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('fitlife_user');
    }
  }, [currentUser]);

  const login = (identifier, password, role = 'user') => {
    const isMockAdmin = identifier.toLowerCase().includes('admin') || role === 'admin';
    const user = {
      id: 'usr-' + Date.now(),
      name: isMockAdmin ? 'Admin Bobur (Boshqaruvchi)' : 'Azizbek Olimov (Sportchi)',
      usernameOrPhone: identifier,
      role: isMockAdmin ? 'admin' : 'user',
      avatar: isMockAdmin 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    };
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    return user;
  };

  const register = (name, identifier, password) => {
    const user = {
      id: 'usr-' + Date.now(),
      name: name || 'Yangi Foydalanuvchi',
      usernameOrPhone: identifier,
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    };
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    return user;
  };

  const quickDemoLogin = (role = 'user') => {
    if (role === 'admin') {
      login('admin@fitlife.uz', 'admin123', 'admin');
    } else {
      login('+998901234567', 'user123', 'user');
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const openAuthModal = (tab = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const isAdmin = currentUser?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin,
        login,
        register,
        quickDemoLogin,
        logout,
        isAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        openAuthModal,
        closeAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
