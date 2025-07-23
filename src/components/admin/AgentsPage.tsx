import React from 'react';
import { useApp } from '../../context/AppContext';
import { CogIcon, ExclamationTriangleIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AgentsPage: React.FC = () => {
  const { agentStatus } = useApp();

  // Mock latency data for charts
  const latencyData = [
    { time: '10:00', 'Profile Agent': 1.2, 'Assessment Agent': 2.1, 'Recommender Agent': 3.8, 'Tracker Agent': 0.8 },
    { time: '10:05', 'Profile Agent': 1.1, 'Assessment Agent': 2.3, 'Recommender Agent': 3.5, 'Tracker Agent': 0.9 },
    { time: '10:10', 'Profile Agent': 1.3, 'Assessment Agent': 2.0, 'Recommender Agent': 4.1, 'Tracker Agent': 0.7 },
    { time: '10:15', 'Profile Agent': 1.0, 'Assessment Agent': 2.2, 'Recommender Agent': 3.9, 'Tracker Agent': 0.8 },
    { time: '10:20', 'Profile Agent': 1.2, 'Assessment Agent': 2.1, 'Recommender Agent': 3.8, 'Tracker Agent': 0.8 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <ClockIcon className="w-5 h-5 text-blue-600" />;
      case 'error':
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />;
      default:
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Agentic Framework Monitor</h1>
        <p className="text-lg text-gray-600 mt-2">View agentic framework-managed queues, latencies, and error rates</p>
      </div>

      {/* Agentic Framework Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {agentStatus.map((agent) => (
          <div key={agent.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <CogIcon className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(agent.status)}`}>
                    {getStatusIcon(agent.status)}
                    <span className="ml-1">{agent.status}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Queue Size</span>
                <span className="text-sm font-medium">{agent.queueSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Latency</span>
                <span className="text-sm font-medium">{agent.avgLatency.toFixed(2)}s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Error Rate</span>
                <span className="text-sm font-medium">{(agent.errorRate * 100).toFixed(2)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Last Processed</span>
                <span className="text-sm font-medium">{agent.lastProcessed.toLocaleTimeString()}</span>
              </div>
            </div>

            {/* Queue visualization */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Queue Load</span>
                <span className="font-medium">{agent.queueSize}/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    agent.queueSize > 7 ? 'bg-red-500' : 
                    agent.queueSize > 4 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min((agent.queueSize / 10) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Agent Latency Trends</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={latencyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="Profile Agent" stroke="#2563EB" strokeWidth={2} />
            <Line type="monotone" dataKey="Assessment Agent" stroke="#7C3AED" strokeWidth={2} />
            <Line type="monotone" dataKey="Recommender Agent" stroke="#059669" strokeWidth={2} />
            <Line type="monotone" dataKey="Tracker Agent" stroke="#F59E0B" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Agent Details */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Agent Configuration & Health</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {agentStatus.map((agent) => (
              <div key={agent.name} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">{agent.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Status:</span>
                    <span className={`font-medium ${
                      agent.status === 'processing' ? 'text-blue-600' :
                      agent.status === 'error' ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Performance Score:</span>
                    <span className="font-medium text-gray-900">
                      {Math.round((1 - agent.errorRate) * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Throughput:</span>
                    <span className="font-medium text-gray-900">
                      {Math.round(60 / agent.avgLatency)} requests/min
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Uptime:</span>
                    <span className="font-medium text-green-600">99.9%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentsPage;