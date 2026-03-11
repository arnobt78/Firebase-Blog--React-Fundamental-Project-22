import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRoutesProps {
  children: ReactNode;
}

export function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const { isAuth } = useAuth();
  return isAuth ? <>{children}</> : <Navigate to="/" replace />;
}