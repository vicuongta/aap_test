// @ts-nocheck
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import DailyCalendar from '@/components/dashboard/DailyCalendar';
import UpcomingDeadlines from '@/components/dashboard/UpcomingDeadlines';
import TodayStudyPlan from '@/components/dashboard/TodayStudyPlan';
import FocusClock from '@/components/dashboard/FocusClock';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const mockUser = {
    full_name: 'Alex Johnson',
    email: 'alex.johnson@university.edu'
  };

  return (
    <
      // @ts-ignore
      AppLayout user={mockUser} title="Overview" className="flex flex-col ">
      <div className="p-6 lg:p-8 flex flex-col h-full">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4 flex-shrink-0"
        >
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome back, {mockUser.full_name.split(' ')[0]}!
          </h2>
        </motion.div>

        {/* 3 main columns for study plan / coming up / calendar */}
        <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
          {/* Col 1: Study Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-col flex-1 basis-0 min-w-0 h-full min-h-0 overflow-hidden"
          >
            <TodayStudyPlan />
          </motion.div>

          {/* Col 2: Coming Up */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-col flex-1 basis-0 min-w-0 h-full min-h-0 overflow-hidden"
          >
            <UpcomingDeadlines />
          </motion.div>

          {/* Col 3: Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-col flex-1 basis-0 min-w-0 h-full min-h-0 overflow-hidden"
          >
            <DailyCalendar />
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}