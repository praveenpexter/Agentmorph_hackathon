import React from 'react';
import { LearningPath } from '../../types';
import { ClockIcon, PlayIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface LearningPathCardProps {
  path: LearningPath;
}

const LearningPathCard: React.FC<LearningPathCardProps> = ({ path }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <PlayIcon className="w-5 h-5 text-blue-600" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-blue-100 text-blue-800';
      case 'exercise': return 'bg-green-100 text-green-800';
      case 'quiz': return 'bg-purple-100 text-purple-800';
      case 'project': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600';
      case 'intermediate': return 'text-yellow-600';
      case 'advanced': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{path.title}</h3>
            <p className="text-gray-600 mt-1">{path.description}</p>
            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
              <span><strong>Status:</strong> {path.completionStatus.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
              <span><strong>Estimated Time:</strong> {path.estimatedHours} hours</span>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <ClockIcon className="w-4 h-4 mr-1" />
            {path.estimatedHours}h
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{path.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${path.progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        <h4 className="font-medium text-gray-900 mb-4">Learning Modules</h4>
        <div className="space-y-3">
          {path.modules.map((module) => (
            <div key={module.id} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
              {getStatusIcon(module.status)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h5 className="text-sm font-medium text-gray-900 truncate">{module.title}</h5>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(module.type)}`}>
                      {module.type}
                    </span>
                    <span className={`text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
                      {module.difficulty}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">{module.description}</p>
                <div className="flex items-center mt-1 text-xs text-gray-400">
                  <ClockIcon className="w-3 h-3 mr-1" />
                  {module.estimatedTime}h
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningPathCard;