import React, { useState } from 'react';
import {
  MoreVertical,
  Plus,
  CheckCircle2,
  Circle,
  FileText,
  Trash2,
  ChevronUp,
  ChevronDown,
  Edit2,
  Tag,
} from 'lucide-react';
import { Task } from '../types';

interface TasksListProps {
  tasks: Task[];
  activeTaskId: string | null;
  onSelectTask: (id: string) => void;
  onAddTask: (task: Omit<Task, 'id' | 'actPomodoros' | 'completed' | 'createdAt'>) => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
  onClearFinishedTasks: () => void;
  onClearActPomodoros: () => void;
  onClearAllTasks: () => void;
  pomodoroTime: number;
  shortBreakTime: number;
}

export const TasksList: React.FC<TasksListProps> = ({
  tasks,
  activeTaskId,
  onSelectTask,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onClearFinishedTasks,
  onClearActPomodoros,
  onClearAllTasks,
  pomodoroTime,
  shortBreakTime,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // New task form state
  const [newTitle, setNewTitle] = useState('');
  const [newEst, setNewEst] = useState(1);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [showProjectInput, setShowProjectInput] = useState(false);
  const [newProject, setNewProject] = useState('');

  // Edit task form state
  const [editTitle, setEditTitle] = useState('');
  const [editEst, setEditEst] = useState(1);
  const [editAct, setEditAct] = useState(0);
  const [editNote, setEditNote] = useState('');
  const [editProject, setEditProject] = useState('');

  const handleStartAdd = () => {
    setIsAdding(true);
    setEditingTaskId(null);
    setNewTitle('');
    setNewEst(1);
    setNewNote('');
    setNewProject('');
    setShowNoteInput(false);
    setShowProjectInput(false);
  };

  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddTask({
      title: newTitle.trim(),
      estPomodoros: Math.max(1, newEst),
      note: newNote.trim() || undefined,
      project: newProject.trim() || undefined,
    });

    setIsAdding(false);
    setNewTitle('');
    setNewEst(1);
    setNewNote('');
    setNewProject('');
  };

  const handleStartEdit = (task: Task) => {
    setEditingTaskId(task.id);
    setIsAdding(false);
    setEditTitle(task.title);
    setEditEst(task.estPomodoros);
    setEditAct(task.actPomodoros);
    setEditNote(task.note || '');
    setEditProject(task.project || '');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTaskId || !editTitle.trim()) return;

    onUpdateTask(editingTaskId, {
      title: editTitle.trim(),
      estPomodoros: Math.max(1, editEst),
      actPomodoros: Math.max(0, editAct),
      note: editNote.trim() || undefined,
      project: editProject.trim() || undefined,
    });

    setEditingTaskId(null);
  };

  // Calculations for summary bar
  const totalAct = tasks.reduce((sum, t) => sum + t.actPomodoros, 0);
  const totalEst = tasks.reduce((sum, t) => sum + t.estPomodoros, 0);
  const remainingEst = tasks.filter((t) => !t.completed).reduce((sum, t) => sum + Math.max(0, t.estPomodoros - t.actPomodoros), 0);

  // Approximate finish time
  const remainingMinutes = remainingEst * pomodoroTime + Math.max(0, remainingEst - 1) * shortBreakTime;
  const finishDate = new Date(Date.now() + remainingMinutes * 60 * 1000);
  const finishHoursFormatted = finishDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const hoursLeft = (remainingMinutes / 60).toFixed(1);

  return (
    <div className="w-full max-w-xl mx-auto mt-7 text-white">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/20 relative">
        <h2 className="text-lg font-bold tracking-wide">Tasks</h2>

        {/* 3 dots menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 rounded bg-white/20 hover:bg-white/30 text-white transition-all"
            title="Task Options"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-xl text-gray-700 py-1 z-50 text-sm">
                <button
                  onClick={() => {
                    onClearFinishedTasks();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  <Trash2 className="w-3.5 h-3.5 text-gray-500" />
                  Clear finished tasks
                </button>
                <button
                  onClick={() => {
                    onClearActPomodoros();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  <Circle className="w-3.5 h-3.5 text-gray-500" />
                  Clear act pomodoros
                </button>
                <div className="border-t border-gray-100 my-1" />
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to clear all tasks?')) {
                      onClearAllTasks();
                    }
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-500" />
                  Clear all tasks
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Task list items */}
      <div className="mt-4 space-y-2.5">
        {tasks.map((task) => {
          const isSelected = activeTaskId === task.id;
          const isEditing = editingTaskId === task.id;

          if (isEditing) {
            return (
              <form
                key={task.id}
                onSubmit={handleSaveEdit}
                className="bg-white rounded-lg p-5 text-gray-800 shadow-md animate-fadeIn"
              >
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="What are you working on?"
                  className="w-full text-lg font-medium text-gray-900 border-none outline-none focus:ring-0 placeholder:text-gray-400 placeholder:italic mb-3"
                  autoFocus
                />

                <div className="flex flex-wrap items-center gap-4 my-3 text-sm text-gray-600 font-semibold">
                  <div>Act / Est Pomodoros</div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      value={editAct}
                      onChange={(e) => setEditAct(Number(e.target.value))}
                      className="w-16 bg-gray-100 rounded px-2 py-1 text-center font-bold text-gray-800 border border-gray-300"
                    />
                    <span>/</span>
                    <input
                      type="number"
                      min="1"
                      value={editEst}
                      onChange={(e) => setEditEst(Number(e.target.value))}
                      className="w-16 bg-gray-100 rounded px-2 py-1 text-center font-bold text-gray-800 border border-gray-300"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <textarea
                    value={editNote}
                    onChange={(e) => setEditNote(e.target.value)}
                    placeholder="Add a note..."
                    rows={2}
                    className="w-full bg-gray-50 border border-gray-200 rounded p-2 text-sm text-gray-800 outline-none focus:border-gray-400"
                  />
                </div>

                <div className="mt-2">
                  <input
                    type="text"
                    value={editProject}
                    onChange={(e) => setEditProject(e.target.value)}
                    placeholder="Project tag (optional)..."
                    className="w-full bg-gray-50 border border-gray-200 rounded px-2 py-1.5 text-sm text-gray-800 outline-none focus:border-gray-400"
                  />
                </div>

                <div className="flex items-center justify-between mt-5 pt-3 border-t border-gray-100 bg-gray-50 -mx-5 -mb-5 px-5 py-3 rounded-b-lg">
                  <button
                    type="button"
                    onClick={() => {
                      onDeleteTask(task.id);
                      setEditingTaskId(null);
                    }}
                    className="text-gray-500 hover:text-red-600 font-semibold text-sm flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingTaskId(null)}
                      className="text-gray-500 hover:text-gray-800 font-semibold text-sm px-3 py-1.5"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-gray-800 hover:bg-gray-900 text-white font-semibold text-sm px-5 py-1.5 rounded shadow-sm"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            );
          }

          return (
            <div
              key={task.id}
              onClick={() => onSelectTask(task.id)}
              className={`bg-white rounded-md p-3.5 text-gray-800 shadow-sm cursor-pointer transition-all flex items-center justify-between border-l-4 ${
                isSelected
                  ? 'border-l-gray-900 ring-2 ring-white/60 shadow-md'
                  : 'border-l-transparent hover:border-l-gray-400'
              }`}
            >
              {/* Left: Checkmark & Title */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateTask(task.id, { completed: !task.completed });
                  }}
                  className="text-gray-400 hover:text-emerald-500 transition-colors shrink-0"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>

                <div className="min-w-0">
                  <span
                    className={`block font-semibold text-sm sm:text-base truncate ${
                      task.completed ? 'line-through text-gray-400 font-normal' : 'text-gray-800'
                    }`}
                  >
                    {task.title}
                  </span>

                  {/* Project or note badge */}
                  {(task.project || task.note) && (
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500">
                      {task.project && (
                        <span className="inline-flex items-center gap-0.5 bg-gray-100 px-1.5 py-0.5 rounded text-[11px] text-gray-600 font-medium">
                          <Tag className="w-2.5 h-2.5" />
                          {task.project}
                        </span>
                      )}
                      {task.note && (
                        <span className="inline-flex items-center gap-0.5 text-gray-400" title={task.note}>
                          <FileText className="w-3 h-3" />
                          <span className="truncate max-w-[150px]">{task.note}</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Pomodoro count & Edit button */}
              <div className="flex items-center gap-3 shrink-0 ml-3">
                <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  <span className="font-bold text-gray-800">{task.actPomodoros}</span>
                  <span className="text-gray-400">/{task.estPomodoros}</span>
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartEdit(task);
                  }}
                  className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                  title="Edit Task"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Task Form or Button */}
      {isAdding ? (
        <form
          onSubmit={handleSaveNew}
          className="bg-white rounded-lg p-5 text-gray-800 shadow-md mt-4 animate-fadeIn"
        >
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="What are you working on?"
            className="w-full text-lg font-medium text-gray-900 border-none outline-none focus:ring-0 placeholder:text-gray-400 placeholder:italic mb-3"
            autoFocus
          />

          <div className="my-3 text-sm text-gray-600 font-semibold flex items-center justify-between">
            <span>Est Pomodoros</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="99"
                value={newEst}
                onChange={(e) => setNewEst(Math.max(1, Number(e.target.value)))}
                className="w-16 bg-gray-100 rounded px-2 py-1 text-center font-bold text-gray-800 border border-gray-300"
              />
              <button
                type="button"
                onClick={() => setNewEst((prev) => prev + 1)}
                className="p-1 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300"
              >
                <ChevronUp className="w-4 h-4 text-gray-700" />
              </button>
              <button
                type="button"
                onClick={() => setNewEst((prev) => Math.max(1, prev - 1))}
                className="p-1 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300"
              >
                <ChevronDown className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Collapsible Note */}
          {showNoteInput ? (
            <div className="mt-3">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Some notes..."
                rows={2}
                className="w-full bg-gray-50 border border-gray-200 rounded p-2 text-sm text-gray-800 outline-none focus:border-gray-400"
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowNoteInput(true)}
              className="text-xs text-gray-500 hover:text-gray-700 underline font-medium mt-1 mr-4"
            >
              + Add Note
            </button>
          )}

          {/* Collapsible Project */}
          {showProjectInput ? (
            <div className="mt-2">
              <input
                type="text"
                value={newProject}
                onChange={(e) => setNewProject(e.target.value)}
                placeholder="Project tag..."
                className="w-full bg-gray-50 border border-gray-200 rounded px-2 py-1.5 text-sm text-gray-800 outline-none focus:border-gray-400"
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowProjectInput(true)}
              className="text-xs text-gray-500 hover:text-gray-700 underline font-medium mt-1"
            >
              + Add Project
            </button>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 mt-5 pt-3 border-t border-gray-100 bg-gray-50 -mx-5 -mb-5 px-5 py-3 rounded-b-lg">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-gray-500 hover:text-gray-800 font-semibold text-sm px-3 py-1.5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!newTitle.trim()}
              className="bg-gray-800 hover:bg-gray-900 disabled:opacity-50 text-white font-semibold text-sm px-5 py-1.5 rounded shadow-sm"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={handleStartAdd}
          className="w-full mt-4 py-4 border-2 border-dashed border-white/40 bg-black/10 hover:bg-black/15 text-white/90 hover:text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
        >
          <Plus className="w-5 h-5" />
          <span>Add Task</span>
        </button>
      )}

      {/* Estimation and Finish time bottom bar */}
      {tasks.length > 0 && (
        <div className="mt-6 bg-white/10 rounded-md p-4 text-center text-sm font-medium flex flex-wrap items-center justify-around gap-3 border-t border-white/15">
          <div>
            Pomos: <span className="font-bold text-white text-base">{totalAct}</span> /{' '}
            <span className="font-bold text-white text-base">{totalEst}</span>
          </div>
          <div>
            Finish at:{' '}
            <span className="font-bold text-white text-base">{finishHoursFormatted}</span>{' '}
            <span className="text-white/80 text-xs">({hoursLeft}h)</span>
          </div>
        </div>
      )}
    </div>
  );
};
