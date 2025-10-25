
import React from 'react';

interface ControlsProps {
  isActive: boolean;
  onStartPause: () => void;
  onReset: () => void;
}

const PlayIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const ResetIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
  </svg>
);


const Controls: React.FC<ControlsProps> = ({ isActive, onStartPause, onReset }) => {
  return (
    <div className="flex items-center space-x-6">
      <button 
        onClick={onReset} 
        className="p-4 rounded-full bg-white/20 hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Reset timer"
      >
        <ResetIcon className="w-6 h-6" />
      </button>
      <button 
        onClick={onStartPause} 
        className="w-24 h-24 rounded-full bg-white text-gray-800 flex items-center justify-center text-2xl font-bold uppercase tracking-widest shadow-lg transform hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-white/50"
        aria-label={isActive ? 'Pause timer' : 'Start timer'}
      >
        {isActive ? <PauseIcon className="w-10 h-10"/> : <PlayIcon className="w-10 h-10" />}
      </button>
      <div className="w-14 h-14" /> {/* Spacer to balance the layout */}
    </div>
  );
};

export default Controls;
