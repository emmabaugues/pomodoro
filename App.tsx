import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TimerMode } from './types';
import { DURATIONS, POMODOROS_PER_CYCLE } from './constants';
import Timer from './components/Timer';
import Controls from './components/Controls';
import ModeSelector from './components/ModeSelector';
import PomodoroCounter from './components/PomodoroCounter';

const App: React.FC = () => {
  const [mode, setMode] = useState<TimerMode>(TimerMode.Pomodoro);
  const [timeRemaining, setTimeRemaining] = useState(DURATIONS[mode] * 60);
  const [isActive, setIsActive] = useState(false);
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);

  const alarmSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // This is a placeholder for a real audio file.
    // In a real app, you would have an audio file in your public folder.
    // e.g., alarmSoundRef.current = new Audio('/sounds/alarm.mp3');
    // For this example, we'll simulate it.
    if (typeof Audio !== 'undefined') {
        // A silent audio object to prevent errors if we were to call play()
        alarmSoundRef.current = new Audio("data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=");
    }
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  useEffect(() => {
    document.title = `${formatTime(timeRemaining)} - ${mode.replace(/([A-Z])/g, ' $1').trim()}`;
  }, [timeRemaining, mode]);

  const switchMode = useCallback((newMode: TimerMode, startAutomatically = false) => {
    setMode(newMode);
    setTimeRemaining(DURATIONS[newMode] * 60);
    setIsActive(startAutomatically);
  }, []);

  useEffect(() => {
    let interval: number | undefined = undefined;

    if (isActive && timeRemaining > 0) {
      interval = window.setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (isActive && timeRemaining === 0) {
      if (alarmSoundRef.current) {
        alarmSoundRef.current.play().catch(e => console.error("Error playing sound:", e));
      }
      
      if (mode === TimerMode.Pomodoro) {
        const newPomodorosCompleted = pomodorosCompleted + 1;
        setPomodorosCompleted(newPomodorosCompleted);
        if (newPomodorosCompleted % POMODOROS_PER_CYCLE === 0) {
          switchMode(TimerMode.LongBreak, true);
        } else {
          switchMode(TimerMode.ShortBreak, true);
        }
      } else { // It was a short or long break
        switchMode(TimerMode.Pomodoro, true);
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, timeRemaining, mode, pomodorosCompleted, switchMode]);

  const handleStartPause = () => {
    setIsActive(prev => !prev);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeRemaining(DURATIONS[mode] * 60);
  };

  const handleModeChange = (newMode: TimerMode) => {
    if (mode === newMode) return;

    if (isActive && !window.confirm('Are you sure you want to switch modes? The current timer will be reset.')) {
      return; // User cancelled while timer was active
    }
    
    switchMode(newMode);
  };

  const themeColors: Record<TimerMode, string> = {
    [TimerMode.Pomodoro]: 'from-red-500 to-orange-500',
    [TimerMode.ShortBreak]: 'from-blue-500 to-cyan-500',
    [TimerMode.LongBreak]: 'from-indigo-500 to-purple-500',
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themeColors[mode]} text-white flex flex-col items-center justify-center p-4 transition-all duration-1000`}>
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wider">Pomodoro Timer</h1>
        <p className="text-lg opacity-80 mt-2">Stay focused, take breaks, be productive.</p>
      </header>

      <main className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col items-center">
        <ModeSelector currentMode={mode} onSelectMode={handleModeChange} />
        <Timer mode={mode} timeRemaining={timeRemaining} />
        <Controls isActive={isActive} onStartPause={handleStartPause} onReset={handleReset} />
      </main>

      <footer className="mt-8">
        <PomodoroCounter completed={pomodorosCompleted % POMODOROS_PER_CYCLE} total={POMODOROS_PER_CYCLE} />
        <p className="text-sm opacity-70 mt-2 text-center">Session {pomodorosCompleted % POMODOROS_PER_CYCLE + 1} of {POMODOROS_PER_CYCLE}</p>
      </footer>
    </div>
  );
};

export default App;