import React, { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, isSameDay, isToday } from 'date-fns';
import { ChevronDown, Pencil, Trash2, Clock, CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

// Days of the week
const DAYS_OF_WEEK = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

// Generate time options (30 min intervals)
const generateTimeOptions = () => {
  const options = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
      const ampm = h >= 12 ? 'PM' : 'AM';
      const label = `${hour12}:${m.toString().padStart(2, '0')} ${ampm}`;
      const value = h + m / 60; // Decimal hour
      options.push({ label, value });
    }
  }
  return options;
};
const TIME_OPTIONS = generateTimeOptions();

// Initial mock data
const initialFixedItems = [
  {
    id: 1,
    title: 'Calculus II Class',
    days: ['monday', 'wednesday', 'friday'],
    startHour: 10,
    endHour: 11.5,
    type: 'school',
    details: 'Room 304 | Chapter 5',
    associatedDeadline: ''
  },
  {
    id: 2,
    title: 'Part-time Job',
    days: ['tuesday', 'thursday'],
    startHour: 14,
    endHour: 18,
    type: 'work',
    details: 'Campus Bookstore',
    associatedDeadline: ''
  },
  {
    id: 3,
    title: 'Gym Session',
    days: ['monday', 'wednesday', 'friday'],
    startHour: 7,
    endHour: 8,
    type: 'personal',
    details: 'Leg Day',
    associatedDeadline: ''
  },
  {
    id: 4,
    title: 'Physics Lab',
    days: ['thursday'],
    startHour: 13,
    endHour: 15,
    type: 'school',
    details: 'Room 302',
    associatedDeadline: 'Lab Report Due'
  },
];

const initialUpcomingTasks = [
  {
    id: 101,
    title: 'Assignment Due',
    course: 'CS301',
    dueDate: new Date(Date.now() + 86400000 * 2),
    startHour: 9,
    endHour: 10,
    priority: 'assignment',
    type: 'deadline',
    details: 'Submit to Canvas',
    associatedDeadline: ''
  },
  {
    id: 102,
    title: 'Quiz',
    course: 'MATH201',
    dueDate: new Date(),
    startHour: 10,
    endHour: 11,
    priority: 'quiz',
    type: 'deadline',
    details: 'Online Quiz',
    associatedDeadline: ''
  },
];

