import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { name, role: 'customer' | 'vendor' | 'admin' }

  const login = (role) => {
    if (role === 'customer') setUser({ name: 'Rohan (Customer)', role });
    if (role === 'vendor') setUser({ name: 'Urban Edge Interiors (Vendor)', role });
    if (role === 'admin') setUser({ name: 'DreamDwell Admin', role });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
