import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AgentStatus } from '../types';
import { mockUsers, mockAgentStatus } from '../data/mockData';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  isAuthenticated: boolean;
  users: User[];
  updateUser: (userId: string, updates: Partial<User>) => void;
  agentStatus: AgentStatus[];
  updateAgentStatus: (agentName: string, status: Partial<AgentStatus>) => void;
  isAdmin: boolean;
  toggleAdminMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [agentStatus, setAgentStatus] = useState<AgentStatus[]>(mockAgentStatus);
  const [isAdmin, setIsAdmin] = useState(false);

  // Custom setCurrentUser that handles onboarding status
  const setCurrentUserWithOnboarding = (user: User | null) => {
    if (user) {
      // For new users or users who haven't completed onboarding, set profile status to loading
      const needsOnboarding = !user.currentPath && user.profileStatus === 'loaded';
      setCurrentUser({
        ...user,
        profileStatus: needsOnboarding ? 'loading' : user.profileStatus
      });
    } else {
      setCurrentUser(null);
    }
  };

  const updateUser = (userId: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, ...updates } : user
    ));
    
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const updateAgentStatus = (agentName: string, status: Partial<AgentStatus>) => {
    setAgentStatus(prev => prev.map(agent => 
      agent.name === agentName ? { ...agent, ...status } : agent
    ));
  };

  const toggleAdminMode = () => {
    setIsAdmin(prev => !prev);
  };

  // Simulate real-time agent updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAgentStatus(prev => prev.map(agent => ({
        ...agent,
        queueSize: Math.max(0, agent.queueSize + Math.floor(Math.random() * 3) - 1),
        avgLatency: agent.avgLatency + (Math.random() - 0.5) * 0.2,
        lastProcessed: new Date()
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser: setCurrentUserWithOnboarding,
      isAuthenticated: currentUser !== null,
      users,
      updateUser,
      agentStatus,
      updateAgentStatus,
      isAdmin,
      toggleAdminMode
    }}>
      {children}
    </AppContext.Provider>
  );
};