export default function DailyCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());

  // Editable state
  const [fixedItems, setFixedItems] = useState(initialFixedItems);
  const [tasks, setTasks] = useState(initialUpcomingTasks);

  // Edit modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    selectedDate: new Date(),
    startHour: 9,
    endHour: 10,
    useDuration: false,
    duration: 1,
    details: '',
    associatedDeadline: ''
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const selectedDayName = format(selectedDate, 'EEEE').toLowerCase();

  const dailyFixedItems = fixedItems.filter(item =>
    item.days.includes(selectedDayName)
  );

  const dailyTasks = tasks.filter(task =>
    isSameDay(task.dueDate, selectedDate)
  );

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const rowHeight = 60;

  const getEventStyles = (event, allEventsAtHour) => {
    const hasConflict = event.type === 'school' && (
      allEventsAtHour.some(e => e.type === 'deadline') ||
      (event.associatedDeadline && event.associatedDeadline.trim() !== '')
    );

    if (event.type === 'school') {
      return hasConflict
        ? "bg-sky-100 text-red-600 border-l-4 border-red-500"
        : "bg-sky-100 text-sky-900 border-l-4 border-sky-500";
    } else if (event.type === 'deadline') {
      return "bg-red-500 text-white border-l-4 border-red-700";
    } else {
      return "bg-gray-100 text-gray-700 border-l-4 border-gray-400";
    }
  };

  const getDayPriority = (day) => {
    const dayTasks = tasks.filter(task => isSameDay(task.dueDate, day));
    if (dayTasks.length === 0) return null;
    if (dayTasks.some(t => t.priority === 'exam')) return 'exam';
    if (dayTasks.some(t => t.priority === 'quiz')) return 'quiz';
    return 'assignment';
  };

  const isSelectedToday = isToday(selectedDate);
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const currentTimePosition = isSelectedToday
    ? (currentHour * rowHeight) + ((currentMinute / 60) * rowHeight)
    : null;

  // Handle edit click
  const handleEditClick = (event, e) => {
    e.stopPropagation();
    setEditingEvent(event);

    // Determine the day for fixed items
    const day = event.days ? event.days[0] : selectedDayName;
    const duration = (event.endHour || event.startHour + 1) - event.startHour;

    // For fixed items, compute a date from the day name
    const dayIndex = DAYS_OF_WEEK.indexOf(day);
    const eventDate = event.dueDate || addDays(weekStart, dayIndex >= 0 ? dayIndex : 0);

    setEditForm({
      title: event.title,
      selectedDate: eventDate,
      startHour: event.startHour,
      endHour: event.endHour || event.startHour + 1,
      useDuration: false,
      duration: duration,
      details: event.details || '',
      associatedDeadline: event.associatedDeadline || ''
    });
    setEditModalOpen(true);
  };

  // Handle save
  const handleSave = () => {
    if (!editingEvent) return;

    const endHour = editForm.useDuration
      ? editForm.startHour + Number(editForm.duration)
      : Number(editForm.endHour);

    if (editingEvent.type === 'deadline') {
      setTasks(prev => prev.map(t =>
        t.id === editingEvent.id
          ? {
            ...t,
            title: editForm.title,
            startHour: Number(editForm.startHour),
            endHour: endHour,
            details: editForm.details
          }
          : t
      ));
    } else {
      setFixedItems(prev => prev.map(item =>
        item.id === editingEvent.id
          ? {
            ...item,
            title: editForm.title,
            days: [format(editForm.selectedDate, 'EEEE').toLowerCase()],
            startHour: Number(editForm.startHour),
            endHour: endHour,
            details: editForm.details,
            associatedDeadline: editForm.associatedDeadline
          }
          : item
      ));
    }

    setEditModalOpen(false);
    setEditingEvent(null);
  };

  // Handle delete
  const handleDelete = () => {
    if (!editingEvent) return;

    if (editingEvent.type === 'deadline') {
      setTasks(prev => prev.filter(t => t.id !== editingEvent.id));
    } else {
      setFixedItems(prev => prev.filter(item => item.id !== editingEvent.id));
    }

    setEditModalOpen(false);
    setEditingEvent(null);
  };

  // Get time label
  const getTimeLabel = (decimalHour) => {
    const option = TIME_OPTIONS.find(o => o.value === decimalHour);
    return option ? option.label : `${Math.floor(decimalHour)}:00`;
  };

  return (
    <div className="flex flex-col h-full min-h-0 bg-white rounded-xl border border-gray-100/50">
      {/* Header */}
      <div className="px-3 py-2 border-b border-gray-50 flex items-center justify-between flex-shrink-0">
        <h3 className="text-xs font-bold text-gray-800">Calendar</h3>
        <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
          Day <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      {/* Week Selector */}
      <div className="px-3 py-2 border-b border-gray-50 flex-shrink-0">
        <div className="grid grid-cols-7 gap-1.5">
          {weekDays.map((day, index) => {
            const isSelected = isSameDay(day, selectedDate);
            const isTodayDate = isToday(day);
            const priority = getDayPriority(day);

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(day)}
                className={cn(
                  "flex flex-col items-center justify-center py-2 rounded-lg transition-all relative",
                  isSelected && "bg-[#2d6a4f] text-white",
                  !isSelected && isTodayDate && "bg-[#2d6a4f]/10 text-[#2d6a4f] font-medium",
                  !isSelected && !isTodayDate && "text-gray-500 hover:bg-gray-50"
                )}
              >
                <span className="text-xs font-medium mb-1">{format(day, 'EEE')}</span>
                <span className={cn("text-base font-semibold", isSelected && "text-white")}>
                  {format(day, 'd')}
                </span>
                {priority && (
                  <div className={cn(
                    "absolute bottom-1 w-1.5 h-1.5 rounded-full",
                    priority === 'exam' && "bg-rose-500",
                    priority === 'quiz' && "bg-amber-400",
                    priority === 'assignment' && "bg-emerald-500",
                    isSelected && "bg-white"
                  )} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeline View */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <div className="relative">
          {currentTimePosition !== null && (
            <div
              className="absolute left-0 right-0 z-10 flex items-center"
              style={{ top: `${currentTimePosition}px` }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f] flex-shrink-0"></div>
              <div className="flex-1 h-0.5 bg-[#2d6a4f]"></div>
            </div>
          )}

          {hours.map((hour) => {
            const isPM = hour >= 12;
            const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
            const timeString = `${displayHour} ${isPM ? 'PM' : 'AM'}`;

            let eventsAtHour = [
              ...dailyFixedItems.filter(item => Math.floor(item.startHour) === hour),
              ...dailyTasks.filter(task => Math.floor(task.startHour) === hour)
            ];

            return (
              <div key={hour} className="flex items-start gap-2 mb-1">
                <span className="text-[10px] text-gray-400 w-8 flex-shrink-0 pt-1 text-right">{timeString}</span>
                <div className="flex-1 border-t border-gray-100 pt-1 relative" style={{ minHeight: `${rowHeight}px` }}>
                  {eventsAtHour.map((event, idx) => {
                    const styles = getEventStyles(event, eventsAtHour);
                    const offset = idx * 10;
                    const width = idx > 0 ? `calc(100% - ${offset}px)` : '100%';
                    const duration = (event.endHour || event.startHour + 1) - event.startHour;

                    return (
                      <div
                        key={`${event.id}-${idx}`}
                        className={`absolute rounded-md px-2 py-1.5 shadow-sm transition-all cursor-pointer group hover:shadow-md ${styles}`}
                        style={{
                          top: '0px',
                          left: `${offset}px`,
                          width: width,
                          height: `${duration * rowHeight - 4}px`,
                          minHeight: '36px',
                          zIndex: 10 + idx
                        }}
                        onClick={(e) => handleEditClick(event, e)}
                      >
                        <div className="flex flex-col h-full justify-center relative">
                          <Pencil className="w-3 h-3 absolute top-0 right-0 opacity-0 group-hover:opacity-70 transition-opacity" />

                          <div className="text-xs font-bold leading-tight truncate pr-4">
                            {event.title}
                          </div>
                          <div className="text-[10px] opacity-90 truncate mt-0.5 font-medium">
                            {event.details}
                          </div>
                          {event.associatedDeadline && (
                            <div className="text-[10px] font-bold mt-0.5 text-red-600">
                              ⚠ {event.associatedDeadline}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Dialog - Google Calendar Style */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="sm:max-w-[480px] rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Edit Event</DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-4">
            {/* Title */}
            <div className="space-y-2">
              <Input
                id="title"
                value={editForm.title}
                onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                className="text-lg font-medium border-0 border-b-2 rounded-none focus-visible:ring-0 focus-visible:border-blue-500 px-0"
                placeholder="Add title"
              />
            </div>

            {/* Date Selection with Calendar */}
            <div className="flex items-center gap-4">
              <CalendarIcon className="w-4 h-4 text-gray-400" />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "flex-1 justify-start text-left font-normal",
                      !editForm.selectedDate && "text-muted-foreground"
                    )}
                  >
                    {editForm.selectedDate ? (
                      format(editForm.selectedDate, "EEEE, MMMM d, yyyy")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={editForm.selectedDate}
                    onSelect={(date) => date && setEditForm(prev => ({ ...prev, selectedDate: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time Row */}
            <div className="flex items-center gap-4">
              <Clock className="w-4 h-4 text-gray-400" />
              <div className="flex-1 flex items-center gap-2">
                {/* Start Time */}
                <Select
                  value={String(editForm.startHour)}
                  onValueChange={(val) => setEditForm(prev => ({ ...prev, startHour: Number(val) }))}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Start" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {TIME_OPTIONS.map(opt => (
                      <SelectItem key={opt.value} value={String(opt.value)}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <span className="text-gray-400">—</span>

                {/* End Time or Duration Toggle */}
                {editForm.useDuration ? (
                  <Select
                    value={String(editForm.duration)}
                    onValueChange={(val) => setEditForm(prev => ({ ...prev, duration: Number(val) }))}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {[0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6].map(d => (
                        <SelectItem key={d} value={String(d)}>
                          {d} hr{d !== 1 ? 's' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Select
                    value={String(editForm.endHour)}
                    onValueChange={(val) => setEditForm(prev => ({ ...prev, endHour: Number(val) }))}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="End" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {TIME_OPTIONS.filter(o => o.value > editForm.startHour).map(opt => (
                        <SelectItem key={opt.value} value={String(opt.value)}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            {/* Duration Toggle */}
            <div className="flex items-center gap-4 pl-8">
              <Label htmlFor="use-duration" className="text-sm text-gray-500">Use duration instead</Label>
              <Switch
                id="use-duration"
                checked={editForm.useDuration}
                onCheckedChange={(val) => setEditForm(prev => ({ ...prev, useDuration: val }))}
              />
            </div>

            {/* Details */}
            <div className="space-y-2">
              <Label className="text-sm text-gray-500">Details</Label>
              <Input
                value={editForm.details}
                onChange={(e) => setEditForm(prev => ({ ...prev, details: e.target.value }))}
                placeholder="Add location, notes, etc."
              />
            </div>

            {/* Associated Deadline (School only) */}
            {editingEvent && editingEvent.type === 'school' && (
              <div className="space-y-2 p-3 bg-sky-50 rounded-lg border border-sky-100">
                <Label className="text-sm text-sky-700 font-medium">Associated Deadline/Task</Label>
                <Input
                  value={editForm.associatedDeadline}
                  onChange={(e) => setEditForm(prev => ({ ...prev, associatedDeadline: e.target.value }))}
                  placeholder="e.g., Lab Report Due"
                  className="bg-white"
                />
                <p className="text-xs text-sky-600">This will show a red alert on the calendar block.</p>
              </div>
            )}
          </div>

          <DialogFooter className="flex justify-between sm:justify-between gap-2">
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
            <div className="flex gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}