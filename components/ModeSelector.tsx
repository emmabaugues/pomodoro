
import React from 'react';
import { TimerMode } from '../types';

interface ModeSelectorProps {
  currentMode: TimerMode;
  onSelectMode: (mode: TimerMode) => void;
}

const modes: { mode: TimerMode; label: string }[] = [
  { mode: TimerMode.Pomodoro, label: 'Pomodoro' },
  { mode: TimerMode.ShortBreak, label: 'Short Break' },
  { mode: TimerMode.LongBreak, label: 'Long Break' },
];

const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onSelectMode }) => {
  return (
    <div className="flex space-x-2 md:space-x-4 p-2 bg-black/20 rounded-full mb-6">
      {modes.map(({ mode, label }) => (
        <button
          key={mode}
          onClick={() => onSelectMode(mode)}
          className={`px-4 py-2 md:px-6 md:py-2 text-sm md:text-base font-semibold rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/50
            ${currentMode === mode ? 'bg-white text-gray-800' : 'bg-transparent text-white/80 hover:bg-white/10'}
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default ModeSelector;
