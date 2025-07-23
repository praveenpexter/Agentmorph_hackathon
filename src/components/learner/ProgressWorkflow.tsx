import React from 'react';
import { User } from '../../types';
import { CheckCircleIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

interface ProgressWorkflowProps {
  user: User;
}

const ProgressWorkflow: React.FC<ProgressWorkflowProps> = ({ user }) => {
  const steps = [
    {
      name: 'Profile Loaded',
      status: user.profileStatus,
      description: 'Analyzing your skills and background'
    },
    {
      name: 'Assessment Pending',
      status: user.assessmentStatus === 'pending' ? 'pending' : user.assessmentStatus === 'in-progress' ? 'in-progress' : 'completed',
      description: 'Evaluating current competency levels'
    },
    {
      name: 'Assessment Completed',
      status: user.assessmentStatus === 'completed' ? 'completed' : 'pending',
      description: 'Skills assessment finished'
    },
    {
      name: 'Recommendations Generated',
      status: user.recommendationStatus === 'ready' ? 'completed' : user.recommendationStatus === 'generating' ? 'in-progress' : 'pending',
      description: 'Personalized learning path created'
    },
    {
      name: 'Learning In Progress',
      status: user.learningStatus === 'in-progress' ? 'in-progress' : user.learningStatus === 'completed' ? 'completed' : 'pending',
      description: 'Actively following learning path'
    }
  ];

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'loaded':
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      case 'in-progress':
      case 'generating':
        return <ClockIcon className="w-5 h-5 text-blue-600 animate-spin" />;
      case 'error':
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />;
    }
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'loaded':
        return 'bg-green-600';
      case 'in-progress':
      case 'generating':
        return 'bg-blue-600';
      case 'error':
        return 'bg-red-600';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Real-Time Workflow Progress</h3>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="relative">
        {/* Progress bar background */}
        <div className="absolute top-6 left-6 w-full h-0.5 bg-gray-200" style={{ width: 'calc(100% - 3rem)' }} />
        
        {/* Progress bar fill */}
        <div 
          className="absolute top-6 left-6 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-1000"
          style={{ 
            width: `calc(${(steps.filter(step => step.status === 'completed' || step.status === 'loaded').length / steps.length) * 100}% - 3rem)` 
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((step, index) => (
            <div key={step.name} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getStepColor(step.status)} mb-3 relative z-10 transition-all duration-300`}>
                  {getStepIcon(step.status)}
                </div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">{step.name}</h4>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressWorkflow;