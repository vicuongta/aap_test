import {
  CalendarDays,
  ClipboardList,
  BookOpen,
  Sigma,
  FileText,
} from "lucide-react";

const deadlines = [
  {
    title: "Data Structures Assignment 3",
    course: "CS301",
    date: "Jan 22, 2026",
    dueIn: "Tomorrow",
    dueColor: "text-red-500",
    icon: ClipboardList,
    barColor: "bg-pink-500",
  },
  {
    title: "Chapter 5-7 Reading",
    course: "PSYCH101",
    date: "Jan 23, 2026",
    dueIn: "2 days",
    dueColor: "text-rose-500",
    icon: BookOpen,
    barColor: "bg-pink-400",
  },
  {
    title: "Linear Algebra Quiz",
    course: "MATH201",
    date: "Jan 25, 2026",
    dueIn: "4 days",
    dueColor: "text-yellow-600",
    icon: Sigma,
    barColor: "bg-yellow-400",
  },
  {
    title: "Research Paper Draft",
    course: "ENG102",
    date: "Jan 27, 2026",
    dueIn: "6 days",
    dueColor: "text-green-500",
    icon: FileText,
    barColor: "bg-green-500",
  },
  // Add more items if you want to test scrolling
];

export default function UpcomingDeadlines() {
  return (
    <div className="bg-white rounded-xl border border-gray-100/50 flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2 font-semibold text-gray-700">
            <CalendarDays className="w-5 h-5 text-yellow-500" />
            Coming Up
          </div>
          <button className="text-sm text-gray-400 hover:text-gray-600">See all</button>
        </div>
        <p className="text-sm text-gray-400">4 deadlines</p>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {deadlines.map((item, index) => (
          <div key={index} className="flex gap-3">
            <div className={`w-1 rounded-full ${item.barColor}`}></div>
            <div className="flex-1 space-y-0.5">
              <div className="flex items-center gap-1 text-sm font-medium text-gray-800">
                <item.icon className="w-4 h-4 text-gray-400" />
                {item.title}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded-md text-[11px] font-semibold">
                  {item.course}
                </span>
                <span>{item.date}</span>
              </div>
              <div className={`text-xs font-medium ${item.dueColor}`}>
                {item.dueIn}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
