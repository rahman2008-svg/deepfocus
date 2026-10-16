import React from 'react';
import { BarChart2, Settings as SettingsIcon, CheckCircle2, User, Maximize, Minimize } from 'lucide-react';

interface HeaderProps {
  onOpenReport: () => void;
  onOpenSettings: () => void;
  onOpenDeveloper: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenReport,
  onOpenSettings,
  onOpenDeveloper,
  isFullscreen,
  onToggleFullscreen,
}) => {
  return (
    <header className="w-full max-w-2xl mx-auto px-4 py-4 flex items-center justify-between border-b border-black/10">
      {/* Brand */}
      <div className="flex items-center gap-2 cursor-pointer select-none">
        <div className="w-6 h-6 rounded-full bg-white/25 flex items-center justify-center text-white">
          <CheckCircle2 className="w-5 h-5 fill-white text-transparent" />
        </div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white drop-shadow-sm">
          DeepFocus
        </h1>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenReport}
          className="flex items-center gap-1.5 px-2.5 py-1.5 md:px-3 md:py-1.5 text-xs md:text-sm font-medium text-white bg-white/20 hover:bg-white/30 active:scale-95 transition-all rounded shadow-sm"
          title="Activity Report"
        >
          <BarChart2 className="w-4 h-4" />
          <span className="hidden sm:inline">Report</span>
        </button>

        <button
          onClick={onOpenSettings}
          className="flex items-center gap-1.5 px-2.5 py-1.5 md:px-3 md:py-1.5 text-xs md:text-sm font-medium text-white bg-white/20 hover:bg-white/30 active:scale-95 transition-all rounded shadow-sm"
          title="Timer Settings"
        >
          <SettingsIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Setting</span>
        </button>

        <button
          onClick={onOpenDeveloper}
          className="flex items-center gap-1.5 px-2.5 py-1.5 md:px-3 md:py-1.5 text-xs md:text-sm font-medium text-white bg-white/20 hover:bg-white/30 active:scale-95 transition-all rounded shadow-sm"
          title="About Developer & NexVora Lab's Ofc"
        >
          <User className="w-4 h-4" />
          <span className="hidden sm:inline">Developer</span>
        </button>

        <button
          onClick={onToggleFullscreen}
          className="p-1.5 md:px-2 md:py-1.5 text-xs md:text-sm text-white bg-white/20 hover:bg-white/30 active:scale-95 transition-all rounded shadow-sm"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
