// @ts-nocheck
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import DailyCalendar from '@/components/dashboard/DailyCalendar';
import UpcomingDeadlines from '@/components/dashboard/UpcomingDeadlines';
import TodayStudyPlan from '@/components/dashboard/TodayStudyPlan';
import FocusClock from '@/components/dashboard/FocusClock';
import AskQBtronTrigger from '@/components/dashboard/AskQBtronTrigger';
import ChatPopup from '@/components/dashboard/ChatPopup';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [chatOpen, setChatOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');

  const mockUser = {
    full_name: 'Alex Johnson',
    email: 'alex.johnson@university.edu'
  };

  const handleOpenChat = (message) => {
    setInitialMessage(message);
    setChatOpen(true);
  };

  return (
    <
      // @ts-ignore
      AppLayout user={mockUser} title="Dashboard" className="flex flex-col">
      <div className="p-6 lg:p-8 flex flex-col h-full">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4 flex items-center justify-between gap-4 flex-shrink-0"
        >
          <div className="flex-shrink-0">
            <h2 className="text-3xl font-bold text-gray-900">
              Welcome back, {mockUser.full_name.split(' ')[0]}!
            </h2>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <FocusClock />
            <AskQBtronTrigger onClick={handleOpenChat} className="w-[160px] sm:w-[240px] lg:w-[350px]" />
          </div>
        </motion.div>

        <ChatPopup
          open={chatOpen}
          onOpenChange={setChatOpen}
          initialMessage={initialMessage}
        />

        {/* 3 main columns for study plan / coming up / calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0">
          {/* Col 1: Study Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-col h-full min-h-0 overflow-hidden"

          >
            <TodayStudyPlan />
          </motion.div>

          {/* Col 2: Coming Up */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-col h-full min-h-0 overflow-hidden"

          >
            <UpcomingDeadlines />
          </motion.div>

          {/* Col 3: Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-col h-full min-h-0 overflow-hidden"

          >
            <DailyCalendar />
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}