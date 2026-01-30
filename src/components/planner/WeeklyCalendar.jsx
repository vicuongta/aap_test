import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { format, addDays, startOfWeek, isToday, getHours, getMinutes, getDay, isSameDay } from 'date-fns';
import { getCourseColorByCode } from '@/components/utils/courseColors';
import { useSchedule } from '@/contexts/ScheduleContext';
import { Pencil, Trash2, Clock, CalendarIcon, Plus, BookOpen, Calendar as CalIcon, Users } from 'lucide-react';
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
import { TimePickerCombobox } from '@/components/ui/TimePickerCombobox';

const START_HOUR = 0; // Calendar starts at 12 AM
const END_HOUR = 23; // Calendar ends at 11 PM
const timeSlots = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => i + START_HOUR); // 12 AM to 11 PM

// Map day index (0=Sunday, 1=Monday, ...) to day name
const dayIndexToName = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

// Generate time options (15 min intervals) - used for duration options
const generateTimeOptions = () => {
  const options = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
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

// Event type colors
const getEventStyles = (event, allBlocksInDay) => {
  // New event types
  if (event.eventType === 'general') {
    return { bg: '#f3f4f6', text: '#374151', border: '#d1d5db', accent: '#6b7280' }; // gray
  } else if (event.eventType === 'class') {
    return { bg: '#dbeafe', text: '#1e40af', border: '#93c5fd', accent: '#2563eb' }; // blue
  } else if (event.eventType === 'appointment') {
    return { bg: '#fef3c7', text: '#92400e', border: '#fcd34d', accent: '#f59e0b' }; // yellow
  }

  // Legacy event types
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
      : { bg: '#dbeafe', text: '#1e40af', border: '#93c5fd', accent: '#2563eb' }; // blue (class)
  } else if (event.type === 'deadline') {
    return { bg: '#fee2e2', text: '#b91c1c', border: '#f87171', accent: '#dc2626' }; // red (deadline)
  } else {
    return { bg: '#f3f4f6', text: '#374151', border: '#d1d5db', accent: '#6b7280' }; // gray (general)
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

export default function WeeklyCalendar({ currentWeek, className }) {
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
    associatedDeadline: '',
    eventType: 'general'
  });

  // Add event menu state
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newEventType, setNewEventType] = useState('general');
  const [newEventForm, setNewEventForm] = useState({
    title: '',
    selectedDate: new Date(),
    startHour: 9,
    endHour: 10,
    useDuration: false,
    duration: 1,
    details: ''
  });

  // Handle double-click on time slot to create event
  const handleDoubleClickTimeSlot = (day, hour) => {
    setNewEventType('general');
    setNewEventForm({
      title: '',
      selectedDate: day,
      startHour: hour,
      endHour: hour + 1,
      useDuration: false,
      duration: 1,
      details: ''
    });
    setAddModalOpen(true);
  };

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
    // Adjust for start hour offset
    if (hours < START_HOUR || hours > END_HOUR) return null;
    const position = ((hours - START_HOUR) * 64) + ((minutes / 60) * 64);
    return position;
  };

  const todayIndex = days.findIndex(day => isToday(day));
  const currentTimePosition = getCurrentTimePosition();

  return (
    <div className={cn("bg-white rounded-2xl border-2 border-gray-200 overflow-hidden flex flex-col", className)}>
      {/* Header */}
      <div className="flex border-b border-gray-200 flex-none bg-white z-10 text-xs pr-[17px]">
        <div className="w-24 flex-none p-2 flex items-center justify-center border-r border-gray-200 relative">
          <button
            onClick={() => {
              setNewEventType('general');
              setAddModalOpen(true);
            }}
            className="w-full h-10 rounded-md bg-[#1b4332] hover:bg-[#081c15] text-white flex items-center justify-center gap-1 transition-colors shadow-sm"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 grid grid-cols-7">
          {days.map((day, index) => {
            const isDayToday = isToday(day);
            return (
              <div
                key={index}
                className="py-2 text-center border-r border-gray-200 last:border-r-0"
              >
                <p className="text-xs text-gray-900 uppercase tracking-wide">{format(day, 'EEE')}</p>
                <div className="flex justify-center mt-1">
                  <span className={cn(
                    "text-2xl font-normal w-10 h-10 flex items-center justify-center rounded-full",
                    isDayToday ? "bg-[#1b4332] text-white" : "text-gray-700"
                  )}>
                    {format(day, 'd')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Time Grid */}
      <div className="relative flex-1 overflow-y-auto min-h-0">
        <div className="flex min-h-max">
          {/* Time column */}
          <div className="w-24 flex-none border-r border-gray-200 bg-white z-20">
            {timeSlots.map((hour) => (
              <div key={hour} className="h-16 border-b border-gray-200 flex items-center justify-end pr-3">
                <span className="text-xs text-gray-500 font-medium">
                  {hour === 0 ? '12 AM' : hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
                </span>
              </div>
            ))}
          </div>

          {/* Day columns container */}
          <div className="flex-1 grid grid-cols-7">
            {days.map((day, dayIndex) => {
              const isDayToday = isToday(day);
              return (
                <div
                  key={dayIndex}
                  className="relative border-r border-gray-200 last:border-r-0"
                >
                  {timeSlots.map((hour) => (
                    <div
                      key={hour}
                      className="h-16 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                      onDoubleClick={() => handleDoubleClickTimeSlot(day, hour)}
                    />
                  ))}

                  {/* Current time indicator */}
                  {isDayToday && currentTimePosition !== null && (
                    <div
                      className="absolute left-0 right-0 z-20 pointer-events-none"
                      style={{ top: `${currentTimePosition}px` }}
                    >
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 -ml-1.5 border-2 border-white shadow-sm" />
                        <div className="flex-1 h-0.5 bg-red-500" />
                      </div>
                    </div>
                  )}

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
                            top: `${block.startHour * 64}px`,
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
                <TimePickerCombobox
                  value={editForm.startHour}
                  onChange={(val) => {
                    setEditForm(prev => ({
                      ...prev,
                      startHour: val,
                      // Auto-adjust end time if it's before or equal to start time
                      endHour: prev.endHour <= val ? val + 0.25 : prev.endHour
                    }));
                  }}
                  placeholder="hh:mm"
                  className="flex-1"
                />

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
                      {[0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3, 4, 5, 6].map(d => (
                        <SelectItem key={d} value={String(d)}>
                          {d < 1 ? `${d * 60} min` : `${d} hr${d !== 1 ? 's' : ''}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <TimePickerCombobox
                    value={editForm.endHour}
                    onChange={(val) => {
                      // Only allow end time after start time
                      if (val > editForm.startHour) {
                        setEditForm(prev => ({ ...prev, endHour: val }));
                      } else {
                        // Auto-adjust to 15 min after start
                        setEditForm(prev => ({ ...prev, endHour: prev.startHour + 0.25 }));
                      }
                    }}
                    placeholder="hh:mm"
                    filterAfter={editForm.startHour}
                    className="flex-1"
                  />
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

      {/* Add Event Modal */}
      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className={cn(
                "w-3 h-3 rounded-full",
                newEventType === 'general' && "bg-gray-400",
                newEventType === 'class' && "bg-blue-500",
                newEventType === 'appointment' && "bg-yellow-400"
              )} />
              New Event
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Event Type Selector */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Event Type</Label>
              <Select
                value={newEventType}
                onValueChange={(val) => setNewEventType(val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400" />
                      General Event
                    </div>
                  </SelectItem>
                  <SelectItem value="class">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      Class Time
                    </div>
                  </SelectItem>
                  <SelectItem value="appointment">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-400" />
                      Appointment
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Title */}
            <div className="space-y-2">
              <Input
                id="newEventTitle"
                value={newEventForm.title}
                onChange={(e) => setNewEventForm(prev => ({ ...prev, title: e.target.value }))}
                className="text-lg font-medium"
                placeholder="Add title"
              />
            </div>

            {/* Date Picker */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(newEventForm.selectedDate, 'EEEE, MMMM d, yyyy')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={newEventForm.selectedDate}
                    onSelect={(date) => setNewEventForm(prev => ({ ...prev, selectedDate: date || new Date() }))}
                    initialFocus
                    className=""
                    classNames={{}}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Start Time</Label>
                <TimePickerCombobox
                  value={newEventForm.startHour}
                  onChange={(val) => {
                    setNewEventForm(prev => ({
                      ...prev,
                      startHour: val,
                      endHour: prev.endHour <= val ? val + 0.25 : prev.endHour
                    }));
                  }}
                  placeholder="hh:mm"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">{newEventForm.useDuration ? 'Duration' : 'End Time'}</Label>
                {newEventForm.useDuration ? (
                  <Select
                    value={String(newEventForm.duration)}
                    onValueChange={(val) => setNewEventForm(prev => ({ ...prev, duration: Number(val) }))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3, 4, 5, 6].map(d => (
                        <SelectItem key={d} value={String(d)}>
                          {d < 1 ? `${d * 60} min` : `${d} hr${d !== 1 ? 's' : ''}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <TimePickerCombobox
                    value={newEventForm.endHour}
                    onChange={(val) => {
                      setNewEventForm(prev => ({ ...prev, endHour: val }));
                    }}
                    placeholder="hh:mm"
                    filterAfter={newEventForm.startHour}
                    className="w-full"
                  />
                )}
              </div>
            </div>


            {/* Duration Toggle */}
            <div className="flex items-center gap-3">
              <Switch
                id="new-use-duration"
                checked={newEventForm.useDuration}
                onCheckedChange={(val) => setNewEventForm(prev => ({ ...prev, useDuration: val }))}
              />
              <Label htmlFor="new-use-duration" className="text-sm text-gray-500 cursor-pointer">
                Use duration instead
              </Label>
            </div>

            {/* Details */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Details</Label>
              <Input
                value={newEventForm.details}
                onChange={(e) => setNewEventForm(prev => ({ ...prev, details: e.target.value }))}
                placeholder="Add location, notes, etc."
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={() => {
              // Create new event
              const newEvent = {
                id: `event-${Date.now()}`,
                title: newEventForm.title || 'Untitled Event',
                startHour: newEventForm.startHour,
                endHour: newEventForm.useDuration
                  ? newEventForm.startHour + newEventForm.duration
                  : newEventForm.endHour,
                dueDate: newEventForm.selectedDate,
                details: newEventForm.details,
                eventType: newEventType,
                type: newEventType === 'class' ? 'school' : newEventType === 'appointment' ? 'deadline' : 'general'
              };

              // Add to tasks (one-time events)
              setTasks(prev => [...prev, newEvent]);

              // Reset form
              setNewEventForm({
                title: '',
                selectedDate: new Date(),
                startHour: 9,
                endHour: 10,
                useDuration: false,
                duration: 1,
                details: ''
              });
              setAddModalOpen(false);
            }}>
              Create Event
            </Button>
          </DialogFooter>
        </DialogContent >
      </Dialog >
    </div >
  );
}