import React from 'react';
import { useApp } from '../../context/AppContext';
import LoginPage from '../auth/LoginPage';
import OnboardingPage from '../onboarding/OnboardingPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, currentUser } = useApp();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Check if user needs to complete onboarding
  if (currentUser && currentUser.profileStatus === 'loading') {
    return <OnboardingPage />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;