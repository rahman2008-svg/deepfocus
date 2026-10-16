import React, { useState } from 'react';
import { X, Volume2, Bell, Check, Palette } from 'lucide-react';
import { Settings } from '../types';
import { playAlarmSound } from '../utils/sound';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onSaveSettings: (settings: Settings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
}) => {
  const [localSettings, setLocalSettings] = useState<Settings>({ ...settings });
  const [notificationStatus, setNotificationStatus] = useState<string>(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'unsupported'
  );

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveSettings(localSettings);
    onClose();
  };

  const handleTestAlarm = () => {
    playAlarmSound(localSettings.alarmSound, localSettings.alarmVolume);
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const perm = await Notification.requestPermission();
      setNotificationStatus(perm);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-white rounded-lg w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl text-gray-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800">Timer Setting</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 text-sm">
          {/* Timer Section */}
          <section className="space-y-3">
            <h4 className="font-bold text-gray-700 uppercase text-xs tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span> Time (minutes)
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Pomodoro</label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={localSettings.pomodoroTime}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      pomodoroTime: Math.max(1, Number(e.target.value)),
                    })
                  }
                  className="w-full bg-gray-100 border border-gray-200 rounded px-3 py-1.5 font-semibold text-gray-800 text-center"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Short Break</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={localSettings.shortBreakTime}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      shortBreakTime: Math.max(1, Number(e.target.value)),
                    })
                  }
                  className="w-full bg-gray-100 border border-gray-200 rounded px-3 py-1.5 font-semibold text-gray-800 text-center"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Long Break</label>
                <input
                  type="number"
                  min="1"
                  max="90"
                  value={localSettings.longBreakTime}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      longBreakTime: Math.max(1, Number(e.target.value)),
                    })
                  }
                  className="w-full bg-gray-100 border border-gray-200 rounded px-3 py-1.5 font-semibold text-gray-800 text-center"
                />
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Automation toggles */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-800">Auto Start Breaks</div>
                <div className="text-xs text-gray-500">Automatically start break timer when focus completes</div>
              </div>
              <input
                type="checkbox"
                checked={localSettings.autoStartBreaks}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, autoStartBreaks: e.target.checked })
                }
                className="w-5 h-5 accent-gray-800 cursor-pointer rounded"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-800">Auto Start Pomodoros</div>
                <div className="text-xs text-gray-500">Automatically begin next focus round after break</div>
              </div>
              <input
                type="checkbox"
                checked={localSettings.autoStartPomodoros}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, autoStartPomodoros: e.target.checked })
                }
                className="w-5 h-5 accent-gray-800 cursor-pointer rounded"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-semibold text-gray-800">Long Break Interval</span>
              <input
                type="number"
                min="1"
                max="20"
                value={localSettings.longBreakInterval}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    longBreakInterval: Math.max(1, Number(e.target.value)),
                  })
                }
                className="w-20 bg-gray-100 border border-gray-200 rounded px-3 py-1 font-semibold text-center text-gray-800"
              />
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Sounds */}
          <section className="space-y-4">
            <h4 className="font-bold text-gray-700 uppercase text-xs tracking-wider flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-gray-500" /> Sound & Alarms
            </h4>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-semibold text-gray-800">Alarm Sound</label>
                <button
                  type="button"
                  onClick={handleTestAlarm}
                  className="text-xs text-emerald-600 hover:text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 cursor-pointer"
                >
                  Test Alarm
                </button>
              </div>
              <select
                value={localSettings.alarmSound}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    alarmSound: e.target.value as Settings['alarmSound'],
                  })
                }
                className="w-full bg-gray-100 border border-gray-200 rounded px-3 py-2 font-medium text-gray-800"
              >
                <option value="bell">Classic Bell</option>
                <option value="digital">Digital Beep</option>
                <option value="chime">Crystal Chime</option>
                <option value="wood">Wood Knock</option>
                <option value="gong">Zen Gong</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-gray-700">Alarm Volume</span>
                <span className="font-bold text-gray-800 text-xs">{localSettings.alarmVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={localSettings.alarmVolume}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, alarmVolume: Number(e.target.value) })
                }
                className="w-full accent-gray-800 cursor-pointer"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-800 mb-1.5">Ticking Sound</label>
              <select
                value={localSettings.tickingSound}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    tickingSound: e.target.value as Settings['tickingSound'],
                  })
                }
                className="w-full bg-gray-100 border border-gray-200 rounded px-3 py-2 font-medium text-gray-800"
              >
                <option value="none">None</option>
                <option value="slow">Ticking Slow</option>
                <option value="fast">Ticking Fast</option>
              </select>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Theme Colors */}
          <section className="space-y-3">
            <h4 className="font-bold text-gray-700 uppercase text-xs tracking-wider flex items-center gap-2">
              <Palette className="w-4 h-4 text-gray-500" /> Theme Colors
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Pomodoro</label>
                <input
                  type="color"
                  value={localSettings.themeColorPomodoro}
                  onChange={(e) =>
                    setLocalSettings({ ...localSettings, themeColorPomodoro: e.target.value })
                  }
                  className="w-full h-9 rounded cursor-pointer border border-gray-200"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Short Break</label>
                <input
                  type="color"
                  value={localSettings.themeColorShortBreak}
                  onChange={(e) =>
                    setLocalSettings({ ...localSettings, themeColorShortBreak: e.target.value })
                  }
                  className="w-full h-9 rounded cursor-pointer border border-gray-200"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Long Break</label>
                <input
                  type="color"
                  value={localSettings.themeColorLongBreak}
                  onChange={(e) =>
                    setLocalSettings({ ...localSettings, themeColorLongBreak: e.target.value })
                  }
                  className="w-full h-9 rounded cursor-pointer border border-gray-200"
                />
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Desktop Notification */}
          <section className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-800 flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-gray-500" /> Desktop Notifications
              </div>
              <div className="text-xs text-gray-500">
                Status: <span className="font-bold capitalize">{notificationStatus}</span>
              </div>
            </div>
            {notificationStatus !== 'granted' && (
              <button
                type="button"
                onClick={requestNotificationPermission}
                className="px-3 py-1.5 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-800 rounded border border-gray-300"
              >
                Enable
              </button>
            )}
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 font-medium text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 font-bold bg-gray-800 hover:bg-gray-900 text-white rounded shadow-sm flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" /> Save
          </button>
        </div>
      </div>
    </div>
  );
};
