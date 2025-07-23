import React from 'react';
import { useApp } from '../../context/AppContext';
import LearningPathCard from './LearningPathCard';
import { BookOpenIcon } from '@heroicons/react/24/outline';

const LearningPage: React.FC = () => {
  const { currentUser } = useApp();

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Learning Path</h1>
        <p className="text-lg text-gray-600 mt-2">Personalized training based on your skill gaps and TSR requirements</p>
      </div>

      {currentUser.currentPath ? (
        <div className="grid grid-cols-1 gap-8">
          <LearningPathCard path={currentUser.currentPath} />
          
          {/* Additional Learning Resources */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended Next Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
                <h3 className="font-medium text-gray-900 mb-2">Advanced Microservices</h3>
                <p className="text-sm text-gray-600 mb-3">Deep dive into microservices architecture patterns</p>
                <div className="flex items-center text-sm text-gray-500">
                  <BookOpenIcon className="w-4 h-4 mr-1" />
                  24 hours • Advanced
                </div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
                <h3 className="font-medium text-gray-900 mb-2">Cloud Security Fundamentals</h3>
                <p className="text-sm text-gray-600 mb-3">Essential security practices for cloud applications</p>
                <div className="flex items-center text-sm text-gray-500">
                  <BookOpenIcon className="w-4 h-4 mr-1" />
                  16 hours • Intermediate
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <BookOpenIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Learning Path Yet</h2>
          <p className="text-gray-600 mb-6">Complete your skill assessment to get personalized recommendations</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Start Assessment
          </button>
        </div>
      )}
    </div>
  );
};

export default LearningPage;