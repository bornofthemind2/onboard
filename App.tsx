import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import PlanPage from './components/PlanPage';
import ExplorePage from './components/ExplorePage';
import ReflectPage from './components/ReflectPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'plan' | 'explore' | 'reflect'>('landing');

  return (
    <div className="bg-gray-900 min-h-screen">
      {currentPage === 'landing' && (
        <LandingPage 
          onPlanClick={() => setCurrentPage('plan')} 
          onReflectClick={() => setCurrentPage('reflect')}
          onExploreClick={() => setCurrentPage('explore')}
        />
      )}
      {currentPage === 'plan' && (
        <PlanPage onBack={() => setCurrentPage('landing')} />
      )}
      {currentPage === 'explore' && (
        <ExplorePage onBack={() => setCurrentPage('landing')} />
      )}
      {currentPage === 'reflect' && (
        <ReflectPage 
          onBack={() => setCurrentPage('landing')} 
          onPostComplete={() => setCurrentPage('explore')}
        />
      )}
    </div>
  );
};

export default App;