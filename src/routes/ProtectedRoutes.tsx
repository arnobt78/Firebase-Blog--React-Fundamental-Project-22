/**
 * Protects routes: only renders children if user is authenticated (code walkthrough).
 * Otherwise redirects to "/" with replace so back button doesn't loop. Used for /create and /post/:id/edit.
 */
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