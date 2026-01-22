import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { format, addDays, startOfWeek, isToday, getHours, getMinutes } from 'date-fns';
import { getCourseColorByCode } from '@/components/utils/courseColors';

const timeSlots = Array.from({ length: 14 }, (_, i) => i + 8); // 8 AM to 9 PM

const mockScheduleBlocks = [
  { id: 1, title: 'Binary Search Trees', course: 'CS301', day: 1, startHour: 9, duration: 2, priority: 'medium' },
  { id: 2, title: 'Chapter Reading', course: 'PSYCH101', day: 1, startHour: 14, duration: 1.5, priority: 'low' },
  { id: 3, title: 'Midterm Study', course: 'MATH201', day: 2, startHour: 10, duration: 2, priority: 'high' },
  { id: 4, title: 'Project Proposal', course: 'ENG102', day: 2, startHour: 15, duration: 2, priority: 'high' },
  { id: 5, title: 'Binary Search Trees', course: 'CS301', day: 3, startHour: 9, duration: 2, priority: 'medium' },
  { id: 6, title: 'Midterm Study', course: 'MATH201', day: 4, startHour: 11, duration: 2, priority: 'high' },
  { id: 7, title: 'Graph Algorithms', course: 'CS301', day: 4, startHour: 16, duration: 1.5, priority: 'medium' },
  { id: 8, title: 'Project Proposal', course: 'ENG102', day: 5, startHour: 10, duration: 2, priority: 'medium' },
  { id: 9, title: 'Chapter Reading', course: 'PSYCH101', day: 6, startHour: 10, duration: 1.5, priority: 'low' },
];

const getPriorityDotColor = (priority) => {
  if (priority === 'high') return 'bg-rose-500';
  if (priority === 'medium') return 'bg-amber-500';
  return 'bg-gray-400';
};

export default function WeeklyCalendar({ currentWeek }) {
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const getCurrentTimePosition = () => {
    const hours = getHours(currentTime);
    const minutes = getMinutes(currentTime);
    if (hours < 8 || hours >= 22) return null;
    const position = ((hours - 8) * 64) + ((minutes / 60) * 64);
    return position;
  };

  const todayIndex = days.findIndex(day => isToday(day));
  const currentTimePosition = getCurrentTimePosition();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-8 border-b border-gray-100">
        <div className="p-4 bg-[#f6f8f6]"></div>
        {days.map((day, index) => {
          const isDayToday = isToday(day);
          return (
            <div 
              key={index} 
              className={cn(
                "p-4 text-center border-l border-gray-100",
                isDayToday && "bg-[#2d6a4f]/5"
              )}
            >
              {isDayToday && (
                <p className="text-xs font-semibold text-[#2d6a4f] uppercase tracking-wide mb-1">Today</p>
              )}
              <p className="text-xs text-gray-500 uppercase tracking-wide">{format(day, 'EEE')}</p>
              <p className={cn(
                "text-lg font-semibold mt-1",
                isDayToday ? "text-[#2d6a4f]" : "text-gray-900"
              )}>
                {format(day, 'd')}
              </p>
            </div>
          );
        })}
      </div>

      {/* Time Grid */}
      <div className="relative">
        <div className="grid grid-cols-8">
          {/* Time column */}
          <div className="border-r border-gray-100">
            {timeSlots.map((hour) => (
              <div key={hour} className="h-16 border-b border-gray-50 px-3 pt-1">
                <span className="text-xs text-gray-400">
                  {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
                </span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {days.map((day, dayIndex) => {
            const isDayToday = isToday(day);
            return (
              <div 
                key={dayIndex} 
                className={cn(
                  "relative border-r border-gray-100 last:border-r-0",
                  isDayToday && "bg-[#2d6a4f]/5"
                )}
              >
                {timeSlots.map((hour) => (
                  <div key={hour} className="h-16 border-b border-gray-50"></div>
                ))}
                
                {/* Current time indicator - only show in today's column */}
                {isDayToday && currentTimePosition !== null && (
                  <div 
                    className="absolute left-0 right-0 z-10 pointer-events-none"
                    style={{ top: `${currentTimePosition}px` }}
                  >
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#2d6a4f] -ml-1" />
                      <div className="flex-1 h-0.5 bg-[#2d6a4f]" />
                    </div>
                  </div>
                )}
                
                {/* Schedule blocks */}
                {mockScheduleBlocks
                  .filter(block => block.day === dayIndex)
                  .map((block) => {
                    const courseColor = getCourseColorByCode(block.course);
                    return (
                      <div
                        key={block.id}
                        className="absolute left-1 right-1 rounded-lg border px-2 py-1 cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
                        style={{
                          top: `${(block.startHour - 8) * 64}px`,
                          height: `${block.duration * 64 - 4}px`,
                          backgroundColor: courseColor.bg,
                          borderColor: courseColor.border,
                          borderLeftWidth: '3px',
                          borderLeftColor: courseColor.accent,
                          color: courseColor.text
                        }}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate">{block.title}</p>
                            <p className="text-xs opacity-70">
                              {block.startHour > 12 ? block.startHour - 12 : block.startHour}
                              {block.startHour >= 12 ? 'PM' : 'AM'}
                            </p>
                          </div>
                          {block.priority && (
                            <div className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0 mt-0.5", getPriorityDotColor(block.priority))} />
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}