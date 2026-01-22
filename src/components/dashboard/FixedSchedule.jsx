import React, { useState } from 'react';
import { Calendar, Dumbbell, Briefcase, Bus, BookOpen, Filter, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCourseColor } from '@/components/utils/courseColors';

const mockFixedItems = [
  { id: 1, title: 'Calculus II Class', course: 'MATH201', days: 'Mon, Wed, Fri', time: '10:00 AM', icon: BookOpen, type: 'class', courseColor: 'blue' },
  { id: 2, title: 'Part-time Job', days: 'Tue, Thu', time: '2:00 PM - 6:00 PM', icon: Briefcase, type: 'work' },
  { id: 3, title: 'Gym Session', days: 'Mon, Wed, Fri', time: '7:00 AM', icon: Dumbbell, type: 'personal' },
  { id: 4, title: 'Commute', days: 'Weekdays', time: '8:30 AM', icon: Bus, type: 'other' },
  { id: 5, title: 'Physics Lab', course: 'CHEM101', days: 'Thursday', time: '1:00 PM - 3:00 PM', icon: Calendar, type: 'class', courseColor: 'cyan' },
];

export default function FixedSchedule() {
  const [filter, setFilter] = useState('all');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const filteredItems = filter === 'all' 
    ? mockFixedItems 
    : mockFixedItems.filter(item => item.type === filter);

  return (
    <div className="bg-white rounded-xl border border-gray-100/50 h-full flex flex-col overflow-hidden">
      <div className="px-3 py-2 border-b border-gray-50 flex-shrink-0">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex-1">
            <h3 className="text-xs font-bold text-gray-800">Your Fixed Schedule</h3>
            <p className="text-xs text-gray-500 mt-0.5">Regular commitments</p>
          </div>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-400 hover:text-gray-600"
          >
            <ChevronDown className={cn("w-4 h-4 transition-transform", isCollapsed && "rotate-180")} />
          </button>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <Filter className="w-3 h-3 text-gray-400" />
          {['all', 'class', 'work', 'personal', 'other'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={cn(
                "px-2 py-1 rounded-md text-xs font-medium transition-colors",
                filter === type 
                  ? "bg-[#2d6a4f] text-white" 
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              )}
            >
              {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1) + 's'}
            </button>
          ))}
        </div>
      </div>
      {!isCollapsed && (
        <div className="divide-y divide-gray-50/80 overflow-y-auto flex-1">
          {filteredItems.map((item) => {
            const IconComponent = item.icon;
            const color = item.courseColor ? getCourseColor(item.courseColor) : null;
            return (
              <div key={item.id} className="px-2.5 py-1.5 hover:bg-gray-50/40 transition-colors">
              <div className="flex items-center gap-1.5">
                {color && <div className="w-1 h-8 rounded-full flex-shrink-0" style={{ backgroundColor: color.accent }} />}
                <div className={cn("w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0", color ? '' : 'bg-[#2d6a4f]/8')}>
                  <IconComponent className={cn("w-3 h-3", color ? '' : 'text-[#2d6a4f]/70')} style={color ? { color: color.text } : {}} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-medium text-gray-800 truncate">{item.title}</p>
                    {item.course && color && (
                      <span className="text-xs px-1.5 py-0.5 rounded flex-shrink-0" style={{ backgroundColor: color.bg, color: color.text }}>
                        {item.course}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{item.days} · {item.time}</p>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      )}
    </div>
  );
}