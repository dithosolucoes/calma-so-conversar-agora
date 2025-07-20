
import React, { createContext, useContext, useEffect, useState } from 'react';

interface Writer {
  id: string;
  nome: string;
  email: string;
  avatar?: string;
}

interface WriterAuthContextType {
  writer: Writer | null;
  login: (writerData: Omit<Writer, 'id'>) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const WriterAuthContext = createContext<WriterAuthContextType | undefined>(undefined);

export const WriterAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [writer, setWriter] = useState<Writer | null>(null);

  useEffect(() => {
    const savedWriter = localStorage.getItem('writer');
    if (savedWriter) {
      setWriter(JSON.parse(savedWriter));
    }
  }, []);

  const login = (writerData: Omit<Writer, 'id'>) => {
    const newWriter: Writer = {
      ...writerData,
      id: `writer_${Date.now()}`,
    };
    
    setWriter(newWriter);
    localStorage.setItem('writer', JSON.stringify(newWriter));
  };

  const logout = () => {
    setWriter(null);
    localStorage.removeItem('writer');
  };

  const isAuthenticated = !!writer;

  return (
    <WriterAuthContext.Provider value={{ writer, login, logout, isAuthenticated }}>
      {children}
    </WriterAuthContext.Provider>
  );
};

export const useWriterAuth = () => {
  const context = useContext(WriterAuthContext);
  if (context === undefined) {
    throw new Error('useWriterAuth must be used within a WriterAuthProvider');
  }
  return context;
};
