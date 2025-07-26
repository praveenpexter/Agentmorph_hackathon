import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Navigation from './components/layout/Navigation';
import OnboardingPage from './components/onboarding/OnboardingPage';
import Dashboard from './components/learner/Dashboard';
import LearningPage from './components/learner/LearningPage';
import AssessmentsPage from './components/learner/AssessmentsPage';
import AdminDashboard from './components/admin/AdminDashboard';
import UsersPage from './components/admin/UsersPage';
import AgentsPage from './components/admin/AgentsPage';
import AnalyticsPage from './components/admin/AnalyticsPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <ProtectedRoute>
          <div className="flex min-h-screen bg-gray-50">
            <Navigation />
            <main className="flex-1 overflow-auto">
              <Routes>
                {/* Learner Routes */}
                <Route path="/onboarding" element={<OnboardingPage />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/learning" element={<LearningPage />} />
                <Route path="/assessments" element={<AssessmentsPage />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<UsersPage />} />
                <Route path="/admin/agents" element={<AgentsPage />} />
                <Route path="/admin/analytics" element={<AnalyticsPage />} />
              </Routes>
            </main>
          </div>
        </ProtectedRoute>
      </Router>
    </AppProvider>
  );
}

export default App;