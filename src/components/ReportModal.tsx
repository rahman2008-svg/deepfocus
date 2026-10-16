import React from 'react';
import { X, Flame, Clock, Calendar, CheckSquare, RotateCcw } from 'lucide-react';
import { UserStats } from '../types';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
  onResetStats: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  stats,
  onResetStats,
}) => {
  if (!isOpen) return null;

  const totalHours = (stats.totalMinutes / 60).toFixed(1);
  const daysAccessedCount = Object.keys(stats.history).length;

  // Build last 7 days chart data
  const last7Days: Array<{ dateStr: string; label: string; minutes: number; pomos: number }> = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateKey = d.toISOString().split('T')[0];
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
    const stat = stats.history[dateKey];

    last7Days.push({
      dateStr: dateKey,
      label: dayLabel,
      minutes: stat?.minutes || 0,
      pomos: stat?.pomodoros || 0,
    });
  }

  const maxMinutes = Math.max(60, ...last7Days.map((d) => d.minutes));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl text-gray-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            Activity Report
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-red-50/70 border border-red-100 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center text-red-600 mb-1">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-xl font-black text-gray-900">{totalHours}</div>
              <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                Hours Focused
              </div>
            </div>

            <div className="bg-amber-50/70 border border-amber-100 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center text-amber-600 mb-1">
                <Flame className="w-5 h-5" />
              </div>
              <div className="text-xl font-black text-gray-900">{stats.dayStreak}</div>
              <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                Day Streak
              </div>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-100 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center text-emerald-600 mb-1">
                <CheckSquare className="w-5 h-5" />
              </div>
              <div className="text-xl font-black text-gray-900">{stats.totalPomodoros}</div>
              <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                Pomodoros
              </div>
            </div>

            <div className="bg-blue-50/70 border border-blue-100 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center text-blue-600 mb-1">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="text-xl font-black text-gray-900">{daysAccessedCount}</div>
              <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                Days Accessed
              </div>
            </div>
          </div>

          {/* 7-Day Focus Time Chart */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-gray-800 text-sm">Focus Time (Past 7 Days)</h4>
              <span className="text-xs text-gray-500 font-medium">Minutes per day</span>
            </div>

            <div className="flex items-end justify-between h-40 pt-4 gap-2">
              {last7Days.map((day) => {
                const heightPercent = Math.max(8, (day.minutes / maxMinutes) * 100);
                return (
                  <div key={day.dateStr} className="flex-1 flex flex-col items-center h-full justify-end group">
                    <div className="text-[11px] font-bold text-gray-600 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {day.minutes}m
                    </div>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t transition-all ${
                        day.minutes > 0
                          ? 'bg-[#ba4949] hover:bg-[#a33e3e]'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    />
                    <div className="text-[11px] font-semibold text-gray-600 mt-2 truncate w-full text-center">
                      {day.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Productivity Tips */}
          <div className="text-xs text-gray-600 bg-amber-50/50 border border-amber-200/60 rounded-md p-3">
            <span className="font-bold text-amber-900">💡 DeepFocus Tip:</span> Aim for 4 to 8 focused pomodoros every day with consistent 5-minute breathers to maintain peak cognitive stamina without burnout.
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={() => {
              if (confirm('Reset all productivity statistics? This cannot be undone.')) {
                onResetStats();
              }
            }}
            className="text-xs text-gray-500 hover:text-red-600 flex items-center gap-1 font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Stats
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 font-bold bg-gray-800 hover:bg-gray-900 text-white rounded text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
