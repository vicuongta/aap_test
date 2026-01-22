import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function WeekProgressCard() {
  const percentage = 78;
  const completed = 14;
  const total = 18;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-3">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 font-medium mb-1">This Week's Progress</p>
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="#E5E7EB"
                  strokeWidth="6"
                  fill="none"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="#2d6a4f"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - percentage / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-base font-bold text-gray-900">{percentage}%</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-600">
                <span className="text-xl font-bold text-gray-900">{completed}</span>
                <span className="text-gray-400"> / {total}</span>
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Tasks completed</p>
            </div>
          </div>
        </div>
        <div className="w-8 h-8 rounded-lg bg-[#2d6a4f]/10 flex items-center justify-center flex-shrink-0">
          <TrendingUp className="w-3.5 h-3.5 text-[#2d6a4f]" />
        </div>
      </div>
    </div>
  );
}