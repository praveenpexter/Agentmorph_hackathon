import React from 'react';
import { useApp } from '../../context/AppContext';
import { mockDepartmentAnalytics } from '../../data/mockData';
import { UserGroupIcon, ChartBarIcon, CogIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard: React.FC = () => {
  const { users, agentStatus } = useApp();

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.learningStatus === 'in-progress').length;
  const completedUsers = users.filter(u => u.learningStatus === 'completed').length;
  const avgCompletion = Math.round(users.reduce((acc, user) => acc + user.completionRate, 0) / totalUsers);

  const stats = [
    {
      name: 'Total Users',
      value: totalUsers,
      icon: UserGroupIcon,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      name: 'Active Learners',
      value: activeUsers,
      icon: ChartBarIcon,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      name: 'Avg Completion',
      value: `${avgCompletion}%`,
      icon: ChartBarIcon,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      name: 'Agent Issues',
      value: agentStatus.filter(a => a.status === 'error').length,
      icon: ExclamationTriangleIcon,
      color: 'text-red-600',
      bg: 'bg-red-50'
    }
  ];

  const departmentData = mockDepartmentAnalytics.map(dept => ({
    name: dept.department,
    completion: dept.averageCompletion,
    employees: dept.totalEmployees,
    engagement: dept.engagementScore
  }));

  const pieData = mockDepartmentAnalytics.map(dept => ({
    name: dept.department,
    value: dept.totalEmployees
  }));

  const COLORS = ['#2563EB', '#7C3AED', '#059669', '#F59E0B'];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-lg text-gray-600 mt-2">Overview of learning analytics and system performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Department Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completion" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Employee Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Employee Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Agent Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Agent Framework Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {agentStatus.map((agent) => (
            <div key={agent.name} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">{agent.name}</h3>
                <div className={`w-3 h-3 rounded-full ${
                  agent.status === 'processing' ? 'bg-blue-500' : 
                  agent.status === 'error' ? 'bg-red-500' : 'bg-green-500'
                }`} />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Queue Size:</span>
                  <span className="font-medium">{agent.queueSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Latency:</span>
                  <span className="font-medium">{agent.avgLatency.toFixed(1)}s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Error Rate:</span>
                  <span className="font-medium">{(agent.errorRate * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;