export type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';

export interface Task {
  id: string;
  title: string;
  estPomodoros: number;
  actPomodoros: number;
  completed: boolean;
  note?: string;
  project?: string;
  createdAt: number;
}

export interface Settings {
  pomodoroTime: number; // minutes
  shortBreakTime: number; // minutes
  longBreakTime: number; // minutes
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  longBreakInterval: number;
  alarmSound: 'bell' | 'digital' | 'chime' | 'wood' | 'gong';
  alarmVolume: number; // 0 - 100
  alarmRepeat: number;
  tickingSound: 'none' | 'fast' | 'slow';
  tickingVolume: number;
  themeColorPomodoro: string;
  themeColorShortBreak: string;
  themeColorLongBreak: string;
  darkMode: boolean;
  autoCheckTasks: boolean;
  autoSwitchTasks: boolean;
  soundNotification: boolean;
}

export interface DayStat {
  date: string; // YYYY-MM-DD
  pomodoros: number;
  minutes: number;
  tasksCompleted: number;
}

export interface UserStats {
  history: Record<string, DayStat>;
  totalPomodoros: number;
  totalMinutes: number;
  dayStreak: number;
  lastActiveDate: string;
}
