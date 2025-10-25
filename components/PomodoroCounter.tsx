
import React from 'react';

interface PomodoroCounterProps {
  completed: number;
  total: number;
}

const TomatoIcon: React.FC<{ filled?: boolean }> = ({ filled }) => (
    <svg className={`w-8 h-8 transition-colors duration-500 ${filled ? 'text-white' : 'text-white/30'}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C9.25 2 7 4.25 7 7c0 1.48.63 2.81 1.62 3.74-.22.61-.38 1.25-.42 1.9L8.1 13c-1.03 0-1.9.87-1.9 1.9s.87 1.9 1.9 1.9H12v3h-1c-.55 0-1 .45-1 1s.45 1 1 1h4c.55 0 1-.45 1-1s-.45-1-1-1h-1v-3h3.8c1.03 0 1.9-.87 1.9-1.9s-.87-1.9-1.9-1.9l-.1-.36c-.04-.65-.2-1.29-.42-1.9C16.37 9.81 17 8.48 17 7c0-2.75-2.25-5-5-5zm-3.5 5c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5c0 .9-.34 1.72-.9 2.36-.67.79-1.57 1.34-2.6 1.55-1.03-.21-1.93-.76-2.6-1.55C8.84 8.72 8.5 7.9 8.5 7z" />
    </svg>
);


const PomodoroCounter: React.FC<PomodoroCounterProps> = ({ completed, total }) => {
  return (
    <div className="flex items-center space-x-2">
      {Array.from({ length: total }).map((_, index) => (
        <TomatoIcon key={index} filled={index < completed} />
      ))}
    </div>
  );
};

export default PomodoroCounter;
