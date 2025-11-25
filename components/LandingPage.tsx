import React, { useState, useEffect, useRef } from 'react';
import PlanIcon from './icons/PlanIcon';
import ReflectIcon from './icons/ReflectIcon';
import ExploreIcon from './icons/ExploreIcon';

type View = 'number' | 'stackedText' | 'drawer';

interface LandingPageProps {
  onPlanClick?: () => void;
  onExploreClick?: () => void;
  onReflectClick?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onPlanClick, onExploreClick, onReflectClick }) => {
  const [view, setView] = useState<View>('number');
  const [isDrawerExpanded, setIsDrawerExpanded] = useState(false);
  const touchStartY = useRef<number | null>(null);

  // Transition from 'number' to 'stackedText'
  useEffect(() => {
    if (view !== 'number') return;
    const timer = setTimeout(() => {
      setView('stackedText');
    }, 1500);
    return () => clearTimeout(timer);
  }, [view]);

  // Transition from 'stackedText' to 'drawer'
  useEffect(() => {
    if (view !== 'stackedText') return;
    const timer = setTimeout(() => {
      setView('drawer');
    }, 2000);
    return () => clearTimeout(timer);
  }, [view]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartY.current === null || view !== 'drawer') {
      return;
    }
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;

    if (deltaY > 30) {
      setIsDrawerExpanded(true);
    } else if (deltaY < -30) {
      setIsDrawerExpanded(false);
    }
    touchStartY.current = null;
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (view !== 'drawer') return;
    if (e.deltaY > 0) {
      setIsDrawerExpanded(true);
    } else if (e.deltaY < 0) {
      setIsDrawerExpanded(false);
    }
  };

  const handleToggleDrawer = () => {
    if (view === 'drawer') {
      setIsDrawerExpanded((prev) => !prev);
    }
  };

  const handleNumberClick = () => {
    if (view === 'number') setView('stackedText');
  };

  const handleStackedTextClick = () => {
    if (view === 'stackedText') setView('drawer');
  };

  const drawerSlideClass = view === 'drawer' ? 'translate-y-0' : 'translate-y-full';
  const drawerHeightClass = isDrawerExpanded ? 'h-[80vh]' : 'h-[45vh]';

  const numberIsVisible = view === 'number';
  const stackedTextIsVisible = view !== 'number' && !isDrawerExpanded;
  const headerIsVisible = view === 'drawer' && isDrawerExpanded;
  const iconsAreVisible = view === 'drawer';
  const stackedTextTransformClass = view === 'drawer' ? '-translate-y-[22.5vh]' : 'translate-y-0';

  return (
    <main className="h-screen w-full bg-gray-900 text-white font-sans overflow-x-hidden">
      <div className="h-screen w-full flex flex-col items-center justify-center overflow-hidden relative">
        {/* Header Text */}
        <div
          className={`absolute top-8 left-1/2 -translate-x-1/2 text-2xl font-bold tracking-widest transition-opacity duration-500 ease-in-out ${
            headerIsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <span>NINE DAYS</span>
        </div>

        {/* Central Content Area */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Large number 9 */}
          <div
            onClick={handleNumberClick}
            className={`transition-all duration-700 ease-in-out cursor-pointer ${
              numberIsVisible
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-50 pointer-events-none'
            }`}
          >
            <span
              className="text-[300px] font-bold text-gray-700"
              style={{ lineHeight: 1 }}
            >
              9
            </span>
          </div>

          {/* Stacked NINE DAYS */}
          <div
            onClick={handleStackedTextClick}
            className={`absolute flex flex-col items-center justify-center transition-all duration-1000 ease-in-out cursor-pointer ${
              stackedTextIsVisible
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-90 pointer-events-none'
            } ${stackedTextTransformClass}`}
          >
            <span className="text-[120px] font-bold text-gray-400 leading-none tracking-wider">
              NINE
            </span>
            <span className="text-[120px] font-bold text-gray-400 leading-none tracking-wider">
              DAYS
            </span>
          </div>
        </div>

        {/* Drawer with Icons */}
        <div
          className={`absolute bottom-0 w-full bg-gray-800 rounded-t-3xl ${drawerSlideClass} ${drawerHeightClass}`}
          style={{
            transition: 'transform 1s ease-in-out, height 0.5s ease-in-out',
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
        >
          <div className="pt-4 px-8 h-full relative flex flex-col">
            {/* Swipe handle */}
            <div
              className="w-10 h-1.5 bg-gray-600 rounded-full mx-auto flex-shrink-0 mb-4 cursor-pointer"
              onClick={handleToggleDrawer}
            />

            {/* Icons Container */}
            <div className="flex-grow flex flex-col items-center justify-center gap-8 overflow-hidden">
              {/* Plan */}
              <div
                onClick={onPlanClick}
                className={`flex flex-col items-center text-center transition-transform duration-500 ease-out cursor-pointer group ${
                  iconsAreVisible ? 'translate-y-0' : 'translate-y-full'
                }`}
                style={{
                  transitionDelay: iconsAreVisible ? '200ms' : '0ms',
                }}
              >
                <div className="transform transition-transform group-hover:scale-110">
                  <PlanIcon />
                </div>
                <p
                  className={`mt-2 text-cyan-400 font-semibold transition-all duration-500 ease-out ${
                    iconsAreVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-3'
                  }`}
                  style={{
                    transitionDelay: iconsAreVisible ? '350ms' : '0ms',
                  }}
                >
                  Plan
                </p>
              </div>
              {/* Reflect */}
              <div
                onClick={onReflectClick}
                className={`flex flex-col items-center text-center transition-transform duration-500 ease-out cursor-pointer group ${
                  iconsAreVisible ? 'translate-y-0' : 'translate-y-full'
                }`}
                style={{
                  transitionDelay: iconsAreVisible ? '400ms' : '0ms',
                }}
              >
                <div className="transform transition-transform group-hover:scale-110">
                  <ReflectIcon />
                </div>
                <p
                  className={`mt-2 text-purple-400 font-semibold transition-all duration-500 ease-out ${
                    iconsAreVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-3'
                  }`}
                  style={{
                    transitionDelay: iconsAreVisible ? '550ms' : '0ms',
                  }}
                >
                  Reflect
                </p>
              </div>
              {/* Explore */}
              <div
                onClick={onExploreClick}
                className={`flex flex-col items-center text-center transition-transform duration-500 ease-out cursor-pointer group ${
                  iconsAreVisible ? 'translate-y-0' : 'translate-y-full'
                }`}
                style={{
                  transitionDelay: iconsAreVisible ? '600ms' : '0ms',
                }}
              >
                <div className="transform transition-transform group-hover:scale-110">
                    <ExploreIcon />
                </div>
                <p
                  className={`mt-2 text-amber-400 font-semibold transition-all duration-500 ease-out ${
                    iconsAreVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-3'
                  }`}
                  style={{
                    transitionDelay: iconsAreVisible ? '750ms' : '0ms',
                  }}
                >
                  Explore
                </p>
              </div>
            </div>

            {/* Get Started Button */}
            <div
              className={`absolute bottom-8 left-0 w-full px-8 transition-transform duration-500 ease-in-out ${
                isDrawerExpanded ? 'translate-y-0' : 'translate-y-40'
              }`}
            >
              <button
                onClick={() => window.location.href = 'https://nine-days.onrender.com/'}
                className={`w-full bg-green-800 hover:bg-green-900 text-white font-bold py-4 px-4 rounded-xl shadow-lg`}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;