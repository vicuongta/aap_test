import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { format, addDays, startOfWeek, isToday, getHours, getMinutes, getDay, isSameDay } from 'date-fns';
import { getCourseColorByCode } from '@/components/utils/courseColors';
import { useSchedule } from '@/contexts/ScheduleContext';
import { Pencil, Trash2, Clock, CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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

const timeSlots = Array.from({ length: 14 }, (_, i) => i + 8); // 8 AM to 9 PM

// Map day index (0=Sunday, 1=Monday, ...) to day name
const dayIndexToName = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

// Generate time options (30 min intervals)
const generateTimeOptions = () => {
  const options = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
      const ampm = h >= 12 ? 'PM' : 'AM';
      const label = `${hour12}:${m.toString().padStart(2, '0')} ${ampm}`;
      const value = h + m / 60;
      options.push({ label, value });
    }
  }
  return options;
};
const TIME_OPTIONS = generateTimeOptions();

const getPriorityDotColor = (priority) => {
  if (priority === 'high') return 'bg-rose-500';
  if (priority === 'medium') return 'bg-amber-500';
  return 'bg-gray-400';
};

// Same color rules as DailyCalendar
const getEventStyles = (event, allBlocksInDay) => {
  // Check if school event has conflict with deadline
  const hasConflict = event.type === 'school' && (
    allBlocksInDay.some(e =>
      e.type === 'deadline' &&
      e.id !== event.id &&
      ((e.startHour < event.endHour && e.endHour > event.startHour)) // Time overlap
    ) ||
    (event.associatedDeadline && event.associatedDeadline.trim() !== '')
  );

  if (event.type === 'school') {
    return hasConflict
      ? { bg: '#e0f2fe', text: '#dc2626', border: '#ef4444', accent: '#ef4444' } // red text for conflict
      : { bg: '#e0f2fe', text: '#0c4a6e', border: '#7dd3fc', accent: '#0284c7' }; // normal sky
  } else if (event.type === 'deadline') {
    return { bg: '#ef4444', text: '#ffffff', border: '#b91c1c', accent: '#b91c1c' }; // red
  } else {
    return { bg: '#f3f4f6', text: '#374151', border: '#d1d5db', accent: '#6b7280' }; // gray
  }
};

// Calculate overlap positions for Google Calendar-style side-by-side display
const calculateOverlapPositions = (blocks) => {
  if (blocks.length === 0) return [];

  // Sort by start time, then by duration (longer first)
  const sortedBlocks = [...blocks].sort((a, b) => {
    if (a.startHour !== b.startHour) return a.startHour - b.startHour;
    return (b.endHour - b.startHour) - (a.endHour - a.startHour);
  });

  const positioned = [];

  for (const block of sortedBlocks) {
    // Find overlapping blocks that are already positioned
    const overlapping = positioned.filter(p =>
      p.startHour < block.endHour && p.endHour > block.startHour
    );

    // Find the first available column
    const usedColumns = overlapping.map(o => o.column);
    let column = 0;
    while (usedColumns.includes(column)) {
      column++;
    }

    // Find max columns for this time slot
    const maxColumn = Math.max(column, ...overlapping.map(o => o.column));
    const totalColumns = maxColumn + 1;

    // Update total columns for all overlapping blocks
    overlapping.forEach(o => {
      o.totalColumns = Math.max(o.totalColumns, totalColumns);
    });

    positioned.push({
      ...block,
      column,
      totalColumns
    });
  }

  // Second pass: ensure all overlapping events have consistent totalColumns
  for (const block of positioned) {
    const overlapping = positioned.filter(p =>
      p.startHour < block.endHour && p.endHour > block.startHour
    );
    const maxTotalColumns = Math.max(...overlapping.map(o => o.totalColumns));
    overlapping.forEach(o => {
      o.totalColumns = maxTotalColumns;
    });
  }

  return positioned;
};

