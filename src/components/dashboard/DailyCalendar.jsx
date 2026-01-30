import React, { useState, useEffect, useRef } from 'react';
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
import { useSchedule } from '@/contexts/ScheduleContext';
import { TimePickerCombobox } from '@/components/ui/TimePickerCombobox';

// Days of the week
const DAYS_OF_WEEK = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

// Generate time options (15 min intervals) - used for duration options
const generateTimeOptions = () => {
  const options = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
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

export default function DailyCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());

  // Use shared context instead of local state
  const { fixedItems, setFixedItems, tasks, setTasks } = useSchedule();

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

  // Ref for the scrollable timeline container
  const scrollContainerRef = useRef(null);

  // Auto-scroll to current time on mount and when selectedDate changes to today
  useEffect(() => {
    if (scrollContainerRef.current && isToday(selectedDate)) {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      // Calculate scroll position (position current time near top with some padding)
      const scrollPosition = (currentHour * 60) + ((currentMinute / 60) * 60) - 60; // 60px padding from top

      // Scroll to position (minimum 0)
      scrollContainerRef.current.scrollTo({
        top: Math.max(0, scrollPosition),
        behavior: 'smooth'
      });
    }
  }, [selectedDate]);

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const selectedDayName = format(selectedDate, 'EEEE').toLowerCase();

  const dailyFixedItems = fixedItems.filter(item =>
    item.days.includes(selectedDayName)
  );

  const dailyTasks = tasks.filter(task =>
    isSameDay(task.dueDate, selectedDate)
  );

  // Combine all events for the day with endHour calculated
  const allDayEvents = [...dailyFixedItems, ...dailyTasks].map(event => ({
    ...event,
    endHour: event.endHour || event.startHour + 1
  }));

  // Calculate overlap positions for Google Calendar-style side-by-side display
  const calculateOverlapPositions = (events) => {
    if (events.length === 0) return [];

    const sortedEvents = [...events].sort((a, b) => {
      if (a.startHour !== b.startHour) return a.startHour - b.startHour;
      return (b.endHour - b.startHour) - (a.endHour - a.startHour);
    });

    const positioned = [];

    for (const event of sortedEvents) {
      const overlapping = positioned.filter(p =>
        p.startHour < event.endHour && p.endHour > event.startHour
      );

      const usedColumns = overlapping.map(o => o.column);
      let column = 0;
      while (usedColumns.includes(column)) {
        column++;
      }

      const maxColumn = Math.max(column, ...overlapping.map(o => o.column));
      const totalColumns = maxColumn + 1;

      overlapping.forEach(o => {
        o.totalColumns = Math.max(o.totalColumns, totalColumns);
      });

      positioned.push({
        ...event,
        column,
        totalColumns
      });
    }

    // Second pass: ensure consistent totalColumns for all overlapping events
    for (const event of positioned) {
      const overlapping = positioned.filter(p =>
        p.startHour < event.endHour && p.endHour > event.startHour
      );
      const maxTotalColumns = Math.max(...overlapping.map(o => o.totalColumns));
      overlapping.forEach(o => {
        o.totalColumns = maxTotalColumns;
      });
    }

    return positioned;
  };

  const positionedEvents = calculateOverlapPositions(allDayEvents);

  // Full 24-hour display
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

    const duration = (event.endHour || event.startHour + 1) - event.startHour;

    // For deadline events, use their dueDate
    // For fixed items, use the currently selected/viewed date since that's the day we clicked on
    const eventDate = event.dueDate || selectedDate;

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
            dueDate: editForm.selectedDate,  // Update dueDate so event appears on correct day
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
    <div className="flex flex-col h-full min-h-0 bg-white rounded-xl border border-gray-100/50 overflow-hidden">
      {/* Solid Header */}
      <div className="px-4 py-3 flex-shrink-0 rounded-t-xl" style={{ backgroundColor: '#1565C0' }}>
        <div className="flex items-center justify-between mb-1">
          <div>
            <div className="flex items-center gap-2 font-semibold text-white">
              <CalendarIcon className="w-5 h-5 text-white" />
              Calendar
            </div>
            <p className="text-xs text-blue-100 font-medium ml-7 opacity-90">
              Only shows fixed schedule, events and deadlines
            </p>
          </div>
          {/* Inverted badge - white bg with blue text */}
          <span className="flex items-center justify-center text-sm px-3 py-1 rounded-full bg-white text-blue-600 font-medium">
            {isToday(selectedDate) ? 'Today' : format(selectedDate, 'MMM d')}
          </span>
        </div>
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
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-3 py-2">
        <div className="relative">
          {currentTimePosition !== null && (
            <div
              className="absolute left-0 right-0 z-10 flex items-center pointer-events-none"
              style={{ top: `${currentTimePosition}px` }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0 -ml-1 shadow-sm"></div>
              <div className="flex-1 h-0.5 bg-red-500"></div>
            </div>
          )}

          {hours.map((hour) => {
            const isPM = hour >= 12;
            const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
            const timeString = `${displayHour} ${isPM ? 'PM' : 'AM'}`;

            // Get positioned events that start at this hour
            const eventsAtHour = positionedEvents.filter(e => Math.floor(e.startHour) === hour);
            // Get all events at this hour for conflict styling
            const allEventsAtThisHour = allDayEvents.filter(e =>
              e.startHour < hour + 1 && e.endHour > hour
            );

            return (
              <div key={hour} className="flex items-start gap-2 mb-1">
                <span className="text-[10px] text-gray-400 w-8 flex-shrink-0 pt-1 text-right">{timeString}</span>
                <div className="flex-1 border-t border-gray-100 pt-1 relative" style={{ minHeight: `${rowHeight}px` }}>
                  {eventsAtHour.map((event) => {
                    const styles = getEventStyles(event, allEventsAtThisHour);
                    const duration = event.endHour - event.startHour;
                    const isShortEvent = duration <= 0.5;

                    // Calculate side-by-side positioning
                    const widthPercent = 100 / event.totalColumns;
                    const leftPercent = event.column * widthPercent;

                    return (
                      <div
                        key={event.id}
                        className={`absolute rounded-md px-2 py-1 shadow-sm transition-all cursor-pointer group hover:shadow-md overflow-hidden ${styles}`}
                        style={{
                          top: '0px',
                          left: `${leftPercent}%`,
                          width: `calc(${widthPercent}% - 4px)`,
                          height: `${Math.max(duration * rowHeight - 4, 28)}px`,
                          minHeight: '28px',
                          zIndex: 10 + event.column
                        }}
                        onClick={(e) => handleEditClick(event, e)}
                      >
                        <div className="flex flex-col h-full justify-center relative overflow-hidden">
                          <Pencil className="w-3 h-3 absolute top-0 right-0 opacity-0 group-hover:opacity-70 transition-opacity" />

                          <div className={`font-bold leading-tight line-clamp-2 pr-4 ${isShortEvent ? 'text-[10px]' : 'text-xs'}`}>
                            {event.title}
                          </div>
                          {!isShortEvent && (
                            <>
                              <div className="text-[10px] opacity-90 truncate mt-0.5 font-medium">
                                {event.details}
                              </div>
                              {event.associatedDeadline && (
                                <div className="text-[10px] font-bold mt-0.5 text-red-600">
                                  ⚠ {event.associatedDeadline}
                                </div>
                              )}
                            </>
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
                <TimePickerCombobox
                  value={editForm.startHour}
                  onChange={(val) => {
                    setEditForm(prev => ({
                      ...prev,
                      startHour: val,
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
                      if (val > editForm.startHour) {
                        setEditForm(prev => ({ ...prev, endHour: val }));
                      } else {
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
              <Button onClick={handleSave} className="bg-green-700 hover:bg-green-800 text-white">Save</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}