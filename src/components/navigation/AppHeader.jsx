import React from 'react';
import ProfileDropdown from './ProfileDropdown';
import { Bell, Pause, Play, X, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTimer } from '@/contexts/TimerContext';

export default function AppHeader({ user, title, breadcrumb }) {
  const { activeTask, remainingSeconds, isPaused, isRunning, togglePause, stopTimer, formatTime } = useTimer();

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6">
      <div className="flex flex-col">
        {breadcrumb && (
          <nav className="text-xs text-gray-400 mb-0.5">
            {breadcrumb}
          </nav>
        )}
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Timer Display */}
        {isRunning && (
          <div className="flex items-center gap-2 bg-amber-50/50 border-2 border-amber-400 rounded-lg px-3 py-1.5 shadow-sm">
            <Timer className="w-4 h-4 text-green-900" />
            <div className="flex flex-col">
              <span className="text-xs text-green-800 font-medium truncate max-w-[120px]">
                {activeTask?.title}
              </span>
              <span className="text-xl font-bold text-green-900 tabular-nums">
                {formatTime(remainingSeconds)}
              </span>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-green-900 hover:text-green-950 hover:bg-amber-200/50"
                onClick={togglePause}
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-green-900 hover:text-red-700 hover:bg-red-100/50"
                onClick={stopTimer}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Timer Complete State */}
        {activeTask && remainingSeconds === 0 && (
          <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-1.5">
            <Timer className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-bold text-yellow-700">Time's up!</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-yellow-600 hover:bg-yellow-100"
              onClick={stopTimer}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-gray-700">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
        </Button>
        <ProfileDropdown user={user} />
      </div>
    </header>
  );
}