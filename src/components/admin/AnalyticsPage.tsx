import React, { useState } from 'react';
import { mockDepartmentAnalytics } from '../../data/mockData';
import { ArrowDownTrayIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const AnalyticsPage: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [dateRange, setDateRange] = useState('30d');

  // Mock trend data
  const trendData = [
    { month: 'Jan', completion: 45, engagement: 60, cost: 45000 },
    { month: 'Feb', completion: 52, engagement: 65, cost: 52000 },
    { month: 'Mar', completion: 48, engagement: 62, cost: 48000 },
    { month: 'Apr', completion: 65, engagement: 72, cost: 65000 },
    { month: 'May', completion: 70, engagement: 78, cost: 70000 },
    { month: 'Jun', completion: 68, engagement: 75, cost: 68000 },
  ];

  const skillGapTrends = [
    { skill: 'Kubernetes', gap: 2.4, trend: '+0.3' },
    { skill: 'React Native', gap: 1.4, trend: '-0.2' },
    { skill: 'Deep Learning', gap: 2.3, trend: '+0.1' },
    { skill: 'Automation Testing', gap: 1.8, trend: '-0.1' },
    { skill: 'Microservices', gap: 1.2, trend: '-0.4' }
  ];

  const generateReport = () => {
    // Simulate report generation
    alert('Report generation started. You will receive an email when the report is ready.');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Report Generation</h1>
        <p className="text-lg text-gray-600 mt-2">Generate learning reports by individual or department</p>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Configuration</h2>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Departments (Department Report)</option>
              {mockDepartmentAnalytics.map(dept => (
                <option key={dept.department} value={dept.department}>{dept.department} Department</option>
              ))}
            </select>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>

          <button
            onClick={generateReport}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
            Generate Learning Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Performance</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Avg Completion Rate</span>
              <span className="font-semibold text-gray-900">69%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg Engagement</span>
              <span className="font-semibold text-gray-900">73%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Training Cost</span>
              <span className="font-semibold text-gray-900">$290K</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Efficiency</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Cost per Employee</span>
              <span className="font-semibold text-gray-900">$3,053</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Hours per Skill Gap</span>
              <span className="font-semibold text-gray-900">14.2h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ROI Estimate</span>
              <span className="font-semibold text-green-600">+248%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Development</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Skills Improved</span>
              <span className="font-semibold text-gray-900">127</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg Gap Reduction</span>
              <span className="font-semibold text-gray-900">1.8 levels</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Certification Rate</span>
              <span className="font-semibold text-gray-900">84%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Learning Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="completion" stroke="#2563EB" strokeWidth={3} name="Completion %" />
              <Line type="monotone" dataKey="engagement" stroke="#059669" strokeWidth={3} name="Engagement %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Department Comparison</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockDepartmentAnalytics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="averageCompletion" fill="#2563EB" radius={[4, 4, 0, 0]} name="Completion %" />
              <Bar dataKey="engagementScore" fill="#7C3AED" radius={[4, 4, 0, 0]} name="Engagement %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Skill Gap Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Critical Skill Gaps</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Skill</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Avg Gap</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Trend</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Affected Employees</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Training Cost</th>
              </tr>
            </thead>
            <tbody>
              {skillGapTrends.map((skill, index) => (
                <tr key={skill.skill} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-gray-900">{skill.skill}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-3" style={{ width: '60px' }}>
                        <div 
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: `${(skill.gap / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{skill.gap}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-medium ${skill.trend.startsWith('+') ? 'text-red-600' : 'text-green-600'}`}>
                      {skill.trend}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-900">{Math.floor(Math.random() * 20) + 10}</td>
                  <td className="py-4 px-4 text-gray-900">${(Math.random() * 50000 + 10000).toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;