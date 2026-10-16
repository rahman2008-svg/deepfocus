import React, { useState, useEffect, useRef } from 'react';
import { TimerMode, Task, Settings, UserStats } from './types';
import { Header } from './components/Header';
import { TimerCard } from './components/TimerCard';
import { TasksList } from './components/TasksList';
import { SettingsModal } from './components/SettingsModal';
import { ReportModal } from './components/ReportModal';
import { DeveloperModal } from './components/DeveloperModal';
import { LandingContent } from './components/LandingContent';
import { playButtonClick, playTick, playAlarmSound } from './utils/sound';
import { fireConfetti } from './utils/confetti';

const DEFAULT_SETTINGS: Settings = {
  pomodoroTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  longBreakInterval: 4,
  alarmSound: 'bell',
  alarmVolume: 70,
  alarmRepeat: 1,
  tickingSound: 'none',
  tickingVolume: 35,
  themeColorPomodoro: '#ba4949',
  themeColorShortBreak: '#38858a',
  themeColorLongBreak: '#397097',
  darkMode: false,
  autoCheckTasks: false,
  autoSwitchTasks: true,
  soundNotification: true,
};

const DEFAULT_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Welcome to DeepFocus! Click START to begin',
    estPomodoros: 1,
    actPomodoros: 0,
    completed: false,
    note: 'Built by Prince AR Abdur Rahman / NexVora Lab\'s Ofc',
    createdAt: Date.now(),
  },
  {
    id: 'task-2',
    title: 'Explore settings and customize your timer',
    estPomodoros: 1,
    actPomodoros: 0,
    completed: false,
    createdAt: Date.now() + 1,
  },
];

