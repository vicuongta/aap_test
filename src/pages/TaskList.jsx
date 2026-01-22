import React, { useState, useEffect, useRef } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, Filter, SortAsc, Calendar, Clock, MoreVertical, FileEdit, GraduationCap, BookOpen, CheckCircle2, Circle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, differenceInDays } from 'date-fns';
import { cn } from '@/lib/utils';
import { getCourseColorByCode } from '@/components/utils/courseColors';

const initialDeadlineTasks = [
  { id: 1, title: 'Binary Search Trees Assignment', course: 'CS301', category: 'homework', dueDate: new Date(Date.now() + 86400000 * 2), status: 'upcoming', priority: 'high', estimatedHours: 4 },
  { id: 2, title: 'Linear Algebra Quiz', course: 'MATH201', category: 'exam', dueDate: new Date(Date.now() + 86400000 * 5), status: 'upcoming', priority: 'high', estimatedHours: 6 },
  { id: 3, title: 'Research Paper Draft', course: 'ENG102', category: 'project', dueDate: new Date(Date.now() + 86400000 * 7), status: 'upcoming', priority: 'medium', estimatedHours: 8 },
  { id: 4, title: 'Chapter 5-7 Reading', course: 'PSYCH101', category: 'reading', dueDate: new Date(Date.now() + 86400000 * 3), status: 'upcoming', priority: 'low', estimatedHours: 2 },
  { id: 5, title: 'Graph Algorithms Assignment', course: 'CS301', category: 'homework', dueDate: new Date(Date.now() + 86400000 * 10), status: 'upcoming', priority: 'medium', estimatedHours: 5 },
  { id: 6, title: 'Week 3 Problem Set', course: 'MATH201', category: 'homework', dueDate: new Date(Date.now() - 86400000 * 2), status: 'completed', priority: 'medium', estimatedHours: 3 },
  { id: 7, title: 'Introduction Essay', course: 'ENG102', category: 'project', dueDate: new Date(Date.now() - 86400000 * 5), status: 'completed', priority: 'high', estimatedHours: 4 },
];

const initialMovableTasks = [
  { id: 101, title: 'Review Lecture Slides', course: 'CHEM101', duration: '30 min', completed: false },
  { id: 102, title: 'Start Research Outline', course: 'ENG102', duration: '1 hr', completed: false },
  { id: 103, title: 'Practice Problem Set', course: 'MATH201', duration: '45 min', completed: false },
  { id: 104, title: 'Read Chapter 4', course: 'PSYCH101', duration: '25 min', completed: false },
  { id: 105, title: 'Watch Tutorial Video', course: 'CS301', duration: '20 min', completed: false },
  { id: 106, title: 'Review Past Quizzes', course: 'MATH201', duration: '40 min', completed: false },
  { id: 107, title: 'Organize Notes', course: 'CHEM101', duration: '15 min', completed: true },
];

const getPriorityColor = (priority) => {
  if (priority === 'high') return 'text-rose-600';
  if (priority === 'medium') return 'text-amber-600';
  return 'text-gray-500';
};

const categoryConfig = {
  homework: { icon: FileEdit, color: 'bg-[#2d6a4f]/10 text-[#2d6a4f]', label: 'Homework' },
  exam: { icon: GraduationCap, color: 'bg-rose-100 text-rose-600', label: 'Exam' },
  project: { icon: BookOpen, color: 'bg-[#d4a54a]/10 text-[#d4a54a]', label: 'Project' },
  reading: { icon: BookOpen, color: 'bg-[#2d6a4f]/10 text-[#2d6a4f]', label: 'Reading' }
};