export default function WeeklyCalendar({ currentWeek }) {
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const [currentTime, setCurrentTime] = useState(new Date());

  // Use shared context
  const { fixedItems, setFixedItems, tasks, setTasks } = useSchedule();

  // Edit modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingDayIndex, setEditingDayIndex] = useState(null);
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
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Transform context data to schedule blocks for weekly view
  const scheduleBlocks = useMemo(() => {
    const blocks = [];

    // Add fixed items (recurring events)
    fixedItems.forEach(item => {
      days.forEach((day, dayIndex) => {
        const dayName = dayIndexToName[getDay(day)];
        if (item.days.includes(dayName)) {
          blocks.push({
            id: `fixed-${item.id}-${dayIndex}`,
            originalId: item.id,
            title: item.title,
            course: item.details?.split('|')[0]?.trim() || item.title,
            day: dayIndex,
            date: day,
            startHour: item.startHour,
            endHour: item.endHour,
            duration: item.endHour - item.startHour,
            type: item.type,
            priority: item.associatedDeadline ? 'high' : 'medium',
            details: item.details || '',
            associatedDeadline: item.associatedDeadline || '',
            isFixed: true,
          });
        }
      });
    });

    // Add tasks/deadlines
    tasks.forEach(task => {
      const taskDate = new Date(task.dueDate);
      days.forEach((day, dayIndex) => {
        if (isSameDay(taskDate, day)) {
          blocks.push({
            id: `task-${task.id}`,
            originalId: task.id,
            title: task.title,
            course: task.course || 'Task',
            day: dayIndex,
            date: taskDate,
            startHour: task.startHour,
            endHour: task.endHour,
            duration: task.endHour - task.startHour,
            type: task.type,
            priority: task.priority === 'assignment' ? 'high' : task.priority === 'quiz' ? 'medium' : 'low',
            details: task.details || '',
            associatedDeadline: '',
            isFixed: false,
          });
        }
      });
    });

    return blocks;
  }, [fixedItems, tasks, days]);

  // Handle edit click
  const handleEditClick = (block, e) => {
    e.stopPropagation();
    setEditingEvent(block);
    setEditingDayIndex(block.day);

    setEditForm({
      title: block.title,
      selectedDate: block.date,
      startHour: block.startHour,
      endHour: block.endHour,
      useDuration: false,
      duration: block.duration,
      details: block.details,
      associatedDeadline: block.associatedDeadline
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
        t.id === editingEvent.originalId
          ? {
            ...t,
            title: editForm.title,
            dueDate: editForm.selectedDate,
            startHour: Number(editForm.startHour),
            endHour: endHour,
            details: editForm.details
          }
          : t
      ));
    } else {
      setFixedItems(prev => prev.map(item =>
        item.id === editingEvent.originalId
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
      setTasks(prev => prev.filter(t => t.id !== editingEvent.originalId));
    } else {
      setFixedItems(prev => prev.filter(item => item.id !== editingEvent.originalId));
    }

    setEditModalOpen(false);
    setEditingEvent(null);
  };

  const getCurrentTimePosition = () => {
    const hours = getHours(currentTime);
    const minutes = getMinutes(currentTime);
    if (hours < 8 || hours >= 22) return null;
    const position = ((hours - 8) * 64) + ((minutes / 60) * 64);
    return position;
  };

  const todayIndex = days.findIndex(day => isToday(day));
  const currentTimePosition = getCurrentTimePosition();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-8 border-b border-gray-100">
        <div className="p-4 bg-[#f6f8f6]"></div>
        {days.map((day, index) => {
          const isDayToday = isToday(day);
          return (
            <div
              key={index}
              className={cn(
                "p-4 text-center border-l border-gray-100",
                isDayToday && "bg-[#2d6a4f]/5"
              )}
            >
              {isDayToday && (
                <p className="text-xs font-semibold text-[#2d6a4f] uppercase tracking-wide mb-1">Today</p>
              )}
              <p className="text-xs text-gray-500 uppercase tracking-wide">{format(day, 'EEE')}</p>
              <p className={cn(
                "text-lg font-semibold mt-1",
                isDayToday ? "text-[#2d6a4f]" : "text-gray-900"
              )}>
                {format(day, 'd')}
              </p>
            </div>
          );
        })}
      </div>

      {/* Time Grid */}
      <div className="relative">
        <div className="grid grid-cols-8">
          {/* Time column */}
          <div className="border-r border-gray-100">
            {timeSlots.map((hour) => (
              <div key={hour} className="h-16 border-b border-gray-50 px-3 pt-1">
                <span className="text-xs text-gray-400">
                  {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
                </span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {days.map((day, dayIndex) => {
            const isDayToday = isToday(day);
            return (
              <div
                key={dayIndex}
                className={cn(
                  "relative border-r border-gray-100 last:border-r-0",
                  isDayToday && "bg-[#2d6a4f]/5"
                )}
              >
                {timeSlots.map((hour) => (
                  <div key={hour} className="h-16 border-b border-gray-50"></div>
                ))}

                {/* Current time indicator */}
                {/* {isDayToday && currentTimePosition !== null && (
                  <div
                    className="absolute left-0 right-0 z-0 pointer-events-none"
                    style={{ top: `${currentTimePosition}px` }}
                  >
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#2d6a4f] -ml-1" />
                      <div className="flex-1 h-0.5 bg-[#2d6a4f]" />
                    </div>
                  </div>
                )} */}

                {/* Schedule blocks */}
                {(() => {
                  const dayBlocks = scheduleBlocks.filter(block => block.day === dayIndex);
                  const positionedBlocks = calculateOverlapPositions(dayBlocks);

                  return positionedBlocks.map((block) => {
                    const eventStyles = getEventStyles(block, dayBlocks);
                    const widthPercent = 100 / block.totalColumns;
                    const leftPercent = block.column * widthPercent;

                    return (
                      <div
                        key={block.id}
                        onClick={(e) => handleEditClick(block, e)}
                        className="absolute rounded-lg border px-2 py-1 cursor-pointer hover:shadow-md transition-shadow overflow-hidden group"
                        style={{
                          top: `${(block.startHour - 8) * 64}px`,
                          height: `${block.duration * 64 - 4}px`,
                          left: `calc(${leftPercent}% + 4px)`,
                          width: `calc(${widthPercent}% - 8px)`,
                          backgroundColor: eventStyles.bg,
                          borderColor: eventStyles.border,
                          borderLeftWidth: '3px',
                          borderLeftColor: eventStyles.accent,
                          color: eventStyles.text,
                          zIndex: block.column + 1,
                        }}
                      >
                        <div className="flex flex-col h-full">
                          <p className="text-xs font-medium leading-tight line-clamp-2">{block.title}</p>
                          <p className="text-[10px] opacity-70 mt-0.5">
                            {block.startHour > 12 ? block.startHour - 12 : block.startHour}
                            {block.startHour >= 12 ? 'PM' : 'AM'}
                          </p>
                          <div className="flex items-center gap-1 mt-auto">
                            {block.priority && (
                              <div className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", getPriorityDotColor(block.priority))} />
                            )}
                            <Pencil className="w-3 h-3 opacity-0 group-hover:opacity-70 transition-opacity ml-auto" />
                          </div>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Pencil className="w-4 h-4" />
              Edit Event
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
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