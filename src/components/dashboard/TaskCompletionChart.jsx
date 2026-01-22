import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { getCourseColor } from '@/components/utils/courseColors';

const courseData = [
  { course: 'CHEM101', courseColor: 'cyan', completion: 90 },
  { course: 'ENG102', courseColor: 'purple', completion: 48 },
  { course: 'MATH201', courseColor: 'blue', completion: 63 },
  { course: 'PSYCH101', courseColor: 'magenta', completion: 25 },
  { course: 'CS301', courseColor: 'indigo', completion: 93 }
].map(item => ({
  ...item,
  color: getCourseColor(item.courseColor).accent
}));

export default function TaskCompletionChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Task Completion by Course</h3>
      
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={courseData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
          <XAxis 
            dataKey="course" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B7280', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B7280', fontSize: 12 }}
            ticks={[0, 20, 40, 60, 80, 100]}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Bar dataKey="completion" radius={[8, 8, 0, 0]} barSize={60}>
            {courseData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      <div className="flex justify-center gap-4 mt-3 flex-wrap">
        {courseData.map((course, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: course.color }} />
            <span className="text-xs text-gray-600">{course.course}</span>
          </div>
        ))}
      </div>
    </div>
  );
}