import { CalendarDays, Clock } from "lucide-react";
import { format, differenceInDays, addHours, setHours, setMinutes } from "date-fns";

// Mock data with specific times and descriptions
const now = new Date();
const deadlines = [
  {
    title: "Data Structures Assignment 3",
    course: "CS301",
    dueDate: setMinutes(setHours(addHours(now, 24), 23), 59),
    weight: 8,
    description: "Submit implementation of Red-Black trees."
  },
  {
    title: "Chapter 5-7 Reading",
    course: "PSYCH101",
    dueDate: setMinutes(setHours(addHours(now, 48), 10), 0),
    weight: 3,
    description: "Focus on cognitive development theories."
  },
  {
    title: "Linear Algebra Quiz",
    course: "MATH201",
    dueDate: setMinutes(setHours(addHours(now, 96), 14), 30),
    weight: 6,
    description: "Topics: Vector spaces and matrices."
  },
  {
    title: "Research Paper Draft",
    course: "ENG102",
    dueDate: setMinutes(setHours(addHours(now, 144), 17), 0),
    weight: 9,
    description: "Outline main arguments and cite 3 sources."
  },
  {
    title: "Final Project Proposal",
    course: "CS301",
    dueDate: setMinutes(setHours(addHours(now, 240), 9), 0), // 10 days out (should be filtered)
    weight: 10,
    description: "Propose a group project topic."
  }
];

// Helper to calculate priority styles (Subtle version)
const getPriorityStyles = (task) => {
  const daysRemaining = differenceInDays(task.dueDate, new Date());
  const effectiveDays = daysRemaining <= 0 ? 0.5 : daysRemaining;

  const score = (10 / effectiveDays) + task.weight;

  if (score >= 12) {
    return {
      border: "border-l-red-500",
      text: "text-red-600"
    };
  } else if (score >= 7) {
    return {
      border: "border-l-orange-500",
      text: "text-orange-600"
    };
  } else {
    return {
      border: "border-l-green-500",
      text: "text-green-600"
    };
  }
};

export default function UpcomingDeadlines() {
  // Filter logic: Only next 7 days
  const upcomingDeadlines = deadlines.filter(task => {
    const days = differenceInDays(task.dueDate, new Date());
    return days >= 0 && days <= 7;
  });

  return (
    <div className="bg-white rounded-xl border border-gray-100/50 flex flex-col h-full min-h-0 overflow-hidden">
      {/* Solid Header */}
      {/* Solid Header */}
      <div className="px-4 py-3 rounded-t-xl" style={{ backgroundColor: '#D97706' }}>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 font-semibold text-white mb-0.5">
              <CalendarDays className="w-5 h-5 text-white" />
              Coming Up Deadline
            </div>
            <p className="text-xs text-white/80">
              This list only shows deadlines for the next 7 days.
            </p>
          </div>
          {/* Inverted badge - white bg with orange text */}
          <span className="flex items-center justify-center text-sm px-3 py-1 rounded-full bg-white text-amber-600 font-medium self-center">
            <span className="font-bold mr-1">{upcomingDeadlines.length}</span> deadlines
          </span>
        </div>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3 pt-2">
        {upcomingDeadlines.map((item, index) => {
          const styles = getPriorityStyles(item);
          const daysLeft = differenceInDays(item.dueDate, new Date());

          // Logic for due text
          let dueLabel = `${daysLeft} days`;
          if (daysLeft <= 0) dueLabel = "Today";
          else if (daysLeft === 1) dueLabel = "Tomorrow";

          return (
            <div
              key={index}
              className={`flex flex-col p-3 rounded-r-md rounded-l-[4px] bg-white border border-gray-300 border-l-4 ${styles.border} shadow-sm transition-all hover:shadow-md hover:border-gray-400`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0 pr-2">
                  <div className="text-sm font-semibold text-gray-800 leading-tight">
                    {item.title}
                  </div>
                  {/* Description removed */}

                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-1.5 py-0.5 bg-gray-50 text-gray-600 rounded text-[10px] font-semibold border border-gray-100 uppercase tracking-wide">
                      {item.course}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-700 font-medium">
                      <span>{format(item.dueDate, "MMM d")}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">
                        <Clock className="w-3 h-3" />
                        {format(item.dueDate, "h:mm a")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`text-xs font-bold whitespace-nowrap ${styles.text}`}>
                  {dueLabel}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer with See All */}
      <div className="p-3 border-t border-gray-50">
        <button className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 p-2 rounded-md transition-colors">
          See all
        </button>
      </div>
    </div>
  );
}