export default function TaskList() {
  const [deadlineTasks, setDeadlineTasks] = useState(initialDeadlineTasks);
  const [movableTasks, setMovableTasks] = useState(initialMovableTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');
  const [filterTaskType, setFilterTaskType] = useState('all');
  const [collapsedCourses, setCollapsedCourses] = useState({});
  const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const movableSectionRef = useRef(null);

  const mockUser = { full_name: 'Alex Johnson', email: 'alex.johnson@university.edu' };

  const openAddTaskDialog = (course) => {
    setSelectedCourse(course);
    setAddTaskDialogOpen(true);
  };

  // Check for section param and scroll to movable section
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('section') === 'movable' && movableSectionRef.current) {
      setTimeout(() => {
        movableSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, []);

  const toggleDeadlineTaskStatus = (taskId) => {
    setDeadlineTasks(deadlineTasks.map(task => task.id === taskId ? { ...task, status: task.status === 'completed' ? 'upcoming' : 'completed' } : task));
  };

  const toggleMovableTaskStatus = (taskId) => {
    setMovableTasks(movableTasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
  };

  const toggleCourseCollapse = (course) => {
    setCollapsedCourses(prev => ({ ...prev, [course]: !prev[course] }));
  };

  // Group tasks by course
  const groupTasksByCourse = () => {
    const courseGroups = {};
    
    // Add deadline tasks to groups
    deadlineTasks.forEach(task => {
      const course = task.course || 'Other';
      if (!courseGroups[course]) {
        courseGroups[course] = { deadlines: [], movable: [] };
      }
      courseGroups[course].deadlines.push(task);
    });
    
    // Add movable tasks to groups
    movableTasks.forEach(task => {
      const course = task.course || 'Other';
      if (!courseGroups[course]) {
        courseGroups[course] = { deadlines: [], movable: [] };
      }
      courseGroups[course].movable.push(task);
    });
    
    // Apply filters
    const filteredGroups = {};
    Object.entries(courseGroups).forEach(([course, tasks]) => {
      const filteredDeadlines = tasks.deadlines.filter(task => {
        if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        if (filterCourse !== 'all' && task.course !== filterCourse) return false;
        if (filterTaskType === 'movable') return false;
        return true;
      });
      
      const filteredMovable = tasks.movable.filter(task => {
        if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        if (filterCourse !== 'all' && task.course !== filterCourse) return false;
        if (filterTaskType === 'deadline') return false;
        return true;
      });
      
      if (filteredDeadlines.length > 0 || filteredMovable.length > 0) {
        filteredGroups[course] = {
          deadlines: filteredDeadlines.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)),
          movable: filteredMovable
        };
      }
    });
    
    return filteredGroups;
  };

  const courseGroups = groupTasksByCourse();
  const allCourses = [...new Set([...deadlineTasks.map(t => t.course), ...movableTasks.map(t => t.course)])].filter(Boolean);
  
  const upcomingCount = deadlineTasks.filter(t => t.status === 'upcoming').length;
  const completedCount = deadlineTasks.filter(t => t.status === 'completed').length;

  return (
    <AppLayout user={mockUser} title="Task List" breadcrumb="Dashboard / Tasks">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-sm text-gray-500">Upcoming</p>
            <p className="text-2xl font-bold text-gray-900">{upcomingCount}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-2xl font-bold text-[#2d6a4f]">{completedCount}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search tasks..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 h-10 rounded-xl border-gray-200" />
            </div>
            <div className="flex gap-3">
              <Select value={filterCourse} onValueChange={setFilterCourse}>
                <SelectTrigger className="w-40 h-10 rounded-xl"><Filter className="w-4 h-4 mr-2 text-gray-400" /><SelectValue placeholder="Course" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {allCourses.map(course => (
                    <SelectItem key={course} value={course}>{course}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterTaskType} onValueChange={setFilterTaskType}>
                <SelectTrigger className="w-40 h-10 rounded-xl"><SelectValue placeholder="Task Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tasks</SelectItem>
                  <SelectItem value="deadline">Deadlines Only</SelectItem>
                  <SelectItem value="movable">Movable Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Course-Grouped Tasks - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(courseGroups).sort(([a], [b]) => {
            if (a === 'Other') return 1;
            if (b === 'Other') return -1;
            return a.localeCompare(b);
          }).map(([course, tasks]) => {
            const courseColor = course === 'Other' ? { bg: '#f3f4f6', text: '#6b7280', accent: '#9ca3af' } : getCourseColorByCode(course);
            const isCollapsed = collapsedCourses[course];
            const totalTasks = tasks.deadlines.length + tasks.movable.length;
            
            return (
              <Collapsible key={course} open={!isCollapsed} onOpenChange={() => toggleCourseCollapse(course)}>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col h-full">
                  {/* Course Header */}
                  <CollapsibleTrigger className="w-full flex-shrink-0">
                    <div className="p-4 hover:bg-gray-50/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-8 rounded-full flex-shrink-0" style={{ backgroundColor: courseColor.accent }} />
                        <div className="flex-1 text-left min-w-0">
                          <h3 className="text-base font-semibold text-gray-900 truncate">{course}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-full inline-block mt-1" style={{ backgroundColor: courseColor.bg, color: courseColor.text }}>
                            {totalTasks} {totalTasks === 1 ? 'task' : 'tasks'}
                          </span>
                        </div>
                        <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform flex-shrink-0", !isCollapsed && "rotate-180")} />
                      </div>
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="flex-1 overflow-hidden">
                    <div className="border-t border-gray-100 max-h-[400px] overflow-y-auto">
                      {/* Deadlines */}
                      {tasks.deadlines.length > 0 && (
                        <div className="divide-y divide-gray-50">
                          {tasks.deadlines.map((task) => {
                            const category = categoryConfig[task.category];
                            const CategoryIcon = category.icon;
                            const daysUntil = differenceInDays(task.dueDate, new Date());
                            const isOverdue = daysUntil < 0 && task.status !== 'completed';
                            
                            return (
                              <div key={task.id} className={cn("p-3 hover:bg-gray-50/50 transition-colors", task.status === 'completed' && "opacity-60")}>
                                <div className="flex items-start gap-2">
                                  <button onClick={() => toggleDeadlineTaskStatus(task.id)} className="flex-shrink-0 mt-0.5">
                                    {task.status === 'completed' ? <CheckCircle2 className="w-5 h-5 text-[#2d6a4f]" /> : <Circle className="w-5 h-5 text-gray-300 hover:text-gray-400 transition-colors" />}
                                  </button>
                                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", category.color)}>
                                    <CategoryIcon className="w-4 h-4" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className={cn("font-medium text-sm text-gray-900", task.status === 'completed' && "line-through")}>{task.title}</p>
                                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                      <Badge className={cn(category.color, "border-0 text-xs py-0")}>{category.label}</Badge>
                                      <span className="text-xs text-gray-400">•</span>
                                      <span className="text-xs text-gray-500">{task.estimatedHours}h</span>
                                      <span className="text-xs text-gray-400">•</span>
                                      <span className={cn("text-xs", isOverdue ? "text-rose-600" : daysUntil <= 2 ? "text-amber-600" : "text-gray-500")}>
                                        {isOverdue ? `${Math.abs(daysUntil)}d ago` : daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil}d`}
                                      </span>
                                    </div>
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="text-gray-400 h-7 w-7">
                                        <MoreVertical className="w-3.5 h-3.5" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>Edit Task</DropdownMenuItem>
                                      <DropdownMenuItem>View Details</DropdownMenuItem>
                                      <DropdownMenuItem className="text-rose-600">Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Movable Tasks */}
                      {tasks.movable.length > 0 && (
                        <div className={cn("divide-y divide-gray-50", tasks.deadlines.length > 0 && "border-t border-gray-200")}>
                          {tasks.movable.map((task) => (
                            <div key={task.id} className={cn("p-3 hover:bg-gray-50/50 transition-colors", task.completed && "opacity-60")}>
                              <div className="flex items-start gap-2">
                                <Checkbox 
                                  checked={task.completed}
                                  onCheckedChange={() => toggleMovableTaskStatus(task.id)}
                                  className="w-4 h-4 mt-0.5 data-[state=checked]:bg-[#2d6a4f] data-[state=checked]:border-[#2d6a4f]"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className={cn("font-medium text-sm text-gray-900 transition-all duration-300", task.completed && "line-through text-gray-400")}>{task.title}</p>
                                  <div className="flex items-center gap-1.5 mt-1">
                                    <Badge variant="outline" className="text-xs py-0 border-gray-200 text-gray-500">Movable</Badge>
                                    <span className="text-xs text-gray-400">•</span>
                                    <span className="text-xs text-gray-500">{task.duration}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Empty State */}
                      {tasks.deadlines.length === 0 && tasks.movable.length === 0 && (
                        <div className="p-8 text-center">
                          <p className="text-sm text-gray-500 mb-3">No tasks yet</p>
                          <Button 
                            onClick={() => openAddTaskDialog(course)}
                            variant="outline" 
                            size="sm"
                            className="text-[#2d6a4f] border-[#2d6a4f] hover:bg-[#2d6a4f]/5"
                          >
                            + Add Task
                          </Button>
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>

                  {/* Add Task Button Footer */}
                  {(tasks.deadlines.length > 0 || tasks.movable.length > 0) && (
                    <div className="border-t border-gray-100 p-3 flex-shrink-0">
                      <Button 
                        onClick={() => openAddTaskDialog(course)}
                        variant="outline" 
                        size="sm"
                        className="w-full text-[#2d6a4f] border-[#2d6a4f]/30 hover:bg-[#2d6a4f]/5 text-sm"
                      >
                        + Add Task
                      </Button>
                    </div>
                  )}
                </div>
              </Collapsible>
            );
          })}
          
          {Object.keys(courseGroups).length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <p className="text-gray-500">No tasks found</p>
            </div>
          )}
        </div>
      </motion.div>
    </AppLayout>
  );
}