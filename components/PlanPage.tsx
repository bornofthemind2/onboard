import React, { useState, useEffect } from 'react';

interface PlanPageProps {
  onBack: () => void;
}

type Level = 1 | 2 | 3;
type SourceMode = 'grocery' | 'premade';

const INGREDIENTS = {
  1: {
    name: 'Cleansing',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=600',
    description: 'A gentle introduction to reset your system.',
    items: [
      { name: 'Cucumbers', qty: '12' },
      { name: 'Green Apples', qty: '12' },
      { name: 'Kale', qty: '2 bunches' },
      { name: 'Parsley', qty: '1 bunch' },
      { name: 'Cilantro', qty: '1 bunch' },
      { name: 'Spinach', qty: '2 bags' },
      { name: 'Lemons', qty: '2' },
    ],
    groceryCostEst: 45,
    premadeCost: 120,
  },
  2: {
    name: 'Detox',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=600',
    description: 'Deep dive detox for maximum result.',
    items: [
      { name: 'Carrots', qty: '4 lbs' },
      { name: 'Lemons', qty: '4 lbs' },
      { name: 'Kale', qty: '6 bundles' },
      { name: 'Spinach', qty: '2 big bags' },
      { name: 'Romaine Lettuce', qty: '4 heads' },
      { name: 'Parsley', qty: '2 bunches' },
      { name: 'Celery', qty: '4 bundles' },
      { name: 'Cucumbers', qty: '6' },
      { name: 'Green Apples', qty: '12' },
      { name: 'Beets', qty: '4' },
      { name: 'Ginger', qty: '2 roots' },
    ],
    groceryCostEst: 85,
    premadeCost: 180,
  },
  3: {
    name: 'Extraction',
    image: 'https://images.unsplash.com/photo-1615478503562-ec2d8dd3e4db?auto=format&fit=crop&q=80&w=600',
    description: 'Hydration focused cellular repair.',
    items: [
      { name: 'Kale', qty: '2 bunches' },
      { name: 'Spinach', qty: '2 bundles' },
      { name: 'Romaine Lettuce', qty: '2 heads' },
      { name: 'Parsley', qty: '1 bunch' },
      { name: 'Cucumbers', qty: '2' },
      { name: 'Celery', qty: '2 bundles' },
      { name: 'Green Apples', qty: '4' },
      { name: 'Lemons', qty: '2' },
    ],
    groceryCostEst: 35,
    premadeCost: 90,
  },
};

