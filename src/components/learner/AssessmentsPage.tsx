import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BeakerIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

const AssessmentsPage: React.FC = () => {
  const { currentUser, updateUser } = useApp();
  const [activeAssessment, setActiveAssessment] = useState<string | null>(null);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const assessments = [
    {
      id: 'react-native',
      title: 'React Native Development',
      description: 'Evaluate your React Native skills including components, navigation, and state management',
      duration: '45 minutes',
      questions: 25,
      status: currentUser.assessmentStatus === 'completed' ? 'completed' : 'available',
      score: currentUser.assessmentStatus === 'completed' ? 75 : null
    },
    {
      id: 'microservices',
      title: 'Microservices Architecture',
      description: 'Test your understanding of microservices patterns, communication, and deployment',
      duration: '60 minutes',
      questions: 30,
      status: 'available',
      score: null
    },
    {
      id: 'cloud-security',
      title: 'Cloud Security',
      description: 'Assess your knowledge of cloud security best practices and compliance',
      duration: '40 minutes',
      questions: 20,
      status: 'locked',
      score: null
    }
  ];

  const startAssessment = (assessmentId: string) => {
    setActiveAssessment(assessmentId);
    updateUser(currentUser.id, { assessmentStatus: 'in-progress' });
    
    // Simulate assessment completion after 3 seconds
    setTimeout(() => {
      updateUser(currentUser.id, { 
        assessmentStatus: 'completed',
        recommendationStatus: 'generating'
      });
      setActiveAssessment(null);
      
      // Simulate recommendation generation
      setTimeout(() => {
        updateUser(currentUser.id, { recommendationStatus: 'ready' });
      }, 2000);
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'available': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'locked': return 'text-gray-400 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Skill Assessments</h1>
        <p className="text-lg text-gray-600 mt-2">Evaluate your current competencies to identify learning opportunities</p>
      </div>

      {/* Assessment Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Assessment Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">1</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">2</div>
            <div className="text-sm text-gray-600">Available</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-400">1</div>
            <div className="text-sm text-gray-600">Locked</div>
          </div>
        </div>
      </div>

      {/* Assessments List */}
      <div className="space-y-6">
        {assessments.map((assessment) => (
          <div key={assessment.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <BeakerIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{assessment.title}</h3>
                    <p className="text-gray-600 mt-1">{assessment.description}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(assessment.status)}`}>
                  {assessment.status === 'completed' && <CheckCircleIcon className="w-4 h-4 mr-1" />}
                  {assessment.status === 'available' && <ClockIcon className="w-4 h-4 mr-1" />}
                  {assessment.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  Duration: {assessment.duration}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <BeakerIcon className="w-4 h-4 mr-2" />
                  Questions: {assessment.questions}
                </div>
                {assessment.score && (
                  <div className="flex items-center text-sm font-medium text-green-600">
                    <CheckCircleIcon className="w-4 h-4 mr-2" />
                    Score: {assessment.score}%
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                {assessment.status === 'available' && (
                  <button
                    onClick={() => startAssessment(assessment.id)}
                    disabled={activeAssessment !== null}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {activeAssessment === assessment.id ? 'In Progress...' : 'Start Assessment'}
                  </button>
                )}
                {assessment.status === 'completed' && (
                  <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    View Results
                  </button>
                )}
                {assessment.status === 'locked' && (
                  <button disabled className="bg-gray-100 text-gray-400 px-6 py-2 rounded-lg cursor-not-allowed">
                    Complete Prerequisites
                  </button>
                )}
              </div>
            </div>

            {activeAssessment === assessment.id && (
              <div className="border-t border-gray-200 bg-blue-50 p-4">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm text-blue-800">Assessment in progress... This may take a few minutes.</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssessmentsPage;