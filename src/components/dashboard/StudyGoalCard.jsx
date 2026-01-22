import React from 'react';
import { Target } from 'lucide-react';

export default function StudyGoalCard() {
  const current = 15;
  const goal = 20;
  const percentage = Math.round((current / goal) * 100);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-3">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 font-medium mb-1">Weekly Study Goal</p>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-gray-900">{current}h</span>
            <span className="text-sm text-gray-400">/ {goal}h</span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-lg bg-[#2d6a4f]/10 flex items-center justify-center flex-shrink-0">
          <Target className="w-3.5 h-3.5 text-[#2d6a4f]" />
        </div>
      </div>

      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#2d6a4f] rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-[#2d6a4f] font-medium mt-1">{percentage}%</p>
    </div>
  );
}