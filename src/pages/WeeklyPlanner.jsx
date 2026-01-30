import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import WeeklyCalendar from '@/components/planner/WeeklyCalendar';
import MonthlyView from '@/components/planner/MonthlyView';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';
import { format, addWeeks, subWeeks, addDays, addMonths, subMonths, startOfWeek } from 'date-fns';

export default function WeeklyPlanner() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState('week');

  const mockUser = { full_name: 'Alex Johnson', email: 'alex.johnson@university.edu' };

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekEnd = addDays(weekStart, 6);

  const handlePrev = () => {
    if (view === 'week') setCurrentWeek(subWeeks(currentWeek, 1));
    else setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNext = () => {
    if (view === 'week') setCurrentWeek(addWeeks(currentWeek, 1));
    else setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleToday = () => {
    setCurrentWeek(new Date());
    setCurrentMonth(new Date());
  };

  const getDateRangeText = () => {
    if (view === 'week') return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
    return format(currentMonth, 'MMMM yyyy');
  };

  return (
    <AppLayout user={mockUser} title="Schedule" breadcrumb="Dashboard / Schedule">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="h-full flex flex-col min-h-0"
      >
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handlePrev} className="rounded-xl">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleNext} className="rounded-xl">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{getDateRangeText()}</h2>
            </div>
            <Button variant="ghost" onClick={handleToday} className="text-[#2d6a4f] hover:text-[#1b4332] hover:bg-[#2d6a4f]/10">
              Today
            </Button>
          </div>

          <Tabs value={view} onValueChange={setView}>
            <TabsList className="bg-gray-100 rounded-xl p-1">
              <TabsTrigger value="week" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <LayoutGrid className="w-4 h-4 mr-2" />
                Week
              </TabsTrigger>
              <TabsTrigger value="month" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Month
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* View Content */}
        <div className="flex-1 min-h-0">
          {view === 'week' && <WeeklyCalendar currentWeek={currentWeek} className="h-full" />}
          {view === 'month' && <MonthlyView currentMonth={currentMonth} />}
        </div>
      </motion.div>
    </AppLayout>
  );
}