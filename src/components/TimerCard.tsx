import React from 'react';
import { SkipForward } from 'lucide-react';
import { TimerMode } from '../types';

interface TimerCardProps {
  mode: TimerMode;
  timeLeft: number;
  totalDuration: number;
  isRunning: boolean;
  activeTaskTitle: string | null;
  pomodoroCount: number;
  accentColor: string;
  onSwitchMode: (mode: TimerMode) => void;
  onToggleTimer: () => void;
  onSkipTimer: () => void;
}

export const TimerCard: React.FC<TimerCardProps> = ({
  mode,
  timeLeft,
  totalDuration,
  isRunning,
  activeTaskTitle,
  pomodoroCount,
  accentColor,
  onSwitchMode,
  onToggleTimer,
  onSkipTimer,
}) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Progress percentage (0% to 100%)
  const progressPercent = Math.min(
    100,
    Math.max(0, ((totalDuration - timeLeft) / (totalDuration || 1)) * 100)
  );

  return (
    <div className="w-full max-w-xl mx-auto mt-6">
      {/* Visual session progress bar */}
      <div className="w-full h-1 bg-black/15 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Timer Box */}
      <div className="bg-white/10 backdrop-blur-xs rounded-md p-6 sm:p-8 md:p-10 text-center shadow-lg transition-colors duration-300">
        {/* Mode Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6">
          <button
            onClick={() => onSwitchMode('pomodoro')}
            className={`px-3 sm:px-4 py-1.5 rounded text-sm sm:text-base font-semibold transition-all ${
              mode === 'pomodoro'
                ? 'bg-black/20 text-white shadow-inner font-bold'
                : 'text-white/80 hover:text-white hover:bg-black/10'
            }`}
          >
            Pomodoro
          </button>
          <button
            onClick={() => onSwitchMode('shortBreak')}
            className={`px-3 sm:px-4 py-1.5 rounded text-sm sm:text-base font-semibold transition-all ${
              mode === 'shortBreak'
                ? 'bg-black/20 text-white shadow-inner font-bold'
                : 'text-white/80 hover:text-white hover:bg-black/10'
            }`}
          >
            Short Break
          </button>
          <button
            onClick={() => onSwitchMode('longBreak')}
            className={`px-3 sm:px-4 py-1.5 rounded text-sm sm:text-base font-semibold transition-all ${
              mode === 'longBreak'
                ? 'bg-black/20 text-white shadow-inner font-bold'
                : 'text-white/80 hover:text-white hover:bg-black/10'
            }`}
          >
            Long Break
          </button>
        </div>

        {/* Time Display */}
        <div className="text-7xl sm:text-8xl md:text-9xl font-bold tracking-tight text-white my-4 sm:my-6 select-none font-mono drop-shadow-sm">
          {formattedTime}
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6">
          <button
            onClick={onToggleTimer}
            style={{ color: accentColor }}
            className={`w-44 sm:w-52 h-14 sm:h-16 bg-white rounded font-extrabold text-xl sm:text-2xl uppercase tracking-wider transition-all select-none cursor-pointer flex items-center justify-center ${
              isRunning
                ? 'translate-y-1.5 shadow-none'
                : 'shadow-[0_6px_0_#e5e5e5] hover:brightness-105 active:translate-y-1.5 active:shadow-none'
            }`}
          >
            {isRunning ? 'PAUSE' : 'START'}
          </button>

          {/* Skip round button */}
          <button
            onClick={onSkipTimer}
            title="Skip to next session"
            className="w-12 h-12 rounded bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Cycle indicator & Active task caption */}
      <div className="text-center mt-6 select-none">
        <div className="text-white/70 text-sm font-medium tracking-wide">
          #{pomodoroCount + 1}
        </div>
        <div className="text-white text-base sm:text-lg font-semibold mt-1">
          {activeTaskTitle ? (
            <span className="inline-flex items-center gap-1.5 bg-black/10 px-3 py-1 rounded-full">
              🎯 {activeTaskTitle}
            </span>
          ) : mode === 'pomodoro' ? (
            'Time to focus!'
          ) : (
            'Time for a break!'
          )}
        </div>
      </div>
    </div>
  );
};
