
import React from 'react';
import { TimerMode } from '../types';
import { DURATIONS } from '../constants';

interface TimerProps {
  mode: TimerMode;
  timeRemaining: number;
}

const Timer: React.FC<TimerProps> = ({ mode, timeRemaining }) => {
  const initialDuration = DURATIONS[mode] * 60;
  const progress = (timeRemaining / initialDuration) * 100;
  
  const radius = 130;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const themeColors: Record<TimerMode, string> = {
    [TimerMode.Pomodoro]: 'stroke-red-200',
    [TimerMode.ShortBreak]: 'stroke-blue-200',
    [TimerMode.LongBreak]: 'stroke-indigo-200',
  };

  return (
    <div className="relative w-72 h-72 md:w-80 md:h-80 my-8 flex items-center justify-center">
      <svg className="absolute w-full h-full" viewBox="0 0 300 300">
        <circle
          cx="150"
          cy="150"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          className="text-white/20"
        />
        <circle
          cx="150"
          cy="150"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 150 150)"
          className={`${themeColors[mode]} transition-all duration-500`}
        />
      </svg>
      <div className="z-10 text-center">
        <h2 className="text-6xl md:text-7xl font-bold tracking-tighter">{formatTime(timeRemaining)}</h2>
      </div>
    </div>
  );
};

export default Timer;
