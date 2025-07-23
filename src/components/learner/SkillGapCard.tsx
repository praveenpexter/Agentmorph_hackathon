import React from 'react';
import { SkillGap } from '../../types';
import { ExclamationTriangleIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

interface SkillGapCardProps {
  skillGap: SkillGap;
}

const SkillGapCard: React.FC<SkillGapCardProps> = ({ skillGap }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getProgressColor = (gap: number) => {
    if (gap >= 3) return 'bg-red-500';
    if (gap >= 2) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{skillGap.skill}</h3>
          <p className="text-sm text-gray-600">{skillGap.category}</p>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(skillGap.priority)}`}>
          <ExclamationTriangleIcon className="w-3 h-3 mr-1" />
          {skillGap.priority}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Current Level</span>
          <span className="font-medium">{skillGap.currentLevel}/5</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Required Level</span>
          <span className="font-medium">{skillGap.requiredLevel}/5</span>
        </div>
        
        <div className="mt-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Skill Gap</span>
            <span className="font-medium text-gray-900">{skillGap.gap} levels</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getProgressColor(skillGap.gap)} transition-all duration-300`}
              style={{ width: `${(skillGap.gap / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillGapCard;