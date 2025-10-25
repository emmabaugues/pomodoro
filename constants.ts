import { TimerMode } from './types';

export const DURATIONS: Record<TimerMode, number> = {
  [TimerMode.Pomodoro]: 15,
  [TimerMode.ShortBreak]: 5,
  [TimerMode.LongBreak]: 10,
};

export const POMODOROS_PER_CYCLE = 4;