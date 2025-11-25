import React, { useState, useRef, useEffect } from 'react';

interface ReflectPageProps {
  onBack: () => void;
  onPostComplete: () => void;
}

type Mode = 'photo' | 'video' | 'audio';

const FILTERS = [
  { name: 'Normal', class: '' },
  { name: 'Vivid', class: 'saturate-150 contrast-110' },
  { name: 'B&W', class: 'grayscale contrast-125' },
  { name: 'Warm', class: 'sepia-[.3] contrast-105 saturate-150' },
  { name: 'Cool', class: 'hue-rotate-180 saturate-50' },
  { name: 'Vintage', class: 'sepia contrast-75 brightness-110' },
];

const ReflectPage: React.FC<ReflectPageProps> = ({ onBack, onPostComplete }) => {
  const [mode, setMode] = useState<Mode>('photo');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedMedia, setCapturedMedia] = useState<string | null>(null); // URL of captured content
  const [isCapturing, setIsCapturing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0]);
  const [textOverlay, setTextOverlay] = useState<string>('');
  const [showTextInput, setShowTextInput] = useState(false);
  const [stickers, setStickers] = useState<string[]>([]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize Camera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: mode !== 'photo' 
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    if (!capturedMedia) {
      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [mode, capturedMedia]);

  const handleCapture = () => {
    if (mode === 'photo') {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Apply filter context if possible (simplification: we just save raw and apply css on preview)
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/png');
          setCapturedMedia(dataUrl);
        }
      }
    } else if (mode === 'video') {
      if (!isCapturing) {
        setIsCapturing(true);
        // Simulation of recording start
      } else {
        setIsCapturing(false);
        // Simulation: Just take a frame to represent the "video" for this UI demo
        // In a real app, use MediaRecorder API
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
               ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
               // Mock video by saving image + flag
               setCapturedMedia(canvas.toDataURL('image/png')); 
            }
        }
      }
    } else {
        // Audio mode simulation
        setIsCapturing(!isCapturing);
        if(isCapturing) {
             setCapturedMedia("audio-placeholder");
        }
    }
  };

  const addSticker = (emoji: string) => {
    setStickers([...stickers, emoji]);
  };

  const handlePost = () => {
    // Logic to upload would go here
    onPostComplete();
  };

  const handleRetake = () => {
    setCapturedMedia(null);
    setStickers([]);
    setTextOverlay('');
    setSelectedFilter(FILTERS[0]);
  };

  return (
    <div className="h-screen w-full bg-black relative overflow-hidden font-sans">
      <canvas ref={canvasRef} className="hidden" />

      {/* --- PREVIEW / EDIT MODE --- */}
      {capturedMedia ? (
        <div className="h-full w-full relative flex flex-col">
          {/* Main Media Display */}
          <div className={`flex-grow relative overflow-hidden ${selectedFilter.class}`}>
             {mode === 'audio' ? (
                 <div className="w-full h-full flex items-center justify-center bg-gray-900">
                     <div className="animate-pulse w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                         <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                     </div>
                 </div>
             ) : (
                <img src={capturedMedia} alt="captured" className="w-full h-full object-cover" />
             )}
             
             {/* Text Overlay */}
             {textOverlay && (
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10">
                 <p className="text-4xl font-bold text-white drop-shadow-lg break-words max-w-[80vw] bg-black/30 p-2 rounded">
                   {textOverlay}
                 </p>
               </div>
             )}

             {/* Stickers */}
             {stickers.map((s, i) => (
                <div key={i} className="absolute text-6xl" style={{ 
                    top: `${20 + (i * 10)}%`, 
                    left: `${20 + (i * 10)}%`,
                    transform: `rotate(${Math.random() * 45 - 20}deg)`
                }}>
                    {s}
                </div>
             ))}
          </div>

          {/* Text Input Modal */}
          {showTextInput && (
            <div className="absolute inset-0 bg-black/80 z-20 flex items-center justify-center">
                <input 
                    autoFocus
                    type="text" 
                    value={textOverlay}
                    onChange={(e) => setTextOverlay(e.target.value)}
                    onBlur={() => setShowTextInput(false)}
                    onKeyDown={(e) => { if(e.key === 'Enter') setShowTextInput(false) }}
                    className="bg-transparent text-white text-4xl font-bold text-center outline-none border-b-2 border-white w-3/4 pb-2"
                    placeholder="Type something..."
                />
            </div>
          )}

          {/* Editing Controls */}
          <div className="absolute right-4 top-12 flex flex-col gap-6 z-10">
              <button onClick={() => setShowTextInput(true)} className="flex flex-col items-center gap-1 group">
                 <div className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white/20">
                    <span className="font-bold text-white text-xl">Aa</span>
                 </div>
                 <span className="text-[10px] font-bold text-white shadow-black drop-shadow-md">Text</span>
              </button>
              
              <button onClick={() => addSticker('🌿')} className="flex flex-col items-center gap-1 group">
                 <div className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white/20">
                    <span className="text-xl">😊</span>
                 </div>
                 <span className="text-[10px] font-bold text-white shadow-black drop-shadow-md">Sticker</span>
              </button>
          </div>

          {/* Bottom Action Bar */}
          <div className="absolute bottom-0 w-full p-6 flex items-center justify-between bg-gradient-to-t from-black via-black/60 to-transparent">
              <div className="flex gap-2">
                 {/* Mini Filter Selector for Post-Edit */}
                 <button 
                   onClick={() => {
                       const currIdx = FILTERS.indexOf(selectedFilter);
                       const nextIdx = (currIdx + 1) % FILTERS.length;
                       setSelectedFilter(FILTERS[nextIdx]);
                   }}
                   className="px-4 py-2 bg-gray-800/80 rounded-full text-xs font-bold text-white border border-white/20"
                 >
                    Filter: {selectedFilter.name}
                 </button>
              </div>

              <div className="flex gap-4">
                  <button onClick={handleRetake} className="px-6 py-3 rounded-xl bg-gray-800 text-white font-bold text-sm">
                      Discard
                  </button>
                  <button onClick={handlePost} className="px-8 py-3 rounded-xl bg-cyan-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/50">
                      Post to Explore
                  </button>
              </div>
          </div>
        </div>
      ) : (
        /* --- CAPTURE MODE --- */
        <>
          {/* Camera Feed */}
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className={`w-full h-full object-cover transition-all duration-300 ${selectedFilter.class}`} 
          />
          
          {/* Header Controls */}
          <div className="absolute top-0 w-full p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/50 to-transparent">
            <button onClick={onBack} className="p-2">
               <svg className="w-8 h-8 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="bg-black/30 backdrop-blur px-4 py-1 rounded-full border border-white/10">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    REC
                </span>
            </div>
            <button className="p-2">
               {/* Flip Cam Placeholder */}
               <svg className="w-8 h-8 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </button>
          </div>

          {/* Right Sidebar Tools */}
          <div className="absolute right-4 top-20 flex flex-col gap-6 z-10">
              {FILTERS.slice(1, 4).map((f, i) => (
                  <button key={i} onClick={() => setSelectedFilter(f)} className="flex flex-col items-center gap-1 group">
                     <div className={`w-8 h-8 rounded-full border-2 ${selectedFilter.name === f.name ? 'border-cyan-400' : 'border-white'} overflow-hidden`}>
                         <div className={`w-full h-full bg-gray-500 ${f.class}`}></div>
                     </div>
                     <span className="text-[9px] font-bold text-white shadow-black drop-shadow-md">{f.name}</span>
                  </button>
              ))}
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 w-full pb-8 pt-20 px-6 flex flex-col items-center bg-gradient-to-t from-black via-black/40 to-transparent z-10">
             
             {/* Mode Selector */}
             <div className="flex gap-6 mb-8 text-sm font-bold tracking-widest uppercase">
                 {(['photo', 'video', 'audio'] as Mode[]).map((m) => (
                     <button 
                        key={m}
                        onClick={() => setMode(m)}
                        className={`transition-all duration-300 ${mode === m ? 'text-white scale-110' : 'text-gray-400'}`}
                     >
                         {m}
                     </button>
                 ))}
             </div>

             <div className="flex w-full items-center justify-between">
                 {/* Gallery Placeholder */}
                 <div className="w-12 h-12 rounded-xl bg-gray-800 border-2 border-white/20 overflow-hidden cursor-pointer hover:scale-105 transition-transform">
                     <img src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover opacity-60" alt="gallery" />
                 </div>

                 {/* Shutter Button */}
                 <button 
                    onClick={handleCapture}
                    className={`w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-all duration-200 ${isCapturing ? 'scale-110' : 'hover:scale-105'}`}
                 >
                     <div className={`rounded-full transition-all duration-200 ${
                         mode === 'video' 
                           ? (isCapturing ? 'w-8 h-8 rounded-md bg-red-600' : 'w-16 h-16 bg-red-500') 
                           : (mode === 'audio' ? 'w-16 h-16 bg-purple-500 animate-pulse' : 'w-16 h-16 bg-white')
                     }`} />
                 </button>

                 {/* Flip / Effect Placeholder */}
                 <div className="w-12 h-12 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 </div>
             </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReflectPage;