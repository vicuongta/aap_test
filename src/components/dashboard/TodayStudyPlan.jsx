import {
  Sparkles,
  Wand2,
  Plus,
  Filter,
  Check,
  X,
  GripVertical,
  MoreHorizontal,
  Play
} from "lucide-react";
import { useState } from "react";
import { nanoid } from "nanoid";
import clsx from "clsx";
import { Reorder } from "framer-motion";
import RecommendationCard from "./RecommendationCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

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
    dueDate: "Tomorrow"
  },
  {
    id: nanoid(),
    title: "Read Chapter 5",
    course: "PSYCH101",
    duration: "25 min",
    source: "AI",
    reason: "Recommended based on low progress",
    dueDate: "Fri, Oct 24"
  },
  {
    id: nanoid(),
    title: "Practice Problems Set A",
    course: "MATH201",
    duration: "45 min",
    source: "AI",
    reason: "Quiz preparation for Monday",
    dueDate: "Mon, Oct 27"
  }
];

const DURATION_OPTIONS = ["15 min", "30 min", "45 min", "1 hour", "1.5 hours", "2 hours"];
const COURSE_OPTIONS = ["CS301", "MATH201", "ENG102", "PSYCH101", "Other"];
const PRIORITY_OPTIONS = ["Low", "Medium", "High"];

const PRIORITY_COLORS = {
  High: "border-l-red-500",
  Medium: "border-l-amber-400",
  Low: "border-l-green-500",
};

export default function TodayStudyPlan() {
  const [tasks, setTasks] = useState([]);
  const [suggestions, setSuggestions] = useState(initialSuggestions);
  const [isRecommendationMode, setIsRecommendationMode] = useState(false);

  // Add/Edit Task Modal State
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null); // null = add mode, taskId = edit mode
  const [newTaskForm, setNewTaskForm] = useState({
    title: "",
    duration: "",
    course: "",
    priority: "",
  });

  const isFormValid = newTaskForm.title.trim() !== "" && newTaskForm.duration !== "" && newTaskForm.priority !== "";

  const handleAddTask = () => {
    if (!isFormValid) return;

    if (editingTaskId) {
      // Edit mode: update existing task
      setTasks(tasks.map(t =>
        t.id === editingTaskId
          ? { ...t, title: newTaskForm.title, course: newTaskForm.course || "Other", duration: newTaskForm.duration, priority: newTaskForm.priority }
          : t
      ));
    } else {
      // Add mode: create new task
      const newTask = {
        id: nanoid(),
        title: newTaskForm.title,
        course: newTaskForm.course || "Other",
        duration: newTaskForm.duration,
        priority: newTaskForm.priority,
        source: "Manual",
      };
      setTasks([...tasks, newTask]);
    }

    setNewTaskForm({ title: "", duration: "", course: "", priority: "" });
    setEditingTaskId(null);
    setIsAddTaskOpen(false);
  };

  const openEditModal = (task) => {
    setEditingTaskId(task.id);
    setNewTaskForm({
      title: task.title,
      duration: task.duration,
      course: task.course,
      priority: task.priority || "",
    });
    setIsAddTaskOpen(true);
  };

  const openAddModal = () => {
    setEditingTaskId(null);
    setNewTaskForm({ title: "", duration: "", course: "", priority: "" });
    setIsAddTaskOpen(true);
  };

  const toggleTaskComplete = (taskId) => {
    setTasks(tasks.map(t =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    ));
  };

  const startRecommendationMode = () => {
    if (suggestions.length === 0) {
      setSuggestions(initialSuggestions);
    }
    setIsRecommendationMode(true);
  };

  const keepTask = (task) => {
    setTasks([...tasks, { ...task, source: "AI" }]);
    const newSuggestions = suggestions.filter((s) => s.id !== task.id);
    setSuggestions(newSuggestions);

    if (newSuggestions.length === 0) {
      setIsRecommendationMode(false);
    }
  };

  const dismissTask = (taskId) => {
    const newSuggestions = suggestions.filter((s) => s.id !== taskId);
    setSuggestions(newSuggestions);
    if (newSuggestions.length === 0) {
      setIsRecommendationMode(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100/50 flex flex-col h-full min-h-0 overflow-hidden">
      {/* Solid Header */}
      <div className="px-4 py-3 rounded-t-xl" style={{ backgroundColor: '#1F4E3D' }}>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 font-semibold text-white mb-0.5">
              <Sparkles className="w-5 h-5 text-white" />
              Today's Study Plan
            </div>
            <p className="text-xs text-white/80">
              Uses your Task List + deadlines to suggest what to do today.
            </p>
          </div>
          <button
            className={clsx(
              "flex items-center gap-1 text-sm px-3 py-1.5 rounded-md font-medium self-center transition-colors",
              isRecommendationMode
                ? "bg-[#163a2e] text-white ring-1 ring-white/30"
                : "bg-white text-[#1F4E3D] hover:bg-gray-100"
            )}
            onClick={() => isRecommendationMode ? setIsRecommendationMode(false) : startRecommendationMode()}
          >
            <Wand2 className="w-4 h-4" />
            Recommend
          </button>
        </div>
      </div>

      {isRecommendationMode ? (
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-white">
          <div className="text-sm text-gray-600 font-medium mb-2">
            Suggested for you ({suggestions.length})
          </div>
          {suggestions.length === 0 ? (
            <div className="text-sm text-gray-500 italic text-center py-4">
              No more suggestions.
            </div>
          ) : (
            suggestions.slice(0, 3).map((task) => (
              <RecommendationCard
                key={task.id}
                task={task}
                onKeep={() => keepTask(task)}
                onDismiss={() => dismissTask(task.id)}
              />
            ))
          )}
        </div>
      ) : (
        <>
          {/* Controls */}
          <div className="px-4 pb-2 flex items-center justify-between text-sm mt-0 pt-3">
            <div className="flex items-center">
              <span className="text-sm px-3 py-1 border border-gray-300 rounded-full text-black font-medium bg-transparent">
                {tasks.length} tasks
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1 text-gray-600 bg-gray-100 rounded-full px-3 py-1 text-xs">
                <Filter className="w-3.5 h-3.5" />
                All
              </button>
              <button
                onClick={openAddModal}
                className="flex items-center gap-1.5 bg-[#1F4E3D] hover:bg-[#163a2e] text-white text-xs font-medium px-4 py-1.5 rounded-full transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Task
              </button>
            </div>
          </div>

          {/* Task List (Reorderable) */}
          <div className="flex-1 overflow-y-auto px-4 pt-3 pb-6">
            {tasks.length === 0 ? (
              <div className="text-sm text-gray-400 text-center mt-10 italic">
                Your plan is empty.
                <br />
                Click "Recommend" to see suggestions.
              </div>
            ) : (
              <Reorder.Group
                axis="y"
                values={tasks}
                onReorder={setTasks}
                className="space-y-3"
              >
                {tasks.map((task) => (
                  <Reorder.Item
                    key={task.id}
                    value={task}
                    className={clsx(
                      "bg-white border border-gray-200 rounded-lg shadow-sm flex items-center p-3 gap-3 group border-l-4 transition-opacity",
                      PRIORITY_COLORS[task.priority] || "border-l-gray-300",
                      task.completed && "opacity-50"
                    )}
                  >
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={task.completed || false}
                      onChange={() => toggleTaskComplete(task.id)}
                      className="w-4 h-4 rounded border-gray-300 text-[#1F4E3D] focus:ring-[#1F4E3D] cursor-pointer"
                    />

                    {/* Drag Handle */}
                    <div className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600">
                      <GripVertical className="w-5 h-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={clsx(
                          "font-semibold text-gray-900 truncate",
                          task.completed && "line-through text-gray-400"
                        )}>
                          {task.title}
                        </span>
                        {task.source === "AI" && (
                          <span className="bg-gray-100 text-gray-600 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wide">
                            Recommended
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-medium">
                          {task.course}
                        </span>
                        <span>•</span>
                        <span>{task.duration}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {/* Start Button */}
                      <button className="flex items-center gap-1 bg-[#1F4E3D] hover:bg-[#163a2e] text-white text-xs font-bold px-3 py-1.5 rounded-md transition-colors">
                        <Play className="w-3 h-3 fill-current" />
                        Start
                      </button>

                      {/* Menu */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100">
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditModal(task)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
                          >
                            Remove from plan
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            )}
          </div>
        </>
      )}

      {/* Add Task Modal */}
      <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingTaskId ? "Edit Task" : "Add New Task"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Row 1: Task Name (Full Width) */}
            <div className="space-y-2">
              <Label htmlFor="task-name">Task Name <span className="text-red-500">*</span></Label>
              <Input
                id="task-name"
                placeholder="e.g., Read Chapter 3"
                value={newTaskForm.title}
                onChange={(e) => setNewTaskForm({ ...newTaskForm, title: e.target.value })}
              />
            </div>

            {/* Row 2: Duration & Course (50/50) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration <span className="text-red-500">*</span></Label>
                <Select
                  value={newTaskForm.duration}
                  onValueChange={(val) => setNewTaskForm({ ...newTaskForm, duration: val })}
                >
                  <SelectTrigger id="duration">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {DURATION_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Select
                  value={newTaskForm.course}
                  onValueChange={(val) => setNewTaskForm({ ...newTaskForm, course: val })}
                >
                  <SelectTrigger id="course">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {COURSE_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 3: Priority (Full Width) */}
            <div className="space-y-2">
              <Label htmlFor="priority">Priority <span className="text-red-500">*</span></Label>
              <Select
                value={newTaskForm.priority}
                onValueChange={(val) => setNewTaskForm({ ...newTaskForm, priority: val })}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITY_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTaskOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddTask}
              disabled={!isFormValid}
              className="bg-[#1F4E3D] hover:bg-[#163a2e]"
            >
              {editingTaskId ? "Save Changes" : "Add Task"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

