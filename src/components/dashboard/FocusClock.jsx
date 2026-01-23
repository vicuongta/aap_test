import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FocusClock() {
  const [mode, setMode] = useState('study'); // 'study', 'break', or 'long'
  const [duration, setDuration] = useState(25); // duration in minutes
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleIncrease = () => {
    if (!isRunning && duration < 60) {
      const newDuration = duration + 5;
      setDuration(newDuration);
      setTimeLeft(newDuration * 60);
    }
  };

  const handleDecrease = () => {
    if (!isRunning && duration > 5) {
      const newDuration = duration - 5;
      setDuration(newDuration);
      setTimeLeft(newDuration * 60);
    }
  };

  const handleModeChange = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    const durations = { study: 25, break: 5, long: 15 };
    const newDuration = durations[newMode];
    setDuration(newDuration);
    setTimeLeft(newDuration * 60);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 px-4 py-2.5 flex items-center gap-3">
      {/* Mode Buttons */}
      {/* <div className="flex items-center gap-1">
        <button
          onClick={() => handleModeChange('study')}
          disabled={isRunning}
          className={cn(
            "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
            mode === 'study' 
              ? "bg-[#2d6a4f] text-white" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200",
            isRunning && "opacity-50 cursor-not-allowed"
          )}
        >
          Study
        </button>
        <button
          onClick={() => handleModeChange('break')}
          disabled={isRunning}
          className={cn(
            "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
            mode === 'break' 
              ? "bg-[#2d6a4f] text-white" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200",
            isRunning && "opacity-50 cursor-not-allowed"
          )}
        >
          Break
        </button>
        <button
          onClick={() => handleModeChange('long')}
          disabled={isRunning}
          className={cn(
            "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
            mode === 'long' 
              ? "bg-[#2d6a4f] text-white" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200",
            isRunning && "opacity-50 cursor-not-allowed"
          )}
        >
          Long
        </button>
      </div> */}

      {/* Timer Display */}
      <div className="text-lg font-semibold text-gray-900 mx-2">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-1">
        <button
          onClick={handleDecrease}
          disabled={isRunning}
          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Minus className="w-3 h-3" />
        </button>

        <button
          onClick={() => setIsRunning(!isRunning)}
          disabled={timeLeft === 0}
          className="w-7 h-7 rounded-full bg-[#2d6a4f] flex items-center justify-center text-white hover:bg-[#1b4332] transition-colors disabled:opacity-40 disabled:cursor-not-allowed mx-1"
        >
          {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
        </button>

        <button
          onClick={handleIncrease}
          disabled={isRunning}
          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}