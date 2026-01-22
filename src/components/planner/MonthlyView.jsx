import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { cn } from '@/lib/utils';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, startOfWeek, endOfWeek } from 'date-fns';

const mockDeadlines = [
  { id: 1, date: '2026-01-08', title: 'Midterm Exam', category: 'exam', course: 'CS301' },
  { id: 2, date: '2026-01-10', title: 'Chapter Quiz', category: 'exam', course: 'MATH201' },
  { id: 3, date: '2026-01-12', title: 'Project Proposal', category: 'project', course: 'CS301' },
  { id: 4, date: '2026-01-15', title: 'Homework 3', category: 'homework', course: 'PHYS101' },
  { id: 5, date: '2026-01-18', title: 'Final Exam', category: 'exam', course: 'CS301' },
  { id: 6, date: '2026-01-22', title: 'Lab Report', category: 'homework', course: 'CHEM101' },
  { id: 7, date: '2026-01-25', title: 'Pop Quiz', category: 'exam', course: 'ENG102' },
];

const categoryConfig = {
  exam: { color: 'text-rose-600', indicator: 'bg-rose-500', label: 'Exam' },
  homework: { color: 'text-emerald-600', indicator: 'bg-emerald-500', label: 'Assignment' },
  project: { color: 'text-amber-600', indicator: 'bg-amber-500', label: 'Project' },
};

export default function MonthlyView({ currentMonth }) {
  const navigate = useNavigate();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getDeadlinesForDay = (day) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    return mockDeadlines.filter(d => d.date === dateStr);
  };

  const handleDayClick = (day, deadlines) => {
    if (deadlines.length > 0) {
      navigate(createPageUrl('TaskList'));
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Month Header */}
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">
          {format(monthStart, 'MMMM yyyy')}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {mockDeadlines.length} deadline{mockDeadlines.length !== 1 ? 's' : ''} this month
        </p>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const deadlines = getDeadlinesForDay(day);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isDayToday = isToday(day);

            return (
              <button
                key={index}
                onClick={() => handleDayClick(day, deadlines)}
                className={cn(
                  "rounded-xl p-2 transition-all relative min-h-[90px]",
                  isCurrentMonth ? "bg-white" : "bg-gray-50",
                  deadlines.length > 0 ? "hover:bg-gray-50 cursor-pointer" : "cursor-default",
                  isDayToday && "ring-2 ring-[#2d6a4f]"
                )}
              >
                <div className="flex flex-col h-full">
                  <span className={cn(
                    "text-sm font-medium mb-1.5",
                    !isCurrentMonth && "text-gray-400",
                    isDayToday && "text-[#2d6a4f] font-semibold"
                  )}>
                    {format(day, 'd')}
                  </span>
                  
                  {/* Deadline items */}
                  {deadlines.length > 0 && (
                    <div className="flex-1 flex flex-col gap-1">
                      {deadlines.slice(0, 2).map((deadline) => {
                        const config = categoryConfig[deadline.category] || { color: 'text-gray-600', indicator: 'bg-gray-400', label: 'Task' };
                        return (
                          <div
                            key={deadline.id}
                            className="flex items-start gap-1 group"
                            title={`${config.label}: ${deadline.title}`}
                          >
                            <div className={cn("w-0.5 h-full rounded-full flex-shrink-0 mt-0.5", config.indicator)} />
                            <div className="flex-1 min-w-0">
                              <p className={cn("text-xs font-medium truncate", config.color)}>
                                {config.label}
                              </p>
                              <p className="text-xs text-gray-600 truncate leading-tight">
                                {deadline.title}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                      {deadlines.length > 2 && (
                        <span className="text-xs text-gray-400 pl-1.5">
                          +{deadlines.length - 2} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-500"></div>
            <span className="text-xs text-gray-600">Exam/Quiz</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <span className="text-xs text-gray-600">Project</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-xs text-gray-600">Assignment</span>
          </div>
        </div>
      </div>
    </div>
  );
}