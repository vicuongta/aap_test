import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronRight } from 'lucide-react';
import { getCourseColor } from '@/components/utils/courseColors';

const tasks = [
  { id: 1, title: 'Review Lecture Slides', course: 'CS101', courseColor: 'sky', duration: '30 min' },
  { id: 2, title: 'Start Research Outline', course: 'ENG102', courseColor: 'purple', duration: '1 hr' },
  { id: 3, title: 'Practice Problem Set', course: 'MATH201', courseColor: 'blue', duration: '45 min' },
  { id: 4, title: 'Read Chapter 4', course: 'PSYCH101', courseColor: 'magenta', duration: '25 min' },
  { id: 5, title: 'Watch Tutorial Video', course: 'CS301', courseColor: 'indigo', duration: '20 min' }
];

export default function WorkOnThese() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col flex-1 h-full overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">Work On These</h3>
          <p className="text-xs text-gray-500 mt-0.5">Flexible study tasks</p>
        </div>
        <Link to={createPageUrl('TaskList')} className="text-[#2d6a4f] text-sm font-medium hover:underline flex items-center gap-1">
          See all
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="mb-3">
        <Select defaultValue="all">
          <SelectTrigger className="w-full h-9 bg-gray-50 border-gray-200">
            <SelectValue placeholder="All Courses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            <SelectItem value="cs101">CS101</SelectItem>
            <SelectItem value="eng102">ENG102</SelectItem>
            <SelectItem value="math201">MATH201</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5 flex-1 overflow-auto">
        {tasks.map((task) => {
          const color = getCourseColor(task.courseColor);
          return (
            <div key={task.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer">
              <div className="w-1 h-8 rounded-full flex-shrink-0" style={{ backgroundColor: color.accent }} />
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-gray-300 text-[#2d6a4f] focus:ring-[#2d6a4f] flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-800 truncate">{task.title}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: color.bg, color: color.text }}>{task.course}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-600">{task.duration}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="text-[#2d6a4f] text-sm font-medium hover:underline text-left pt-3">
        + Add Task
      </button>
    </div>
  );
}