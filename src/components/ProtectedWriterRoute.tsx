
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useWriterAuth } from '@/contexts/WriterAuthContext';

interface ProtectedWriterRouteProps {
  children: ReactNode;
}

export const ProtectedWriterRoute = ({ children }: ProtectedWriterRouteProps) => {
  const { isAuthenticated } = useWriterAuth();

  if (!isAuthenticated) {
    return <Navigate to="/escritor/login" replace />;
  }

  return <>{children}</>;
};