export default function App() {
  // Load settings from localStorage
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const saved = localStorage.getItem('deepfocus_settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Load tasks from localStorage
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('deepfocus_tasks');
      return saved ? JSON.parse(saved) : DEFAULT_TASKS;
    } catch {
      return DEFAULT_TASKS;
    }
  });

  // Active Task ID
  const [activeTaskId, setActiveTaskId] = useState<string | null>(() => {
    return tasks.length > 0 ? tasks[0].id : null;
  });

  // Stats state
  const [stats, setStats] = useState<UserStats>(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    try {
      const saved = localStorage.getItem('deepfocus_stats');
      if (saved) {
        const parsed: UserStats = JSON.parse(saved);
        return parsed;
      }
    } catch {
      // fallback
    }
    return {
      history: {
        [todayStr]: { date: todayStr, pomodoros: 0, minutes: 0, tasksCompleted: 0 },
      },
      totalPomodoros: 0,
      totalMinutes: 0,
      dayStreak: 1,
      lastActiveDate: todayStr,
    };
  });

  // Timer states
  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [timeLeft, setTimeLeft] = useState<number>(settings.pomodoroTime * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [pomodoroCount, setPomodoroCount] = useState<number>(0);

  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isDeveloperOpen, setIsDeveloperOpen] = useState(false);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('deepfocus_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('deepfocus_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('deepfocus_stats', JSON.stringify(stats));
  }, [stats]);

  // Handle Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Get current session duration in seconds based on mode
  const getDurationForMode = (m: TimerMode): number => {
    if (m === 'pomodoro') return settings.pomodoroTime * 60;
    if (m === 'shortBreak') return settings.shortBreakTime * 60;
    return settings.longBreakTime * 60;
  };

  // Switch mode helper
  const switchMode = (newMode: TimerMode, autoStart = false) => {
    playButtonClick(50);
    setMode(newMode);
    const dur = getDurationForMode(newMode);
    setTimeLeft(dur);
    setIsRunning(autoStart);
  };

  // Trigger celebration and update stats on Pomodoro completion
  const handleSessionComplete = () => {
    playAlarmSound(settings.alarmSound, settings.alarmVolume);

    // Browser Notification
    if ('Notification' in window && Notification.permission === 'granted') {
      const title = mode === 'pomodoro' ? 'Pomodoro Completed!' : 'Break Completed!';
      const body =
        mode === 'pomodoro'
          ? 'Great job! Time to take a restful break.'
          : 'Break is over. Ready to dive back in?';
      try {
        new Notification(title, { body, icon: '/favicon.ico' });
      } catch (e) {
        console.warn('Notification error', e);
      }
    }

    const todayStr = new Date().toISOString().split('T')[0];

    if (mode === 'pomodoro') {
      // Fire celebration confetti!
      fireConfetti();

      const newPomoCount = pomodoroCount + 1;
      setPomodoroCount(newPomoCount);

      // Increment stats
      setStats((prev) => {
        const todayStat = prev.history[todayStr] || {
          date: todayStr,
          pomodoros: 0,
          minutes: 0,
          tasksCompleted: 0,
        };

        const updatedHistory = {
          ...prev.history,
          [todayStr]: {
            ...todayStat,
            pomodoros: todayStat.pomodoros + 1,
            minutes: todayStat.minutes + settings.pomodoroTime,
          },
        };

        return {
          ...prev,
          history: updatedHistory,
          totalPomodoros: prev.totalPomodoros + 1,
          totalMinutes: prev.totalMinutes + settings.pomodoroTime,
          lastActiveDate: todayStr,
        };
      });

      // Update active task actPomodoros
      if (activeTaskId) {
        setTasks((prev) =>
          prev.map((t) => {
            if (t.id === activeTaskId) {
              const updatedAct = t.actPomodoros + 1;
              const autoChecked = settings.autoCheckTasks && updatedAct >= t.estPomodoros;
              return { ...t, actPomodoros: updatedAct, completed: autoChecked || t.completed };
            }
            return t;
          })
        );
      }

      // Decide next break
      const isLongBreak = newPomoCount % settings.longBreakInterval === 0;
      const nextMode: TimerMode = isLongBreak ? 'longBreak' : 'shortBreak';
      switchMode(nextMode, settings.autoStartBreaks);
    } else {
      // Break completed -> go back to pomodoro
      switchMode('pomodoro', settings.autoStartPomodoros);
    }
  };

  // Timer interval engine
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          // Play ticking sound if configured
          if (settings.tickingSound !== 'none' && prev > 1) {
            playTick(settings.tickingSound, settings.tickingVolume);
          }

          if (prev <= 1) {
            clearInterval(timerRef.current as NodeJS.Timeout);
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, mode, pomodoroCount, settings, activeTaskId]);

  // Update Page Title dynamically
  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    const statusText = mode === 'pomodoro' ? 'Time to focus!' : 'Break Time!';
    document.title = `(${timeFormatted}) ${statusText} - DeepFocus`;
  }, [timeLeft, mode]);

  // Toggle start / pause
  const handleToggleTimer = () => {
    playButtonClick(60);
    setIsRunning(!isRunning);
  };

  // Skip current session
  const handleSkipTimer = () => {
    if (confirm('Are you sure you want to skip to the next session?')) {
      playButtonClick(50);
      if (mode === 'pomodoro') {
        const isLongBreak = (pomodoroCount + 1) % settings.longBreakInterval === 0;
        switchMode(isLongBreak ? 'longBreak' : 'shortBreak', false);
      } else {
        switchMode('pomodoro', false);
      }
    }
  };

  // Task actions
  const handleAddTask = (taskData: Omit<Task, 'id' | 'actPomodoros' | 'completed' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      actPomodoros: 0,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [...prev, newTask]);
    if (!activeTaskId) {
      setActiveTaskId(newTask.id);
    }
  };

  const handleUpdateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const updated = { ...t, ...updates };
          // If task is completed and was the active task, optional auto switch
          return updated;
        }
        return t;
      })
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (activeTaskId === id) {
      const remaining = tasks.filter((t) => t.id !== id);
      setActiveTaskId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const handleClearFinishedTasks = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  const handleClearActPomodoros = () => {
    setTasks((prev) => prev.map((t) => ({ ...t, actPomodoros: 0 })));
  };

  const handleClearAllTasks = () => {
    setTasks([]);
    setActiveTaskId(null);
  };

  const handleResetStats = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    setStats({
      history: {
        [todayStr]: { date: todayStr, pomodoros: 0, minutes: 0, tasksCompleted: 0 },
      },
      totalPomodoros: 0,
      totalMinutes: 0,
      dayStreak: 1,
      lastActiveDate: todayStr,
    });
  };

  // Theme Accent Color based on mode
  const currentBgColor =
    mode === 'pomodoro'
      ? settings.themeColorPomodoro
      : mode === 'shortBreak'
      ? settings.themeColorShortBreak
      : settings.themeColorLongBreak;

  const activeTask = tasks.find((t) => t.id === activeTaskId);

  return (
    <div
      style={{ backgroundColor: currentBgColor }}
      className="min-h-screen transition-colors duration-500 ease-in-out font-sans flex flex-col justify-between"
    >
      {/* Top Application Header */}
      <Header
        onOpenReport={() => setIsReportOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenDeveloper={() => setIsDeveloperOpen(true)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />

      {/* Main Focus Area */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 pb-16">
        {/* Central Timer Card */}
        <TimerCard
          mode={mode}
          timeLeft={timeLeft}
          totalDuration={getDurationForMode(mode)}
          isRunning={isRunning}
          activeTaskTitle={activeTask ? activeTask.title : null}
          pomodoroCount={pomodoroCount}
          accentColor={currentBgColor}
          onSwitchMode={(newMode) => switchMode(newMode, false)}
          onToggleTimer={handleToggleTimer}
          onSkipTimer={handleSkipTimer}
        />

        {/* Task Management Section */}
        <TasksList
          tasks={tasks}
          activeTaskId={activeTaskId}
          onSelectTask={(id) => setActiveTaskId(id)}
          onAddTask={handleAddTask}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          onClearFinishedTasks={handleClearFinishedTasks}
          onClearActPomodoros={handleClearActPomodoros}
          onClearAllTasks={handleClearAllTasks}
          pomodoroTime={settings.pomodoroTime}
          shortBreakTime={settings.shortBreakTime}
        />

        {/* Informational landing content & Developer Spotlight */}
        <LandingContent />
      </main>

      {/* Modals */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={(newSettings) => {
          setSettings(newSettings);
          // If not currently running, update the timer duration immediately
          if (!isRunning) {
            if (mode === 'pomodoro') setTimeLeft(newSettings.pomodoroTime * 60);
            else if (mode === 'shortBreak') setTimeLeft(newSettings.shortBreakTime * 60);
            else setTimeLeft(newSettings.longBreakTime * 60);
          }
        }}
      />

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        stats={stats}
        onResetStats={handleResetStats}
      />

      <DeveloperModal
        isOpen={isDeveloperOpen}
        onClose={() => setIsDeveloperOpen(false)}
      />
    </div>
  );
}
