import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  role: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('userRole');
    if (storedUser) {
      setUser({
        name: localStorage.getItem('userName') || '',
        role: storedUser,
      });
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userName', user.name);
    } else {
      localStorage.removeItem('userRole');
      localStorage.removeItem('userName');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
