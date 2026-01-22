import {
  Sparkles,
  Wand2,
  Plus,
  Filter,
  Clock,
  Calendar,
  Edit,
  Trash,
} from "lucide-react";
import { useState } from "react";
import { nanoid } from "nanoid";
import clsx from "clsx";

const courseColors = {
  CS301: "border-blue-500",
  MATH201: "border-yellow-500",
  ENG102: "border-purple-500",
  PSYCH101: "border-pink-500",
};

const initialSuggestions = [
  {
    id: nanoid(),
    title: "Review Lecture Slides",
    course: "CS301",
    duration: "30 min",
    source: "AI",
    reason: "Upcoming assignment due tomorrow",
  },
  {
    id: nanoid(),
    title: "Read Chapter 5",
    course: "PSYCH101",
    duration: "25 min",
    source: "AI",
    reason: "Recommended based on low progress",
  },
];

export default function TodayStudyPlan() {
  const [tasks, setTasks] = useState([]);
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  const keepTask = (task) => {
    setTasks([...tasks, { ...task, source: "AI" }]);
    setSuggestions(suggestions.filter((s) => s.id !== task.id));
  };

  const dismissTask = (taskId) => {
    setSuggestions(suggestions.filter((s) => s.id !== taskId));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100/50 flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-[#2d6a4f] mt-0.5" />
            <div className="text-sm text-gray-600 leading-snug">
              <div className="font-semibold text-gray-900">Today’s Study Plan</div>
              <div className="flex items-center gap-1 text-gray-600">
                Uses your Task List + deadlines to suggest what to do today.
              </div>
            </div>
          </div>
          <button
            className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-md bg-[#2d6a4f] hover:bg-green-700 text-white font-medium"
            onClick={() => setSuggestions(initialSuggestions)}
          >
            <Wand2 className="w-4 h-4" />
            Recommend tasks
          </button>
        </div>
      </div>

      <hr className="border-gray-100 mb-2" />

      {/* Controls */}
      <div className="px-4 pb-2 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 font-medium text-gray-700">
          My Plan
          <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-500">
            {tasks.length} tasks
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 text-gray-600 bg-gray-100 rounded-md px-2 py-1 text-xs">
            <Filter className="w-3.5 h-3.5" />
            All
          </button>
          <button className="flex items-center gap-1 text-[#2d6a4f] text-sm font-medium hover:underline">
            <Plus className="w-4 h-4" />
            Add Task
          </button>
        </div>
      </div>

      {/* Task Suggestions */}
      {suggestions.length > 0 && (
        <div className="px-4 space-y-3">
          <p className="text-xs text-gray-500">Suggested for you:</p>
          {suggestions.map((task) => (
            <div
              key={task.id}
              className={`border-l-4 p-3 rounded-md bg-gray-50 ${courseColors[task.course] || "border-gray-300"}`}
            >
              <div className="flex justify-between items-start text-sm font-medium text-gray-800">
                <div>
                  {task.title}{" "}
                  <span className="text-xs text-gray-500 font-normal">({task.duration})</span>
                  <div className="text-xs text-gray-500 mt-1">{task.reason}</div>
                  <span className="text-[10px] font-semibold uppercase bg-green-100 text-[#2d6a4f] px-1.5 py-0.5 rounded mt-2 inline-block">
                    AI
                  </span>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    className="text-xs text-[#2d6a4f] font-semibold"
                    onClick={() => keepTask(task)}
                  >
                    Keep
                  </button>
                  <button
                    className="text-xs text-red-500 font-semibold"
                    onClick={() => dismissTask(task.id)}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Task List */}
      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-6 space-y-3">
        {tasks.length === 0 ? (
          <p className="text-sm text-gray-400 text-center mt-4">
            {/* No tasks in your plan yet. */}
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`border-l-4 p-3 rounded-md bg-white shadow-sm ${courseColors[task.course] || "border-gray-300"}`}
            >
              <div className="flex justify-between items-start">
                <div className="text-sm font-medium text-gray-800">
                  {task.title}
                  <div className="text-xs text-gray-500">
                    Course: {task.course} • {task.duration}
                  </div>
                  <span className="text-[10px] font-semibold uppercase bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded mt-2 inline-block">
                    {task.source}
                  </span>
                </div>
                <div className="flex gap-2 text-gray-500">
                  {/* <Clock className="w-4 h-4 cursor-pointer hover:text-green-600" title="Start timer" />
                  <Calendar className="w-4 h-4 cursor-pointer hover:text-blue-600" title="Schedule" />
                  <Edit className="w-4 h-4 cursor-pointer hover:text-yellow-600" title="Edit" /> */}
                  {/* <Trash
                    className="w-4 h-4 cursor-pointer hover:text-red-500"
                    title="Remove"
                    onClick={() =>
                      setTasks(tasks.filter((t) => t.id !== task.id))
                    }
                  /> */}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