const PlanPage: React.FC<PlanPageProps> = ({ onBack }) => {
  const [selectedLevel, setSelectedLevel] = useState<Level>(1);
  const [mode, setMode] = useState<SourceMode>('grocery');
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  // Reset checks when level changes
  useEffect(() => {
    setCheckedItems(new Set());
  }, [selectedLevel]);

  const toggleItem = (item: string) => {
    const newSet = new Set(checkedItems);
    if (newSet.has(item)) {
      newSet.delete(item);
    } else {
      newSet.add(item);
    }
    setCheckedItems(newSet);
  };

  const currentLevelData = INGREDIENTS[selectedLevel];
  const totalItems = currentLevelData.items.length;
  const collectedItems = checkedItems.size;
  const progress = (collectedItems / totalItems) * 100;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pb-24 overflow-y-auto font-sans">
      {/* Header */}
      <div className="flex items-center mb-6 sticky top-0 bg-gray-900/95 backdrop-blur-sm z-50 py-2 border-b border-white/10">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-gray-800 transition-colors group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold ml-2 text-white tracking-wide">PLAN YOUR JOURNEY</h1>
      </div>

      {/* 1. Process Infographic */}
      <div className="mb-12">
        <h2 className="text-center text-white/60 font-medium mb-8 tracking-[0.2em] text-xs uppercase">The Protocol Flow</h2>
        
        <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative bg-gray-800">
           {/* Inline SVG Infographic to ensure loading */}
           <svg viewBox="0 0 900 400" className="w-full h-auto bg-gray-900" xmlns="http://www.w3.org/2000/svg">
             {/* Background Pattern */}
             <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
               <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1"/>
             </pattern>
             <rect width="100%" height="100%" fill="url(#grid)" />
             
             {/* Connecting Path */}
             <path d="M 150 180 C 300 180, 300 220, 450 220 C 600 220, 600 180, 750 180" stroke="#4b5563" strokeWidth="4" strokeDasharray="8 8" fill="none" />

             {/* Step 1 Group */}
             <g className="step-1">
               <circle cx="150" cy="180" r="50" fill="#0891b2" opacity="0.2" />
               <circle cx="150" cy="180" r="30" fill="#06b6d4" />
               <text x="150" y="190" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold" fontFamily="sans-serif">1</text>
               <text x="150" y="260" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="sans-serif" letterSpacing="2">SELECT</text>
               <text x="150" y="285" textAnchor="middle" fill="#9ca3af" fontSize="14" fontFamily="sans-serif">Choose your level</text>
             </g>

             {/* Step 2 Group */}
             <g className="step-2">
               <circle cx="450" cy="220" r="50" fill="#059669" opacity="0.2" />
               <circle cx="450" cy="220" r="30" fill="#10b981" />
               <text x="450" y="230" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold" fontFamily="sans-serif">2</text>
               <text x="450" y="300" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="sans-serif" letterSpacing="2">SOURCE</text>
               <text x="450" y="325" textAnchor="middle" fill="#9ca3af" fontSize="14" fontFamily="sans-serif">Get ingredients</text>
             </g>

             {/* Step 3 Group */}
             <g className="step-3">
               <circle cx="750" cy="180" r="50" fill="#7c3aed" opacity="0.2" />
               <circle cx="750" cy="180" r="30" fill="#8b5cf6" />
               <text x="750" y="190" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold" fontFamily="sans-serif">3</text>
               <text x="750" y="260" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="sans-serif" letterSpacing="2">BEGIN</text>
               <text x="750" y="285" textAnchor="middle" fill="#9ca3af" fontSize="14" fontFamily="sans-serif">Start 9 Days</text>
             </g>
           </svg>
        </div>
      </div>

      <hr className="border-white/10 mb-10" />

      {/* 2. Level Selector */}
      <div className="mb-10">
        <h2 className="text-white font-bold text-lg mb-6 flex items-center tracking-wide">
          <span className="bg-white/10 text-cyan-400 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3 font-mono">01</span>
          SELECT INTENSITY
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {([1, 2, 3] as Level[]).map((lvl) => {
            const data = INGREDIENTS[lvl];
            const isSelected = selectedLevel === lvl;
            return (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`relative h-32 md:h-64 rounded-2xl overflow-hidden text-left transition-all duration-300 group shadow-lg ${
                  isSelected
                    ? 'ring-2 ring-cyan-400 shadow-cyan-900/50 scale-[1.02]'
                    : 'hover:ring-1 hover:ring-white/30 opacity-70 hover:opacity-100'
                }`}
              >
                {/* Background Image */}
                <img 
                  src={data.image} 
                  alt={data.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-300 ${isSelected ? 'opacity-90' : 'opacity-70'}`} />
                
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <div className="flex justify-between items-end">
                    <div>
                        <span className={`text-xs font-bold uppercase tracking-wider mb-1 block ${isSelected ? 'text-cyan-400' : 'text-gray-400'}`}>
                            Level 0{lvl}
                        </span>
                        <h3 className="font-bold text-xl text-white mb-1">
                            {data.name}
                        </h3>
                        <p className="text-[10px] text-gray-300 line-clamp-2 md:line-clamp-none opacity-80">
                            {data.description}
                        </p>
                    </div>
                    {isSelected && (
                        <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Sourcing Mode */}
      <div className="mb-8">
        <h2 className="text-white font-bold text-lg mb-6 flex items-center tracking-wide">
           <span className="bg-white/10 text-cyan-400 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3 font-mono">02</span>
           SOURCING METHOD
        </h2>
        
        <div className="bg-black/30 p-1 rounded-xl flex relative max-w-md mx-auto border border-white/10 overflow-hidden">
           {/* Background Image Texture for Toggle */}
           <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
               backgroundImage: 'url(https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=200)',
               backgroundSize: 'cover'
           }}></div>

          <div 
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gray-700 rounded-lg transition-all duration-300 ease-out shadow-lg ${
              mode === 'grocery' ? 'left-1' : 'left-[calc(50%+2px)]'
            }`}
          />
          <button
            onClick={() => setMode('grocery')}
            className={`flex-1 py-3 text-center relative z-10 text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${
              mode === 'grocery' ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Grocery Run
          </button>
          <button
            onClick={() => setMode('premade')}
            className={`flex-1 py-3 text-center relative z-10 text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${
              mode === 'premade' ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Premade Kit
          </button>
        </div>
      </div>

      {/* 4. Dynamic Content Area */}
      <div className="space-y-6 bg-gray-800/40 backdrop-blur-md p-6 rounded-3xl border border-white/5">
        {mode === 'grocery' ? (
          <div className="animate-fade-in">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Shopping List</h2>
                <p className="text-xs text-gray-400 mt-1">Fresh ingredients for {currentLevelData.name}</p>
              </div>
              <div className="text-right bg-black/40 px-4 py-2 rounded-lg border border-white/10">
                <p className="text-[10px] uppercase tracking-wider text-gray-400">Est. Cost</p>
                <p className="text-xl font-bold text-emerald-400">${currentLevelData.groceryCostEst}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-gray-700/50 rounded-full mb-8 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Checklist */}
            <div className="space-y-2">
              {currentLevelData.items.map((item, idx) => {
                const isChecked = checkedItems.has(item.name);
                return (
                  <div 
                    key={idx}
                    onClick={() => toggleItem(item.name)}
                    className={`flex items-center p-3 rounded-xl border transition-all cursor-pointer group ${
                      isChecked 
                        ? 'bg-black/20 border-transparent opacity-50' 
                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center mr-4 transition-all duration-300 ${
                      isChecked ? 'bg-cyan-600 border-cyan-600 scale-110' : 'border-gray-500 group-hover:border-cyan-400'
                    }`}>
                      {isChecked && (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium text-sm transition-colors ${isChecked ? 'line-through text-gray-500' : 'text-gray-200 group-hover:text-white'}`}>
                        {item.name}
                      </p>
                    </div>
                    <div className="text-cyan-400 font-mono text-xs bg-cyan-900/20 px-2 py-1 rounded border border-cyan-900/30">
                      {item.qty}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {progress === 100 && (
              <div className="mt-8 p-6 bg-gradient-to-r from-emerald-900/40 to-cyan-900/40 border border-emerald-500/30 rounded-2xl text-center animate-fade-in-up">
                <h4 className="text-emerald-400 font-bold text-lg mb-1 tracking-wide">READY TO PREP</h4>
                <p className="text-emerald-200/70 text-xs">Your grocery run is complete.</p>
                <button className="mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-6 rounded-full text-sm transition-colors shadow-lg shadow-emerald-900/50">
                    Continue to Schedule
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="bg-black/30 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              {/* Product Image */}
              <div className="relative h-48 w-full">
                 <img 
                    src="https://images.unsplash.com/photo-1615478503562-ec2d8dd3e4db?auto=format&fit=crop&q=80&w=800" 
                    alt="Juice Kit" 
                    className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                 <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white">Level 0{selectedLevel} Kit</h3>
                    <p className="text-gray-300 text-xs">{currentLevelData.name} Protocol</p>
                 </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                    <p className="text-gray-400 text-sm leading-relaxed flex-1 mr-4">
                        Hand-selected organic ingredients, cold-pressed and bottled in sustainable glass. Delivered fresh to your doorstep.
                    </p>
                    <div className="text-right">
                        <span className="block text-2xl font-bold text-white">${currentLevelData.premadeCost}</span>
                        <span className="text-xs text-gray-500 line-through">
                        ${Math.round(currentLevelData.premadeCost * 1.2)}
                        </span>
                    </div>
                </div>

                <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-cyan-900/50 flex items-center justify-center gap-3 group">
                    <span className="tracking-widest text-sm uppercase">Order Now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
                
                <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-gray-500 uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Free Shipping
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                    <span className="flex items-center gap-1">
                         <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Glass Bottles
                    </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanPage;